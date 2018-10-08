import { h, Component } from 'preact';

import { asyncForEach, asyncEvery } from '../../components/helpers';
import style from './style';
import Header, {
	Title, Content, Actions, Action,
} from 'components/header';
import { Form, InputField, Item } from 'components/input';

import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';

import Button from 'components/Button';
import Footer, { Container, Powered } from 'components/Footer';

export default class Home extends Component {
	submit = async(event) => {
		event.preventDefault();
		if (await this.validate()) {
			this.props.onSubmit([...this.state.fields].map((el) => [el.props.name, el.value]).reduce((values, [key, value]) => ({ ...values, [key]: value }), { }));
		}
	}

	validate = async() => {
		const valid = await asyncEvery([...this.state.fields], async(el) => await el.validate());
		this.setState({
			valid,
		});
		return valid;
	}

	addToValidate = (element) => {
		this.state.fields.add(element);
	}

	constructor(props) {
		super(props);
		this.state = {
			valid: false,
			fields: new Set(),
		};
	}

	componentDidMount() {
		this.validate();
	}

	render({ title, minimize, fullScreen, notification, loading, emailPlaceholder = 'insert your e-mail here...', namePlaceholder = 'insert your name here...', messsagePlaceholder = 'write your message...' }) {
		return (<div class={style.container}>
			<Header>
				<Content>
					<Title>{title}</Title>
				</Content>
				<Actions>
					<Action onClick={notification}><Bell width={20} /></Action>
					<Action onClick={minimize}><Arrow width={20} /></Action>
					<Action onClick={fullScreen}><NewWindow width={20} /></Action>
				</Actions>
			</Header>
			<main class={style.main}>
				<p>Please, tell us some informations to start the chat</p>
				<Form ref={(form) => this.formEl = form} onSubmit={this.submit} noValidate>
					<InputField disabled={loading} required onChange={this.validate} ref={this.addToValidate} validations={['notNull', 'email']} name="email"
						placeholder={emailPlaceholder}
						label="E-mail"
					/>
					<InputField disabled={loading} equired onChange={this.validate} ref={this.addToValidate} validations={['notNull']} name="name"
						placeholder={namePlaceholder}
						label="Name"
					/>
					<InputField
						disabled={loading}
						multiple={4}
						required
						onChange={this.validate}
						ref={this.addToValidate}
						validations={['notNull']}
						name="message"
						placeholder={messsagePlaceholder}
						label="Message"
					/>
					<Item>
						<Button loading={loading} disabled={!this.state.valid || loading} stack>Send</Button>
					</Item>
				</Form>
			</main>
			<Footer>
				<Container><Powered /></Container>
			</Footer>
		</div>);
	}
}
