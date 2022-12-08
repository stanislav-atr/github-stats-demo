const getMrkdwnBlock = (text) => {
    return {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text,
        },
    };
};

module.exports = {
    getMrkdwnBlock,
};
