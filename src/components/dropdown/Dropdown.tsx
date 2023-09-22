import { useEffect, useState } from "react";
import s from './Dropdown.module.css'
import { DoneIcon, DoneActiveIcon } from '../../assets';


interface Dropdown {
    activeFilter: string;
    setActiveFilter: (arg0: string) => void;
    tasks: Array<{ id: number, isDone: boolean, name: string, date: string }>;
    setFilteredTask: (filterTask: Array<{ id: number, isDone: boolean, name: string, date: string }>) => void;
}

const Dropdown = ({ activeFilter, setActiveFilter, tasks, setFilteredTask }: Dropdown) => {

    const [selected, setSelected] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean | null>(null);

    const options = ["All", "Done", "Undone"]

    let activ = activeFilter === selected ? true : false

    const handleItemClick = (name: string) => {

        if (name == 'Done') {
            tasks = tasks.filter((task) => task.isDone)
        } else if (name == 'Undone') {
            tasks = tasks.filter((task) => !task.isDone)
        }
        setFilteredTask(tasks)
        setSelected(name);
        setActiveFilter(name);
        setDropdown(!dropdown);
    };

    const handleMouseOver = () => {
        setDropdown(true);
    };

    const handleMouseOut = () => {
        setDropdown(false);
    };


    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
            <button type="button"    className={s.btn + ' ' + `${activ ? s.btn_active : s.btn_nonActive}`}>
                {activ ? <DoneActiveIcon /> : <DoneIcon />}
                {selected == '' ? 'All' : selected}
            </button>

            {dropdown &&
                <ul className={s.list} >

                    {options.map((obj: string, i: number) => (
                        <li key={i} className={s.btn + ' ' + s.item + ' ' + `${activeFilter === obj ? s.btn_active : s.btn_nonActive}`}
                            onClick={() => handleItemClick(obj)}
                        >
                            {activeFilter === obj ? <DoneActiveIcon /> : <DoneIcon />}
                            {obj}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default Dropdown;