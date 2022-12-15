import {
    EXCLUDED_USERNAMES,
    INCLUDED_USERNAMES,
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
        const shouldBeRemoved = count <= minActivity || EXCLUDED_USERNAMES.includes(username);
        const isAllowlisted = INCLUDED_USERNAMES.includes(username);
        if (shouldBeRemoved && !isAllowlisted) {
            delete activityStat[username];
            delete activitiesByUser[username];
        }
    }

    return prunedStat;
};
