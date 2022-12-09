// Post a message to a channel your app is in using ID and message text
async function publishMessage(client, oauthToken, message, channelId) {
    let messageInfo;
    try {
        messageInfo = await client.chat.postMessage({
            oauthToken,
            channel: channelId,
            blocks: message,
            unfurl_links: false,
            unfurl_media: false,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    // returs result, which includes information about the message (like TS)
    return messageInfo;
}

module.exports = {
    publishMessage,
};
