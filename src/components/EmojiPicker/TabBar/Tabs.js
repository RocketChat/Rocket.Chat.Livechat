/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../../helpers';
import Tab from './Tab';

class Tabs extends Component {

  onClickTabItem = (tab) => {
  	this.setState({ activeTab: tab });
  }

  constructor(props) {
  	super(props);

  	this.state = {
  		activeTab: this.props.children[0].props.label,
  	};
  }

  render = () => {
  	const {
  		onClickTabItem,
  		props: {
  			children,
  		},
  		state: {
  			activeTab,
  		},
  	} = this;

  	return (
  		<div>
  			<ol className={createClassName(styles, 'tab-list')}>
  				{children.map((child) => {
  					const { label } = child.props;

  					return (
  						<Tab
	  						activeTab={activeTab}
	              key={label}
	              label={label}
	              onClick={onClickTabItem}
  						/>
  					);
  				})}
  			</ol>
  			<div>
  				{children.map((child) => {
  					if (child.props.label !== activeTab) { return undefined; }
  					return child.props.children;
  				})}
  			</div>
  		</div>
  	);
  }
}

export default Tabs;
