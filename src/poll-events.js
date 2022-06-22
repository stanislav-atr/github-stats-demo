const { getGithubEvents } = require('./tools/gh-utils');
const { EVENT_EXPIRATION_DAYS } = require('./constants');
const {
    removeOldFilesFromCollection,
    writePollToCollection,
    removeDupesFromCollection,
    oldCollectionToArray,
} = require('./tools/fs-utils');

/**
 * Polls events from Github Events API and stores them on a given path
 *
 * @param {string} collectionPath path to events collection
 * @param {Object} commonRequestData
 */
const pollEvents = async (collectionPath, commonRequestData) => {
    const newPoll = await getGithubEvents(commonRequestData);
    // const collectionArray = await oldCollectionToArray('events_collection.jsonl');
    await writePollToCollection(collectionPath, newPoll);

    await removeDupesFromCollection(collectionPath);
    await removeOldFilesFromCollection(collectionPath, EVENT_EXPIRATION_DAYS);
};

exports.pollEvents = pollEvents;
