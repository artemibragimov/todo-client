import { useState } from "react";
import s from './Dropdown.module.css'
import { DoneIcon, DoneActiveIcon } from '../../assets';


interface Dropdown {
    activeFilter: string;
    setActiveFilter: (arg0: string) => void;
}

const Dropdown = ({ activeFilter, setActiveFilter }: Dropdown) => {

    const [selected, setSelected] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean | null>(null);

    const options = ["All", "Done", "Undone"]

    let activ = activeFilter === selected ? true : false

    const handleClick = () => {
        setDropdown(!dropdown);
    };

    const handleItemClick = (name: string) => {
        setSelected(name);
        setActiveFilter(name);
        setDropdown(!dropdown);
    };

    return (
        <div>
            <button type="button" onClick={() => handleClick()} className={s.btn + ' ' + `${activ ? s.btn_active : s.btn_nonActive}`}>
                {activ ? <DoneActiveIcon /> : <DoneIcon />}
                {selected == '' ? 'All' : selected}
            </button>

            {dropdown && (
                <ul className={s.list}>

                    {options.map((obj: string, i: number) => (
                        <li key={i} className={s.btn + ' ' + s.item + ' ' + `${selected == obj ? s.btn_active : s.btn_nonActive}`}
                            onClick={() => handleItemClick(obj)}
                        >
                            {selected == obj ? <DoneActiveIcon /> : <DoneIcon />}
                            {obj}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};



export default Dropdown;