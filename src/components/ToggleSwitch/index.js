/* eslint-disable react/prefer-stateless-function */
import { h, Component } from 'preact';

import { createClassName } from '../helpers';
import styles from './styles.scss';

export default class Toggle extends Component {
	render({ title, handleToggleSwitch, modeToggled, dynamicText }) {
		return (
			<div className={createClassName(styles, 'toggle-switch')}>
				<p className={createClassName(styles, 'toggle-switch__title')}>
					<span className={createClassName(styles, `toggle-switch-title-${ dynamicText }`)}>{title}</span>
				</p>
				<label className={createClassName(styles, 'toggleswitch')}>
					<input
						type='checkbox'
						checked={modeToggled}
						onChange={(e) => handleToggleSwitch(e)}
					/>
					<span className={createClassName(styles, 'switch')} />
				</label>
			</div>
		);
	}
}
