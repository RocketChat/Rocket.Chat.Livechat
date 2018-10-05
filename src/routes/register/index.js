import { h, Component } from 'preact';

import { asyncForEach, asyncEvery } from '../../components/helpers';
import style from './style';
import Header, {
	Title, Content,
} from 'components/header';
import { Form, InputField, Item } from 'components/input';

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
		const valid = await asyncEvery(Array.from(this.state.fields), async(el) => await el.validate());
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

	render({ title }) {
		return (<div class={style.container}>
			<Header>
				<Content>
					<Title>{title}</Title>
				</Content>
			</Header>
			<main class={style.main}>
				<p>Please, tell us some informations to start the chat</p>
				<Form ref={(form) => this.formEl = form} onSubmit={this.submit} noValidate>
					<InputField required onChange={this.validate} ref={this.addToValidate} validations={['notNull', 'email']} name="email" placeholder="insert your e-mail here..."
						label="E-mail"
					/>
					<InputField required onChange={this.validate} ref={this.addToValidate} validations={['notNull']} name="name" placeholder="insert your name here..."
						label="Name"
					/>
					<Item>
						<Button disabled={!this.state.valid} stack>Start Chat</Button>
					</Item>
				</Form>
			</main>
			<Footer>
				<Container><Powered /></Container>
			</Footer>
		</div>);
	}
}
