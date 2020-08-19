import { uiKitMessage, UiKitParserMessage, BLOCK_CONTEXT, ELEMENT_TYPES } from '@rocket.chat/ui-kit';
import { h } from 'preact';

import renderEmojis from '../Messages/MessageText/emoji';
import { renderMarkdown } from '../Messages/MessageText/markdown';

class MessageParser extends UiKitParserMessage {
	text(args, context, index) {
		if (args.type === ELEMENT_TYPES.PLAIN_TEXT) {
			return this.plainText(args, context, index);
		}

		if (args.type === ELEMENT_TYPES.MARKDOWN) {
			return this.mrkdwn(args, context, index);
		}

		return null;
	}

	plainText({ text }, context, index) {
		if (context === BLOCK_CONTEXT.SECTION) {
			return <div key={index} children={text} />;
		}

		return null;
	}

	mrkdwn({ text }, context, index) {
		if (context === BLOCK_CONTEXT.SECTION) {
			return <div
				key={index}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{
					__html: renderEmojis(renderMarkdown(text), text),
				}}
			/>;
		}

		return null;
	}

	section(args, context, index) {
		if (context !== BLOCK_CONTEXT.BLOCK) {
			return null;
		}

		const { blockId, appId, text, fields, accessory } = args;
		const parsedText = text ? this.text(text, BLOCK_CONTEXT.SECTION) : null;
		const parsedFields = fields ? fields.map((field, i) => this.text(field, BLOCK_CONTEXT.SECTION, i)) : null;
		const parsedAccessory = this.renderAccessories({ blockId, appId, ...accessory }, BLOCK_CONTEXT.SECTION, this);

		return <div key={index}>
			<div>
				{parsedText}
				{parsedFields}
			</div>
			{parsedAccessory && <div>
				{parsedAccessory}
			</div>}
		</div>;
	}

	image(args, context, index) {
		if (context === BLOCK_CONTEXT.SECTION) {
			const { image_url: imageUrl, alt_text: altText } = args;
			return <img key={index} src={imageUrl} alt={altText} />;
		}

		return null;
	}

	button = () => null

	overflow = () => null

	datePicker = () => null

	divider = () => null

	actions = () => null

	context = () => null

	// overflow(element, context) {
	//   return <Overflow context={context} {...element} parser={this}/>;
	// }

	// button(element, context, key) {
	//   return <UIKitButton element={element} context={context} key={key} parser={this}/>;
	// }

	// divider(_, __, key) {
	//   return <Divider mb='x24' key={key}/>;
	// }

	// actions(args, _, key) {
	//   return <ActionsLayoutBlock {...args} key={key} parser={this} />;
	// }

	// datePicker(element, context, key) {
	//   const [{ loading, value, error }, action] = useBlockContext(element, context);
	//   const { actionId, placeholder } = element;
	//   return (
	//     <InputBox
	//       key={key}
	//       error={error}
	//       value={value}
	//       disabled={loading}
	//       id={actionId}
	//       name={actionId}
	//       rows={6}
	//       onInput={action}
	//       placeholder={this.plainText(placeholder)}
	//       type='date'
	//     />
	//   );
	// }

	// context({ elements }, context, key) {
	//   return (
	//     <Block key={key}>
	//       <Box display='flex' alignItems='center' m='neg-x4'>
	//         {elements.map((element, i) => (
	//           <Margins all='x4' key={i}>
	//             {[
	//               ELEMENT_TYPES.PLAIN_TEXT,
	//               ELEMENT_TYPES.MARKDOWN,
	//             ].includes(element.type) ? (
	//                 <Box is='span' fontScale='c1' color='info'>
	//                   {this.renderContext(element, BLOCK_CONTEXT.CONTEXT, this)}
	//                 </Box>
	//               )
	//               : this.renderContext(element, BLOCK_CONTEXT.CONTEXT, this)
	//             || element.type
	//             }
	//           </Margins>
	//         ))}
	//       </Box>
	//     </Block>
	//   );
	// }

	// multiStaticSelect(element, context, key) {
	//   return (
	//     <MultiStaticSelect
	//       {...element}
	//       key={key}
	//       parser={this}
	//       context={context}
	//     />
	//   );
	// }

	// staticSelect(element, context, key) {
	//   return <StaticSelect key={key} context={context} {...element} parser={this} />;
	// }

	// selectInput(element, context, key) {
	//   const [{ loading, value }, action] = useBlockContext(element, context);
	//   return (
	//     <SelectInput key={key} value={value} onChange={action} mod-loading={loading} placeholder={element.type} disabled />
	//   );
	// }
}

const parser = new MessageParser();
export const renderMessageBlocks = uiKitMessage(parser);
