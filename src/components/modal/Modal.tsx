import React, {ReactNode} from "react";
import s from './Modal.module.css';

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export default function Modal({toggle, isOpen, children}: ModalType) {

    const onclick = () => {
        toggle();
    };

    return (
        <>
            {isOpen && (
                <div className={s.modal_overlay} onClick={onclick}>
                    <div onClick={(e) => e.stopPropagation()} className={s.modal_box}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}