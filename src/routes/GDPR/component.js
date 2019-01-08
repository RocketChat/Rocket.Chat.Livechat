import { Component } from 'preact';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';

export default class GDPR extends Component {
	handleClick = () => {
		const { onClick } = this.props;
		onClick && onClick();
	}

	render = ({
		color,
		title,
        consentText,
        instructions,
        loading,
        onClick,
		...props
	}) => (
		<Screen
			color={color}
			title={title}
			className={createClassName(styles, 'gdpr')}
			{...props}
		>
			<p className={createClassName(styles, 'gdpr__consent-text')}>{consentText}</p>
			<p className={createClassName(styles, 'gdpr__instructions')}>{instructions}</p>

			<Form>
				<Form.Item>
					<Button onClick={this.handleClick} stack>I Agree</Button>
				</Form.Item>
			</Form>
		</Screen>
	)
}
