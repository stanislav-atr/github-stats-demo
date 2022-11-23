/**
 *
 * @param {Object} repoStat
 * @returns {Array}
 */
const activityByTypeToBlocks = (activitiesByType) => {
    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '📋 Detailed contributor statistics',
                emoji: true,
            },
        },
    ];

    Object.entries(activitiesByType).forEach((stat) => {
        const username = stat[0];
        const activities = stat[1];
        const {
            resolvedIssues,
            newPulls,
            mergedPulls,
            pullRequestsReview,
            totalCommits,
            totalComments,
        } = activities;

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${username}:*`,
            },
        });

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Resolved issues: ${resolvedIssues}
New pull requests: ${newPulls}
Merged pull requests: ${mergedPulls}
Pull requests reviews: ${pullRequestsReview}
Total commit: ${totalCommits}
Total comments: ${totalComments}
                `,
            },
        });
    });

    return blocks;
};

module.exports = {
    activityByTypeToBlocks,
};
