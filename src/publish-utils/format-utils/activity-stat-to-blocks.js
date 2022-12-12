import { getMrkdwnBlock } from './get-mrkdwn-block';

/**
 * Converts activity stat object to an array of Slack blocks
 * @param {Object} activityStat
 * @param {string} legendMessageUrl URl to a slack message
 * @returns {Object[]}
 */
const activityStatToBlocks = (activityStat, legendMessageUrl) => {
    // Render empty block if message url is not supplied
    const legendMessage = legendMessageUrl ? getMrkdwnBlock(`_By activity points (<${legendMessageUrl}|what is it?>)_`) : getMrkdwnBlock(' ');
    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🙇 General contributors statistics',
                emoji: true,
            },
        },
        legendMessage,
    ];

    const statArray = Object.entries(activityStat);
    const sortedByActivity = statArray.sort((a, b) => {
        if (a[1] > b[1]) {
            return -1;
        }
        return 0;
    });

    sortedByActivity.forEach((stat) => {
        const username = stat[0];
        const userstat = stat[1];

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${username}:* ${userstat}`,
            },
        });
    });

    return blocks;
};

export { activityStatToBlocks };
