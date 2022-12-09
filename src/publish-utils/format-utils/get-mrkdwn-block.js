/**
 * Creates markdown block
 * @param {string} text
 * @returns {Object}
 */
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
