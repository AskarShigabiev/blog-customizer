// import { useEffect } from 'react';

// type UseOutsideClickClose = {
// 	isOpen: boolean;
// 	onChange: (newValue: boolean) => void;
// 	onClose?: () => void;
// 	rootRef: React.RefObject<HTMLDivElement>;
// };

// export const useOutsideClickClose = ({
// 	isOpen,
// 	rootRef,
// 	onClose,
// 	onChange,
// }: UseOutsideClickClose) => {
// 	useEffect(() => {
// 		const handleClick = (event: MouseEvent) => {
// 			const { target } = event;
// 			if (target instanceof Node && !rootRef.current?.contains(target)) {
// 				isOpen && onClose?.();
// 				onChange?.(false);
// 			}
// 		};

// 		window.addEventListener('click', handleClick);

// 		return () => {
// 			window.removeEventListener('click', handleClick);
// 		};
// 	}, [onClose, onChange, isOpen]);
// };

import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && rootRef.current?.contains(target)) {
				// Если клик был внутри rootRef, то ничего не делаем
				return;
			}
			// Если клик был снаружи rootRef, то закрываем
			if (isOpen) {
				onClose?.();
				onChange(false);
			}
		};

		window.addEventListener('click', handleClick, true);

		return () => {
			window.removeEventListener('click', handleClick, true);
		};
	}, [isOpen, onClose, onChange, rootRef]);
};
