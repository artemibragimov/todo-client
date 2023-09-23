import React, {ReactNode, useRef} from "react";
import s from './Modal.module.css';
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface ModalType {
    children?: ReactNode;
    isVisible: boolean;
    toggle: (boolean: boolean) => void;
}

const Modal = ({children, isVisible, toggle,}: ModalType) => {

    const divRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(divRef, () => toggle(false));

    return (
        <>
            {isVisible && (
                <div className={s.modal_overlay}>
                    <div ref={divRef} className={s.modal_box}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;