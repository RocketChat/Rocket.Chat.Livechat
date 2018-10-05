import { h } from 'preact';


import { Settings } from '../store/settings';
import Register from '../routes/register';

const wrapped = (props) => (<Settings>{(configs) => (<Register {...props} title={I18n.t('Need help?')} />)}
</Settings>);
export default wrapped;
