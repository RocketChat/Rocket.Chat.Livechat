#!/usr/bin/env node
const fs = require('fs');
const prompts = require('prompts');
const { promisify } = require('util');


const importTranslationsFrom = async(rocketChatSourceDir) => {
	const oldTranslations = (await promisify(fs.readdir)(`${ rocketChatSourceDir }/packages/rocketchat-i18n/i18n`))
		.filter((name) => name.startsWith('livechat.') && name !== 'livechat.en.i18n.json')
		.map((name) => ({
			language: /livechat\.(.+?)\.i18n.json/.exec(name)[1].replace('-', '_'),
			strings: require(`${ rocketChatSourceDir }/packages/rocketchat-i18n/i18n/${ name }`),
		}));

	const newStrings = require('./src/i18n/default.json').en;
	const oldStrings = require(`${ rocketChatSourceDir }/packages/rocketchat-i18n/i18n/livechat.en.i18n.json`);

	const mapKeys = {};
	for (const [newKey, newString] of Object.entries(newStrings)) {
		const oldEntry = Object.entries(oldStrings).find(([, oldString]) => newString === oldString);
		oldEntry && (mapKeys[oldEntry[0]] = newKey);
	}

	const newTranslations = oldTranslations
		.map(({ language, strings }) => ({
			language,
			strings: {
				...newStrings,
				...(
					Object.entries(strings)
						.filter(([oldKey]) => !!mapKeys[oldKey])
						.reduce((strings, [oldKey, oldString]) => ({ ...strings, [mapKeys[oldKey]]: oldString }), {})
				),
			},
		}));

	for (const { language, strings } of newTranslations) {
		console.log(`Writing i18n file for language "${ language }"...`);
		await promisify(fs.writeFile)(`${ __dirname }/src/i18n/${ language }.json`, JSON.stringify(strings, null, 2));
	}
};

const main = async() => {
	const { rocketChatSourceDir } = await prompts({
		type: 'text',
		name: 'rocketChatSourceDir',
		message: 'Where is Rocket.Chat source?',
		initial: process.argv[2] || '../Rocket.Chat',
		validate: (path) => {
			try {
				return fs.lstatSync(path).isDirectory();
			} catch (e) {
				return false;
			}
		},
	});
	await importTranslationsFrom(rocketChatSourceDir);
};


require.main === module && main();
