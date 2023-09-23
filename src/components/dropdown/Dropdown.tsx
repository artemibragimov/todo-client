import {FC, SVGProps, useState} from "react";
import s from './Dropdown.module.css';


interface Dropdown {
    options: string[];
    Icon: FC<SVGProps<SVGAElement>>;
    ActiveIcon: FC<SVGProps<SVGAElement>>;
    handleClick: (arg0: string) => void;
    isActive: (name: string) => boolean;
}

const Dropdown = ({options, Icon, ActiveIcon, handleClick, isActive}: Dropdown) => {

    const [selected, setSelected] = useState<string>('All');
    const [dropdown, setDropdown] = useState<boolean | null>(null);

    const isActivated = isActive(selected);

    const handleItemClick = (name: string) => {
        handleClick(name);
        setSelected(name);
        setDropdown(!dropdown);
    };

    const handleMouseOver = () => {
        setDropdown(true);
    };

    const handleMouseOut = () => {
        setDropdown(false);
    };

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <button type="button" className={s.btn + ' ' + `${isActivated ? s.btn_active : s.btn_nonActive}`}>
                {isActivated ? <ActiveIcon/> : <Icon/>}
                {selected}
            </button>

            {dropdown &&
                <ul className={s.list}>
                    {options.map((option: string, i: number) => (
                        <li key={i}
                            className={s.btn + ' ' + s.item + ' ' + `${isActive(option) ? s.btn_active : s.btn_nonActive}`}
                            onClick={() => handleItemClick(option)}
                        >
                            {isActive(option) ? <ActiveIcon/> : <Icon/>}
                            {option}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default Dropdown;