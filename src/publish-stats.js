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
const publishStats = async (oauthToken, channelId, statistics) => {
    const {
        repoStat,
        activityStat,
        activitiesByType,
    } = pruneStatistics(statistics, MIN_REQUIRED_ACTIVITY);

    // const repoStat = {
    //     timePeriod: { until: '2022-11-21T15:00:00Z', since: '2022-11-20T00:00:00Z' },
    //     newIssues: 136,
    //     resolvedIssues: 128,
    //     closedAsStaleIssues: 4,
    //     newPulls: 4,
    //     mergedPulls: 2,
    //     remainingIssues: 154,
    // };

    // const activityStat = {
    //     'Sergey-Lyapin': 29,
    //     oatmealine: 1,
    //     'adguard-bot': 30,
    //     mercury233: 1,
    //     Yuki2718: 21,
    //     'github-actions[bot]': 4,
    //     Oniqqqq: 2,
    //     BlazDT: 10,
    //     t3chnob0y: 2,
    //     tox1c90: 1,
    //     jimmysofat6864: 3,
    //     PhoenixIndigo: 1,
    //     T3rm1: 3,
    //     shape55: 1,
    //     zkeq: 1,
    //     sekretneyslysby: 2,
    //     zloyden: 65,
    //     piquark6046: 14,
    //     JobcenterTycoon: 1,
    //     AdamWr: 92,
    //     'Alex-302': 70,
    //     VladisLoveZh: 1,
    //     SebastianRasch: 1,
    //     krystian3w: 1,
    //     ilvjyw: 1,
    //     DandelionSprout: 1,
    //     lica98: 1,
    //     'kou-kee': 1,
    // };

    // const activitiesByType = {
    //     'Sergey-Lyapin': {
    //         resolvedIssues: 15,
    //         newPulls: 0,
    //         mergedPulls: 0,
    //         pullRequestsReview: 0,
    //         totalCommits: 14,
    //         totalComments: 0,
    //     },
    //     oatmealine: {
    //         resolvedIssues: 0,
    //         newPulls: 0,
    //         mergedPulls: 0,
    //         pullRequestsReview: 0,
    //         totalCommits: 0,
    //         totalComments: 1,
    //     },
    // };

    const repoStatBlocks = repoStatToBlocks(repoStat);
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
