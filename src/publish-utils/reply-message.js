/**
 * Reply to a message with the channel ID and message TS
 * @param {Object} client Slack WebClient instance
 * @param {string} oauthToken
 * @param {Object[]} message array of formatted blocks
 * @param {string} channelId
 * @param {string} threadTs id of a thread's parent message
 */
export async function replyMessage(client, oauthToken, message, channelId, threadTs) {
    try {
        await client.chat.postMessage({
            token: oauthToken,
            channel: channelId,
            thread_ts: threadTs,
            blocks: message,
            unfurl_links: false,
            unfurl_media: false,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}
