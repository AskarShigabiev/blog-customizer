import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick?: OnClick;
	isOpened?: boolean;
};

export const ArrowButton = ({ onClick, isOpened }: ArrowButtonProps) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClick?.();
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpened })}
			onClick={handleClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpened })}
			/>
		</div>
	);
};
