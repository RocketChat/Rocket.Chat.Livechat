import { uiKitMessage, UiKitParserMessage, BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';

import ButtonElement from './ButtonElement';
import DividerBlock from './DividerBlock';
import Mrkdwn from './Mrkdwn';
import PlainText from './PlainText';
import SectionBlock from './SectionBlock';

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

	plainText = (element, context, index) => {
		if (context === BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <PlainText key={index} {...element} />;
	}

	mrkdwn = (element, context, index) => {
		if (context === BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <Mrkdwn key={index} {...element} />;
	}

	button = (element, context, index) => {
		if (context === BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		return <ButtonElement key={index} {...element} parser={this} context={BLOCK_CONTEXT.SECTION} />;
	}

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
