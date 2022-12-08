const { WebClient, LogLevel } = require('@slack/web-api');

/**
 * Create Slack API Web Client
 * @param {string} oauthToken
 * @returns {}
 */
const makeClient = (oauthToken) => new WebClient(oauthToken, { logLevel: LogLevel.DEBUG });

module.exports = {
    makeClient,
};
