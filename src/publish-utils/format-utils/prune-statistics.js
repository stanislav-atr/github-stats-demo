import {
    USERNAMES_EXCLUDES,
    USERNAMES_INCLUDES,
} from '../../constants';

/**
 * Prune statistics object to exclude users by given params
 * @param {Object} statistics
 * @param {number} minActivity
 * @returns {Object}
 */
export const pruneStatistics = (statistics, minActivity) => {
    const prunedStat = {
        ...statistics,
    };

    const {
        activityStat,
        activitiesByUser,
    } = prunedStat;

    // eslint-disable-next-line no-restricted-syntax
    for (const [username, count] of Object.entries(activityStat)) {
        const shouldBeRemoved = count <= minActivity || USERNAMES_EXCLUDES.includes(username);
        const isWhitelisted = USERNAMES_INCLUDES.includes(username);
        if (shouldBeRemoved && !isWhitelisted) {
            delete activityStat[username];
            delete activitiesByUser[username];
        }
    }

    return prunedStat;
};
