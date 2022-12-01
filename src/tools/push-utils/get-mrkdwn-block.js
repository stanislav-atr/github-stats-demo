const getMrkdwnBlock = (text) => {
    return {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text,
        },
    };
};

export { getMrkdwnBlock };
