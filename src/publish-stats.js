const { makeClient } = require('./publish-utils/make-client');
const { publishMessage } = require('./publish-utils/publish-message');
const { replyMessage } = require('./publish-utils/reply-message');
const { pruneStatistics } = require('./publish-utils/format-utils/prune-statistics');

const { repoStatToBlocks } = require('./publish-utils/format-utils/repo-stat-to-blocks');
const { activityStatToBlocks } = require('./publish-utils/format-utils/activity-stat-to-blocks');
const { activityByTypeToBlocks } = require('./publish-utils/format-utils/activity-by-type-to-blocks');

const { MIN_REQUIRED_ACTIVITY } = require('./constants');

/**
 *
 *
 * @param {Object} statistics
 */
const publishStats = async (oauthToken, legendMessageUrl, channelId, statistics) => {
    const {
        repoStat,
        activityStat,
        activitiesByType,
    } = pruneStatistics(statistics, MIN_REQUIRED_ACTIVITY);

    const repoStatBlocks = repoStatToBlocks(repoStat, legendMessageUrl);
    const generalActivityBlocks = activityStatToBlocks(activityStat);
    const detailedUserBlocks = activityByTypeToBlocks(activitiesByType);

    const client = makeClient(oauthToken);
    const messageInfo = await publishMessage(client, oauthToken, repoStatBlocks, channelId);

    await replyMessage(client, oauthToken, generalActivityBlocks, channelId, messageInfo.ts);
    detailedUserBlocks.forEach(async (userBlock) => {
        await replyMessage(client, oauthToken, userBlock, channelId, messageInfo.ts);
    });
};

exports.publishStats = publishStats;
