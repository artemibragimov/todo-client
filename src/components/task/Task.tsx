import s from './Task.module.css';
import {CompleteIcon, SettingsIcon, NonCompleteIcon} from '../../assets';
import {useRef, useState} from 'react';
import {UpdateIcon, DeleteIcon} from '../../assets';
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface Task {
    id: number;
    isDone: boolean;
    name: string;
    date: string;
    changeIsDone: (id: number) => void;
    handleClick: (action: string, newName: string, id: number) => void;
}

const Task = ({id, isDone, name, date, changeIsDone, handleClick}: Task) => {

    const [isHovering, setIsHovering] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setIsHovering(false));

    return (
        <div className={s.task_container}>
            <div className={s.task}>
                <button onClick={() => changeIsDone(id)}>
                    {isDone ? <CompleteIcon/> : <NonCompleteIcon/>}
                </button>

                <div className={s.task_name}>
                    {name}
                </div>

                <div className={s.task_date}>
                    {date}
                </div>

                <button className={s.setting} onClick={() => setIsHovering(true)}>
                    <SettingsIcon/>
                </button>
            </div>
            {isHovering ?
                <div ref={ref} className={s.setting_btns} onMouseOver={() => setIsHovering(true)}
                     onMouseOut={() => setIsHovering(false)}>
                    <button onClick={() => handleClick('Update task', name, id)}>
                        <UpdateIcon/>
                    </button>
                    <button onClick={() => handleClick('Delete task', name, id)}>
                        <DeleteIcon/>
                    </button>
                </div>
                : null}
        </div>
    );
};

export default Task;