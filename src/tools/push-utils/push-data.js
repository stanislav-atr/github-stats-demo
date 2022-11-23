// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const COMMON_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const pushData = async (webhookUrl, ...args) => {
    for (let i = 0; i < args.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await fetch(webhookUrl, {
            ...COMMON_OPTIONS,
            body: JSON.stringify({
                blocks: [...args[i]],
            }),
        });
    }
};

module.exports = { pushData };
