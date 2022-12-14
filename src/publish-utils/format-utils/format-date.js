import { format } from 'date-fns';

/**
 * Formats date to a slack-readable string
 * https://api.slack.com/reference/surfaces/formatting#date-formatting
 * @param {string} date ISO date
 * @returns {string}
 */
export const formatDate = (date) => {
    const time = format(new Date(date), 't');
    return `<!date^${time}^{date}|Previous day>`;
};
