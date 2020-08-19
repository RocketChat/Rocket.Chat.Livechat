import { uiKitMessage, UiKitParserMessage, BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';

const DividerBlock = () =>
	<hr />;

const SectionBlock = ({ blockId, appId, text, fields, accessory, parser }) => {
	let key = 0;
	const parsedText = text ? parser.text(text, BLOCK_CONTEXT.SECTION, key++) : null;
	const parsedFields = fields ? fields.map((field) => parser.text(field, BLOCK_CONTEXT.SECTION, key++)) : null;
	const parsedAccessory = parser.renderAccessories({ blockId, appId, ...accessory }, BLOCK_CONTEXT.SECTION, undefined, key++);

	return <div>
		<div>
			{parsedText}
			{parsedFields}
		</div>
		{parsedAccessory && <div>
			{parsedAccessory}
		</div>}
	</div>;
};

const ImageBlock = () =>
	<div />;

const ActionsBlock = () =>
	<div />;

const ContextBlock = () =>
	<div />;

class MessageParser extends UiKitParserMessage {
	divider = (element, context, index) => {
		if (context !== BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <DividerBlock key={index} {...element} />;
	}

	section = (element, context, index) => {
		if (context !== BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <SectionBlock key={index} {...element} parser={this} />;
	}

	image = (element, context, index) => {
		if (context === BLOCK_CONTEXT.BLOCK) {
			return <ImageBlock key={index} />;
		}

		return <img key={index} />;
	}

	actions = (element, context, index) => {
		if (context !== BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <ActionsBlock key={index} {...element} parser={this} />;
	}

	context = (element, context, index) => {
		if (context !== BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <ContextBlock key={index} {...element} parser={this} />;
	}

	plainText = () =>
		null;

	mrkdwn = () =>
		null;

	button = () =>
		null

	overflow = () =>
		null

	datePicker = () =>
		null

	staticSelect = () =>
		null

	multiStaticSelect = () =>
		null
}

const parser = new MessageParser();
export const renderMessageBlocks = uiKitMessage(parser);
