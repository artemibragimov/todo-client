import {FC, SVGProps, useRef, useState} from "react";
import s from './Dropdown.module.css';
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface Dropdown {
    options: string[];
    Icon: FC<SVGProps<SVGAElement>>;
    ActiveIcon: FC<SVGProps<SVGAElement>>;
    handleClick: (name: string) => void;
    isActive: (name: string) => boolean;
}

const Dropdown = ({options, Icon, ActiveIcon, handleClick, isActive}: Dropdown) => {

    const [selected, setSelected] = useState<string>('All');

    const [dropdown, setDropdown] = useState<boolean>(false);
    const divRef = useRef<HTMLUListElement>(null);
    useOnClickOutside(divRef, () => setDropdown(false));

    const isActivated = isActive(selected);

    const handleItemClick = (name: string) => {
        handleClick(name);
        setSelected(name);
        setDropdown(false);
    };

    return (
        <div>
            <button onClick={() => setDropdown(true)} type="button"
                    className={s.btn + ' ' + `${isActivated ? s.btn_active : s.btn_nonActive}`}>
                {isActivated ? <ActiveIcon/> : <Icon/>}
                {selected}
            </button>

            {dropdown &&
                <ul ref={divRef} className={s.list}>
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