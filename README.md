# Rocket.Chat.Livechat


### When making changes, run `yarn build` to create a new build before merging with master


This branch contains a button component @ `/src/components/Messages/MessageAction`. 

<p align="center">
<img width="483" alt="Screenshot 2020-06-09 at 8 43 21 PM" src="https://user-images.githubusercontent.com/41849970/84166039-025fc780-aa92-11ea-9f84-81adf1bcd823.png">
</p>

For example you can send a following rich message payload to use with this component:

```

const msgObject = {
	_id: Random.id(),
	rid: item.rid,
	msg: 'Sorry I am not sure of your request. Please select one of the following options:',
	attachments: [{
		actions: [
			{
			   type: 'button',
			   msg_in_chat_window: true,
			   msg_processing_type: 'sendMessage',
			   text: 'Contact Salesforce Agent',
			   msg: 'getSessionId',
			},
			{
			   type: 'button',
			   msg_in_chat_window: true,
			   msg_processing_type: 'sendMessage',
			   text: 'Send Random String',
			   msg: 'randomWord',
			 },
			 {
			   type: 'button',
		           msg_in_chat_window: true,
			   msg_processing_type: 'sendMessage',
	                   text: 'Close Chat',
			   msg: 'closeChat',
			 },
	],
  }],
};

```

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/RocketChat/Rocket.Chat.Livechat.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/RocketChat/Rocket.Chat.Livechat/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/RocketChat/Rocket.Chat.Livechat.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/RocketChat/Rocket.Chat.Livechat/alerts/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://rocketchat.github.io/Rocket.Chat.Livechat)
## CLI Commands

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# test the production build locally
yarn serve

# run tests with jest and preact-render-spy
yarn test

# run the storybook
yarn storybook

# before commit run
yarn i18n
```

## Screens:
![image](https://user-images.githubusercontent.com/5263975/44279585-497b2980-a228-11e8-81a2-36bc3389549e.png)
![image](https://user-images.githubusercontent.com/5263975/44279599-5730af00-a228-11e8-8873-553ef53ee25a.png)
![image](https://user-images.githubusercontent.com/5263975/44279626-6f083300-a228-11e8-8886-c430b28a8e75.png)
![image](https://user-images.githubusercontent.com/5263975/44279634-74657d80-a228-11e8-9583-bf8079972696.png)
![image](https://user-images.githubusercontent.com/5263975/44279639-7b8c8b80-a228-11e8-9815-1a0e3540c4f5.png)
![image](https://user-images.githubusercontent.com/5263975/44279643-847d5d00-a228-11e8-804e-27b973dee8b2.png)
![image](https://user-images.githubusercontent.com/5263975/44279655-90691f00-a228-11e8-8511-4a328a77e5bb.png)
