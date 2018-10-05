import { h } from 'preact';


import { Settings } from '../store/settings';
import Home from '../routes/home';

const wrapped = (props) => (<Settings>{({ state: { settings = { fileUpload: false }, theme = {} } }) => <Home color={theme.color}	{...props} uploads={settings.fileUpload} title={I18n.t('Need help?')} />}
</Settings>);
export default wrapped;
