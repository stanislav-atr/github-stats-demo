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

    const repoStatBlocks = repoStatToBlocks(repoStat);
    const generalActivityBlocks = activityStatToBlocks(activityStat, legendMessageUrl);
    const detailedUserBlocks = activityByTypeToBlocks(activitiesByType);

    const client = makeClient(oauthToken);
    const messageInfo = await publishMessage(client, repoStatBlocks, channelId);

    await replyMessage(client, generalActivityBlocks, channelId, messageInfo.ts);

    for (let i = 0; i < detailedUserBlocks.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await replyMessage(client, detailedUserBlocks[i], channelId, messageInfo.ts);
    }
};
