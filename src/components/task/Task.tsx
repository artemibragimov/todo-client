import s from './Task.module.css';
import { CopleteIcon, SettingsIcon, NonCopleteIcon } from '../../assets';
import { useState } from 'react';
import { UpdateIcon, DeleteIcon } from '../../assets';

interface Task {
    isDone: boolean;
    name: string;
    date: string;
    id: number;
    changeIsDone: (id: number) => void
}

const Task = ({ isDone, name, date, id, changeIsDone }: Task) => {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div className={s.task_container}>
            <div className={s.task}>
                <button onClick={() => changeIsDone(id)}>
                    {isDone ? <CopleteIcon /> : <NonCopleteIcon />}
                </button>

                <div className={s.task_name}>
                    {name}
                </div>

                <div className={s.task_date}>
                    {date}
                </div>

                <button className={s.setting} onClick={()=>setIsHovering(true)} >
                    <SettingsIcon />
                </button>
            </div>

            {isHovering && <div className={s.setting_btns} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <button>
                    <UpdateIcon />
                </button>
                <button>
                    <DeleteIcon />
                </button>
            </div>
            }
        </div >
    )
}

export { Task }