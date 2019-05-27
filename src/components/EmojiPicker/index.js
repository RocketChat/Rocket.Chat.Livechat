/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'preact';
import Tabs from './TabBar/Tabs';
import categories from './categories';
import styles from './styles';
import { createClassName } from '../helpers';

export class EmojiPicker extends Component {

  render = () => (
  	<section className={createClassName(styles, 'section')}>
  		<Tabs>
  			{categories.tabs.map((val) => (
  				<div label={val.tabLabel}>This might be working</div>
  			))}
  		</Tabs>
  	</section>
  )

}
