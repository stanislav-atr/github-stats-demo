import { USERNAMES_EXCLUDES } from '../../constants';

/**
 * Prune statistics object to exclude users by given params
 * @param {Object} statistics
 * @param {number} minActivity
 * @returns {Object}
 */
const pruneStatistics = (statistics, minActivity) => {
    const prunedStat = {
        ...statistics,
    };

    const {
        activityStat,
        activitiesByUser,
    } = prunedStat;

    // eslint-disable-next-line no-restricted-syntax
    for (const [username, count] of Object.entries(activityStat)) {
        if (count <= minActivity || USERNAMES_EXCLUDES.includes(username)) {
            delete activityStat[username];
            delete activitiesByUser[username];
        }
    }

    return prunedStat;
};

export { pruneStatistics };
