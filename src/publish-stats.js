import {
    makeClient,
    publishMessage,
    replyMessage,
    pruneStatistics,
    repoStatToBlocks,
    activityStatToBlocks,
    activityByTypeToBlocks,
} from './publish-utils';

import { MIN_REQUIRED_ACTIVITY } from './constants';

/**
 * Prepare and publish statistics data to a Slack channel
 * @param {string} oauthToken
 * @param {string} legendMessageUrl url to an arbitrary slack message
 * @param {string} channelId
 * @param {Object} statistics
 */
export const publishStats = async (oauthToken, legendMessageUrl, channelId, statistics) => {
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
