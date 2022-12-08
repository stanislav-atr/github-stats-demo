const { USERNAMES_EXCLUDES } = require('../../constants');

/**
 * Prune statistics object to exclude users by given params
 * @param {number} minActivity
 */
const pruneStatistics = (statistics, minActivity) => {
    const prunedStat = {
        ...statistics,
    };

    const {
        activityStat,
        activitiesByType,
    } = prunedStat;

    // eslint-disable-next-line no-restricted-syntax
    for (const [username, count] of Object.entries(activityStat)) {
        if (count <= minActivity
            || USERNAMES_EXCLUDES.some((excludedName) => username === excludedName)
        ) {
            delete activityStat[username];
            delete activitiesByType[username];
        }
    }

    return prunedStat;
};

module.exports = { pruneStatistics };
