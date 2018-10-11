import { h } from 'preact';
import style from './style';
import Bell from 'icons/bell.svg'
const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
		<Bell width={30}/>
	</div>
);

export default Home;
