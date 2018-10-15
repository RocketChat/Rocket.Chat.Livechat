import { h } from 'preact';
<<<<<<< HEAD
import Header from '../components/Header';
=======
>>>>>>> master
import { Link } from 'preact-router/match';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';
import Header from '../components/Header';

describe('Initial Test of the Header', () => {

	test('Header renders 3 nav items', () => {
		const context = shallow(
			<Header>
				<Link />
				<Link />
				<Link />
			</Header>
		);

		expect(context.find('h1').text()).toBe('');
		expect(context.find(<Link />).length).toBe(3);
	});
});
