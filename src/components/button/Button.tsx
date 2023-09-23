import s from './Button.module.css';
import {FC, SVGProps} from "react";

interface ButtonType {
    name: string;
    Icon: FC<SVGProps<SVGAElement>>;
    handleClick: () => void;
}

const Button = ({name, Icon, handleClick}: ButtonType) => {
    return (
        <button onClick={handleClick} className={s.btn}>
            <Icon/>
            {name}
        </button>
    );
};

export default Button;