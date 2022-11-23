const hourlyActivityToBlocks = (hourlyActivity) => {
    let hourField = '';
    let activityBarField = '';

    hourlyActivity.forEach((activity, hour) => {
        const bar = `|${'█'.repeat(activity)}`;

        hourField += `${hour}\n`;
        activityBarField += `${activity} ${bar}\n`;
    });

    // Slack restricts messages to 50 blocks, thus
    // table data is done as two columns (instead of rows)
    // to fit it into one block
    const tableBodyBlock = {
        type: 'section',
        fields: [
            {
                type: 'mrkdwn',
                text: hourField,
            },
            {
                type: 'mrkdwn',
                text: activityBarField,
            },
        ],
    };

    return tableBodyBlock;
};

const dailyActivityToBlocks = (dailyActivity) => {
    const blocks = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const date of Object.keys(dailyActivity)) {
        const tableHeadBlock = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Date: ${date}`,
                },
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: 'hour',
                    },
                    {
                        type: 'mrkdwn',
                        text: 'activity',
                    },
                ],
            },
            {
                type: 'divider',
            },
        ];

        const hourlyActivityBlock = hourlyActivityToBlocks(dailyActivity[date]);

        blocks.push(...tableHeadBlock);
        blocks.push(hourlyActivityBlock);
    }

    return blocks;
};

/**
 *
 * @param {Object} repoStat
 * @returns {Array}
 */
const activityByTimeToBlocks = (activitiesByTime) => {
    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🕗 Detailed contributor statistics',
                emoji: true,
            },
        },
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const name of Object.keys(activitiesByTime)) {
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${name}*`,
            },
        });

        const activityBlocks = dailyActivityToBlocks(activitiesByTime[name]);
        blocks.push(...activityBlocks);
    }

    return blocks;
};

module.exports = {
    activityByTimeToBlocks,
};
