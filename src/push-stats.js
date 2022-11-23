const { repoStatToBlocks } = require('./tools/push-utils/repo-stat-to-blocks');
const { activityStatToBlocks } = require('./tools/push-utils/activity-stat-to-blocks');
const { activityByTypeToBlocks } = require('./tools/push-utils/activity-by-type-to-blocks');
const { activityByTimeToBlocks } = require('./tools/push-utils/activity-by-time-to-blocks');
const { pushData } = require('./tools/push-utils/push-data');

/**
 *
 *
 * @param {Object} statistics
 */
const pushStats = async (statistics, webhookUrl) => {
    const {
        repoStat,
        activityStat,
        activitiesByType,
        activitiesByTime,
    } = statistics;

    const repoStatBlocks = repoStatToBlocks(repoStat);
    const activityStatBlocks = activityStatToBlocks(activityStat);
    const activityByTypeBlocks = activityByTypeToBlocks(activitiesByType);
    const activitiesByTimeBlocks = activityByTimeToBlocks(activitiesByTime);

    await pushData(
        webhookUrl,
        repoStatBlocks,
        activityStatBlocks,
        activityByTypeBlocks,
        activitiesByTimeBlocks,
    );
};

exports.pushStats = pushStats;
