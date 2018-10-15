import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withKnobs, color } from '@storybook/addon-knobs';
import path from 'path';

const req = require.context('./', true, /\.svg$/);
const iconset = req.keys()
	.map((filename) => ({
		component: req(filename),
		name: path.basename(filename, '.svg'),
	}));

const IconDisplay = ({ component: Icon, name, color }) => (
	<div
		style={{
			width: '130px',
			height: '130px',
			margin: '10px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'stretch',
		}}
	>
		<div style={{ flex: '1', display: 'flex', alignItems: 'center', color }}>
			<Icon width={48} height={48} />
		</div>
		<div style={{ flex: '0' }}>{name}</div>
	</div>
);

const stories = storiesOf('Icons', module);

stories
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('all', () => (
		<div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
			{iconset.map((props) => <IconDisplay color={color('color', '#000000')} {...props} />)}
		</div>
	))
;

iconset.forEach(({ component: Icon, name }) =>
	stories
		.add(name, () => (
			<div style={{ color: color('color', '#000000') }}>
				<Icon width={256} height={256} />
			</div>
		))
);
