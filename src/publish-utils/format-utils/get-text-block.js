/**
 * Creates markdown block

 * @returns {Object}
 */
const getTextBlock = (text, textType = 'mrkdwn', blockType = 'section') => {
    return {
        type: blockType,
        text: {
            type: textType,
            text,
        },
    };
};

export { getTextBlock };
