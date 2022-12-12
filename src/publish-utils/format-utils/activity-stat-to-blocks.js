import { getTextBlock } from './get-text-block';

/**
 * Converts activity stat object to an array of Slack blocks
 * @param {Object} activityStat
 * @param {string} legendMessageUrl URl to a slack message
 * @returns {Object[]}
 */
const activityStatToBlocks = (activityStat, legendMessageUrl) => {
    // Render empty block if message url is not supplied
    const legendMessage = legendMessageUrl ? getTextBlock(`_By activity points (<${legendMessageUrl}|what is it?>)_`) : getTextBlock(' ');
    const blocks = [
        getTextBlock('🙇 General contributors statistics', 'plain_text', 'header'),
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

        blocks.push(getTextBlock(`*${username}:* ${userstat}`));
    });

    return blocks;
};

export { activityStatToBlocks };
