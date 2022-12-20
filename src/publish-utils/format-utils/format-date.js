import { format } from 'date-fns';

/**
 * Formats date
 * https://api.slack.com/reference/surfaces/formatting#date-formatting
 * @param {string} date ISO date
 * @returns {string}
 */
export const formatDate = (date) => format(new Date(date), 'EEEE, dd.MM.y');
