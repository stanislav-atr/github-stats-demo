// Reply to a message with the channel ID and message TS
async function replyMessage(client, oauthToken, message, channelId, threadTs) {
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
        console.error(error);
    }
}

module.exports = {
    replyMessage,
};
