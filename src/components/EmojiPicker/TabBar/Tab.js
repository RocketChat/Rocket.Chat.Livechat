/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../../helpers';

class Tab extends Component {

  onClick = () => {
  	const { label, onClick } = this.props;
  	onClick(label);
  }

  render = () => {
  	const {
  		onClick,
  		props: {
  			activeTab,
  			label,
  		},
  	} = this;

  	let className = '';

  	if (activeTab === label) {
  		className += createClassName(styles, 'tab-list-active');
  	}
    
  	return (
  		<li
	      className={createClassName(styles, 'tab-list-item', {}, [className])}
	  		onClick={onClick}
  		>
  			{label}
  		</li>
  	);
  }
}

export default Tab;
