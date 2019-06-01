/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'preact';
import Tabs from './TabBar/Tabs';
import categories from './categories';
import styles from './styles';
import { createClassName } from '../helpers';
import { emojisByCategory } from '../../emoji';
import { emojify } from 'react-emojione';

export class EmojiPicker extends Component {

  lowerFirstLetter = (string) => {
  	if (typeof string === undefined) { return; }
  	const firstLetter = string[0] || string.charAt(0);
  	return firstLetter ? firstLetter.toLowerCase() + string.substring(1) : '';
  }

  render = () => (
  	<section className={createClassName(styles, 'section')}>
  		<Tabs>
  			{categories.tabs.map((val) => (
  				<div label={val.tabLabel}>
  					<h3 className={createClassName(styles, 'label-header')}>{val.category}</h3>
  					{val.category === 'Custom' ? (
  						<ul className={createClassName(styles, 'emoji-list')}>
  							<li>
  								{emojify(':smile:', { output: 'unicode' })}
  							</li>
  						</ul>
  					) : null}
  					{emojisByCategory[this.lowerFirstLetter(val.category)] ? (
  						emojisByCategory[this.lowerFirstLetter(val.category)].map((emoji) => (
  							<ul className={createClassName(styles, 'emoji-list')}>
  								<li>
  									{emojify(`:${ emoji }:`, { output: 'unicode' })}
  								</li>
  							</ul>
  						))
  					) : null}
  				</div>
  			))}
  		</Tabs>
  	</section>
  )

}
