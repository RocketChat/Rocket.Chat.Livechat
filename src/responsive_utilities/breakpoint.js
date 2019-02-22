import preact from 'preact';
import MediaQuery from 'react-responsive';

const breakpoints = {
	desktop: '(min-width: 1025px)',
	tablet: '(min-width: 768px) and (max-width: 1024px)',
	phone: '(max-width: 767px)',
};

const { string, object } = preact.PropTypes;

export default function Breakpoint(props) {
	const breakpoint = breakpoints[props.name] || breakpoints.desktop;
	return (
		<MediaQuery query={breakpoint}>
			{props.children}
		</MediaQuery>
	);
}

preact.propTypes = {
	name: string,
	children: object,
};
