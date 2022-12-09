/**
 * Formats date to a slack-readable string
 * https://api.slack.com/reference/surfaces/formatting#date-formatting
 * @param {string} date ISO date
 * @returns {string}
 */
const getFormattedDate = (date) => {
    const time = new Date(date)
        .getTime()
        .toString()
        // unix time should be shortened for it to be parsed
        .slice(0, -3);
    return `<!date^${time}^{date}|Previous day>`;
};

export { getFormattedDate };
