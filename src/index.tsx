import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		// Применение настроек через CSS-переменные
		const root = document.documentElement;
		root.style.setProperty(
			'--font-family',
			articleSettings.fontFamilyOption.value
		);
		root.style.setProperty('--font-size', articleSettings.fontSizeOption.value);
		root.style.setProperty('--font-color', articleSettings.fontColor.value);
		root.style.setProperty(
			'--container-width',
			articleSettings.contentWidth.value
		);
		root.style.setProperty('--bg-color', articleSettings.backgroundColor.value);
	}, [articleSettings]);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				menuSettings={articleSettings}
				updateSettings={setArticleSettings}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
