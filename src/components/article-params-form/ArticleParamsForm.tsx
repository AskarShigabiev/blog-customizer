import { FormEvent, useState, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';

export type ArticleParamsFormProps = {
	menuSettings: ArticleStateType;
	updateSettings: (updatedSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	menuSettings,
	updateSettings,
}: ArticleParamsFormProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(menuSettings);
	const formContainerRef = useRef<HTMLDivElement>(null);

	const submitSettings = (e: FormEvent) => {
		e.preventDefault();
		updateSettings(articleSettings);
		setOpenForm(false);
	};

	const resetSettings = () => {
		setArticleSettings(menuSettings);
		updateSettings(menuSettings);
		setOpenForm(false);
	};

	useOutsideClickClose({
		isOpen: openForm,
		rootRef: formContainerRef,
		onChange: setOpenForm,
	});

	const toggleForm = () => {
		setOpenForm(!openForm);
	};

	const handleSettingsChange = (settingType: keyof ArticleStateType) => {
		return (selected: OptionType) => {
			setArticleSettings((prevSettings) => ({
				...prevSettings,
				[settingType]: selected,
			}));
		};
	};

	// Функция для остановки всплытия события
	const stopPropagation = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpened={openForm} />
			<aside
				className={clsx(styles.container, openForm && styles.container_open)}
				ref={formContainerRef}
				onClick={stopPropagation}>
				<form
					className={styles.form}
					onSubmit={submitSettings}
					onReset={resetSettings}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleSettings.fontFamilyOption}
						onChange={handleSettingsChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={articleSettings.fontSizeOption}
						onChange={handleSettingsChange('fontSizeOption')}
						title='Размер шрифта'
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleSettings.fontColor}
						onChange={handleSettingsChange('fontColor')}
					/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleSettings.backgroundColor}
						onChange={handleSettingsChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleSettings.contentWidth}
						onChange={handleSettingsChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
