/**
 * Converts activity stat object to string of Slack blocks
 * @param {Object} repoStat
 * @returns {Array}
 */
const activityStatToBlocks = (activityStat) => {
    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🙇 General contributors statistics',
                emoji: true,
            },
        },
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

module.exports = {
    activityStatToBlocks,
};
