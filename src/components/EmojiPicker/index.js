/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'preact';
import Tabs from './TabBar/Tabs';
import categories from './categories';
import styles from './styles';
import { createClassName } from '../helpers';
import { emojisByCategory } from '../../emoji';
import { Livechat } from '../../api';
import { emojify } from 'react-emojione';

export class EmojiPicker extends Component {

  lowerFirstLetter = (string) => {
  	if (typeof string === undefined) { return; }
  	const firstLetter = string[0] || string.charAt(0);
  	return firstLetter ? firstLetter.toLowerCase() + string.substring(1) : '';
  }

  render = ({ customEmojis }) => (
  	<section className={createClassName(styles, 'section')}>
  		<Tabs>
  			{categories.tabs.map((val) => (
  				<div label={val.tabLabel}>
  					<h3 className={createClassName(styles, 'label-header')}>{val.category}</h3>
  					{(() => {
  						if (val.category === 'Frequently Used') {
  							return (
  								<p className={createClassName(styles, 'no-emoji')}>Select an emoji first.</p>
  							);
  						}
  					})()}
  					{(() => {
  						if (val.category === 'Custom') {
  							{
  								return (customEmojis && customEmojis.length > 0 ? (
  									customEmojis.map((customEmoji) => (
  											(
  												<ul className={createClassName(styles, 'emoji-list')}>
  													<li><img src={`${ Livechat.client.host }/${ encodeURIComponent(customEmoji.name) }.${ customEmoji.extension }`} width="25" /></li>
  												</ul>
  											)
  										))
  								) : (
  									<p className={createClassName(styles, 'no-emoji')}>No Custom Emojis</p>
  								)); }
  						}
  					})()}
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
