import { render } from 'preact';
import Modal from '.';
import Button from '../../components/Button';

let node;
let root;

const renderModal = (component) => {
	if (!component) {
		return;
	}

	if (!node) {
		node = document.createElement('div');
		document.body.appendChild(node);
	}

	root = render(component, node);
};

const unrenderModal = () => {
	render(null, node, root);
	node && node.remove();
	node = null;
};

const renderAlert = (settings = {}) => {
	const { text, buttonText = 'Ok', timeout = 0 } = settings;
	return new Promise((resolve) => {
		const component = (
			<Modal
				open
				animated
				dismissByOverlay={false}
				onDismiss={unrenderModal}
				timeout={timeout}
			>
				<Modal.Message>
					{ text }
				</Modal.Message>
				<Button.Group>
					<Button
						secondary
						onClick={() => {
							unrenderModal();
							resolve({ success: true });
						}}
					>
						{ buttonText }
					</Button>
				</Button.Group>
			</Modal>
		);

		renderModal(component);
	});
};

const renderDialog = async(settings = {}) => {
	const { text, onDismiss, confirmButtonText = 'Yes', cancelButtonText = 'No' } = settings;
	return new Promise((resolve) => {
		const component = (
			<Modal
				open
				animated
				dismissByOverlay={false}
				onDismiss={onDismiss}
			>
				<Modal.Message>
					{ text }
				</Modal.Message>
				<Button.Group>
					<Button outline secondary
						onClick={() => {
							unrenderModal();
							resolve({ success: false });
						}}
					>
						{ cancelButtonText }
					</Button>
					<Button danger
						onClick={() => {
							unrenderModal();
							resolve({ success: true });
						}}
					>
						{ confirmButtonText }
					</Button>
				</Button.Group>
			</Modal>);

		renderModal(component);
	});
};

export const ModalManager = {
	async confirm(settings = {}) {
		return await renderDialog(settings);
	},

	async alert(settings = {}) {
		return await renderAlert(settings);
	},
};

export default ModalManager;
