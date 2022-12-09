import { WebClient, LogLevel } from '@slack/web-api';

/**
 * Create Slack API Web Client
 * @param {string} oauthToken
 * @returns {}
 */
export const makeClient = (oauthToken) => new WebClient(oauthToken, { logLevel: LogLevel.DEBUG });
