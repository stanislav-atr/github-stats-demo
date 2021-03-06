const {
    createWriteStream,
    createReadStream,
    pathExists,
    remove,
    rename,
} = require('fs-extra');
const { Readable } = require('stream');
const { chain } = require('stream-chain');
const { parser } = require('stream-json/jsonl/Parser');
const { reduceStream } = require('./stream-utils');
const {
    isOldEvent,
    isCreatedSince,
    isCreatedUntil,
} = require('./events-utils');

/**
 * Gets array of GitHub event objects from file and by search time
 * @param {string} path path to the file to read from
 * @param {object} timePeriod
 * @return {Promise<Array<Object>>} array with GitHub event objects
 */
const getEventsFromCollection = async (path, timePeriod) => {
    const { until, since } = timePeriod;
    const fileEventsStream = createReadStream(path, {
        flags: 'r',
    });
    const collectionStream = fileEventsStream.pipe(parser());

    const callback = (data, accArray) => {
        // Remove parser() wrapping
        const event = data.value;
        const createdUntil = isCreatedUntil(event, until);
        const createdSince = isCreatedSince(event, since);
        if (createdSince && createdUntil) {
            accArray.push(event);
        } else if (!createdSince) {
            // Return null to stop the stream
            return null;
        }
        return undefined;
    };

    const eventsBySearchDate = await reduceStream(collectionStream, callback);

    return eventsBySearchDate;
};

/**
 * Writes events from array to path as a stream, path is created if there is none
 * @param {string} path path to a collection
 * @param {Array.<Object>} events array with GitHub event objects
 */
const writeEventsToCollection = async (path, events) => {
    if (events.length === 0) {
        return;
    }

    const readable = new Readable({
        objectMode: true,
        read: () => { },
    });

    chain([
        readable,
        (event) => `${JSON.stringify(event)}\n`,
        createWriteStream(path, {
            flags: 'a',
        }),
    ]);

    events.forEach((event) => {
        readable.push(event);
    });
};

/**
 * Gets events from an array that are not present in a collection
 * @param {string} path path to a collection
 * @param {Array.<Object>} events array with GitHub event objects
 * @return {Promise<Array<Object>>} array with new unique events
 */
const getUniquesFromPoll = async (path, events) => {
    // Forward events if there is no collection yet
    const hasCollection = await pathExists(path);
    if (!hasCollection) {
        return events;
    }

    const fileEventsStream = createReadStream(path, {
        flags: 'r',
    });
    const collectionStream = fileEventsStream.pipe(parser());

    const filteringCallback = (data, accArray) => {
        // Remove parser() wrapping
        const eventFromFile = data.value;
        const dupeIndex = accArray.findIndex((newEvent) => {
            return newEvent.id === eventFromFile.id;
        });
        if (dupeIndex !== -1) {
            accArray.splice(dupeIndex, 1);
        }
    };
    const newUniqueEvents = await reduceStream(collectionStream, filteringCallback, events);

    return newUniqueEvents;
};

/**
 * Removes events that are older than specified date from collection
 * @param {string} path path to a collection
 * @param {number} expirationDays number of days representing events lifespan
 */
const removeOldEventsFromCollection = async (path, expirationDays) => {
    const TEMP_COLLECTION_NAME = 'temp.jsonl';

    chain([
        createReadStream(path),
        parser(),
        (data) => {
            const event = data.value;
            return isOldEvent(event, expirationDays) ? null : event;
        },
        (event) => `${JSON.stringify(event)}\n`,
        createWriteStream(TEMP_COLLECTION_NAME),
    ]);

    await remove(path);
    rename(TEMP_COLLECTION_NAME, path);
};

module.exports = {
    getEventsFromCollection,
    writeEventsToCollection,
    getUniquesFromPoll,
    removeOldEventsFromCollection,
};
