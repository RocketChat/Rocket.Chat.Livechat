import { BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';
import { memo, useState, useMemo, useCallback } from 'preact/compat';

import I18n from '../../../../i18n';
import { Button } from '../../../Button';
import { createClassName } from '../../../helpers';
import styles from './styles.scss';

const ActionsBlock = ({ elements, parser }) => {
	const [collapsed, setCollapsed] = useState(true);
	const renderableElements = useMemo(() => (collapsed ? elements.slice(0, 5) : elements), [collapsed, elements]);
	const hiddenElementsCount = elements.length - renderableElements.length;
	const isMoreButtonVisible = hiddenElementsCount > 0;

	const handleMoreButtonClick = useCallback(() => {
		setCollapsed(false);
	}, []);

	return <div className={createClassName(styles, 'uikit-actions-block')}>
		{renderableElements.map((element, key) => {
			const renderedElement = parser.renderActions(element, BLOCK_CONTEXT.ACTION);
			if (!renderedElement) {
				return null;
			}

			return <div key={key} className={createClassName(styles, 'uikit-actions-block__item')}>
				{renderedElement}
			</div>;
		})}
		{isMoreButtonVisible && <Button outline secondary small onClick={handleMoreButtonClick}>
			{I18n.t('+ %{hiddenElementsCount} more', { hiddenElementsCount })}
		</Button>}
	</div>;
};

export default memo(ActionsBlock);
