import s from './ToggleButton.module.css';
import {FC, SVGProps} from "react";

interface ToggleButtonType {
    name: string;
    Icon: FC<SVGProps<SVGAElement>>;
    ActiveIcon: FC<SVGProps<SVGAElement>>;
    handleClick: (name: string) => void;
    isActive: (name: string) => boolean;
}

const ToggleButton = ({name, Icon, ActiveIcon, handleClick, isActive}: ToggleButtonType) => {
    const isActivated = isActive(name);
    return (
        <button
            onClick={() => handleClick(name)}
            className={s.btn + ' ' + `${isActivated ? s.btn_active : s.btn_nonActive}`}
        >
            {isActivated ? <ActiveIcon/> : <Icon/>}
            {name}
        </button>
    );
};
export default ToggleButton;