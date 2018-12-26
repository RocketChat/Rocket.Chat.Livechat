import { h } from 'preact';
import { createClassName, normalizeDOMRect } from '../helpers';
import { PopoverTrigger } from '../Popover';
import styles from './styles';


export const Menu = ({ children, hidden, placement, ...props }) => (
	<div className={createClassName(styles, 'menu', { hidden, placement })} {...props}>
		{children}
	</div>
);


export const Group = ({ children, title, ...props }) => (
	<div className={createClassName(styles, 'menu__group')} {...props}>
		{title && <div className={createClassName(styles, 'menu__group-title')}>{title}</div>}
		{children}
	</div>
);


export const Item = ({ children, primary, danger, disabled, ...props }) => (
	<button
		className={createClassName(styles, 'menu__item', { primary, danger, disabled })}
		disabled={disabled}
		{...props}
	>{children}</button>
);


class PopoverMenuWrapper extends Component {
	state = {}

	handleRef = (ref) => {
		this.menuRef = ref;
	}

	componentDidMount() {
		const { triggerBounds, overlayBounds } = this.props;
		const menuBounds = normalizeDOMRect(this.menuRef.getDOMNode().getBoundingClientRect());

		const menuWidth = menuBounds.right - menuBounds.left;
		const menuHeight = menuBounds.bottom - menuBounds.top;

		const rightSpace = overlayBounds.right - triggerBounds.left;
		const bottomSpace = overlayBounds.bottom - triggerBounds.bottom;

		const left = menuWidth < rightSpace ? triggerBounds.left : null;
		const right = menuWidth < rightSpace ? null : overlayBounds.right - triggerBounds.right;

		const top = menuHeight < bottomSpace ? triggerBounds.bottom : null;
		const bottom = menuHeight < bottomSpace ? null : overlayBounds.bottom - triggerBounds.top;

		const placement = `${ menuWidth < rightSpace ? 'right' : 'left' }-${ menuHeight < bottomSpace ? 'bottom' : 'top' }`;

		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			position: { left, right, top, bottom },
			placement,
		});
	}

	render = ({ children }) => (
		<Menu
			ref={this.handleRef}
			style={{ position: 'absolute', ...this.state.position }}
			placement={this.state.placement}
		>
			{children}
		</Menu>
	)
}


export const PopoverMenu = ({ children, trigger }) => (
	<PopoverTrigger>
		{trigger}
		{({ triggerBounds, overlayBounds }) => (
			<PopoverMenuWrapper
				triggerBounds={triggerBounds}
				overlayBounds={overlayBounds}
			>
				{children}
			</PopoverMenuWrapper>
		)}
	</PopoverTrigger>
);


Menu.Group = Group;
Menu.Item = Item;
Menu.Popover = PopoverMenu;


export default Menu;
