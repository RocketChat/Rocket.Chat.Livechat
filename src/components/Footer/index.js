import { h } from 'preact';

import I18n from '../../i18n';
import { PopoverMenu } from '../Menu';
import { createClassName } from '../helpers';
import Logo from './logo.svg';
import styles from './styles.scss';


export const Footer = ({ children, className, ...props }) => (
	<footer className={createClassName(styles, 'footer', {}, [className])} {...props}>
		{children}
	</footer>
);


export const FooterContent = ({ children, className, ...props }) => (
	<div className={createClassName(styles, 'footer__content', {}, [className])} {...props}>
		{children}
	</div>
);


export const PoweredBy = ({ className, ...props }) => (
	<h3 className={createClassName(styles, 'powered-by', {}, [className])} {...props}>
		{I18n.t('Powered by Rocket.Chat').split('Rocket.Chat')[0]}
		<a href='https://rocket.chat' target='_blank' rel='noopener noreferrer'>
			<Logo className={createClassName(styles, 'powered-by__logo')} width={60} height={60 * 272 / 1500} role='img' aria-label='Rocket.Chat' />
		</a>
		{I18n.t('Powered by Rocket.Chat').split('Rocket.Chat')[1]}
	</h3>
);


const handleMouseUp = ({ target }) => target.blur();

const OptionsTrigger = ({ pop }) => (
	<button className={createClassName(styles, 'footer__options')} onClick={pop} onMouseUp={handleMouseUp}>
		{I18n.t('Options')}
	</button>
);


export const FooterOptions = ({ children }) => (
	<PopoverMenu trigger={OptionsTrigger} overlayed>
		{children}
	</PopoverMenu>
);


export const CharCounter = ({ className, style = {}, textLength, limitTextLength }) => (
	<span
		className={createClassName(styles, 'footer__remainder', { highlight: textLength === limitTextLength }, [className])}
		style={style}
	>
		{textLength} / {limitTextLength}
	</span>
);
