import s from './Task.module.css';
import { CopleteIcon, SettingsIcon, NonCopleteIcon } from '../../assets';
import { useEffect, useState } from 'react';
import { UpdateIcon, DeleteIcon } from '../../assets';

interface Task {
    setTasks: (filterTask: Array<{ id: number, isDone: boolean, name: string, date: string }>) => void;
    filteredTask: Array<{ id: number, isDone: boolean, name: string, date: string }>
    setFilteredTask: (filterTask: Array<{ id: number, isDone: boolean, name: string, date: string }>) => void;
    isDone: boolean;
    name: string;
    date: string;
    id: number;
    changeIsDone: (id: number) => void
}

const Task = ({ setTasks, filteredTask, setFilteredTask, isDone, name, date, id, changeIsDone }: Task) => {

    const [isHovering, setIsHovering] = useState(false);

    const remove = () => {
        const removeTask = filteredTask.filter((task) => task.id !== id)
        setFilteredTask(removeTask)
        setTasks(removeTask)
    }

    useEffect(() => {
        setIsHovering(false)
    }, [filteredTask])

    return (
        <div className={s.task_container}  >
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

                <button className={s.setting} onClick={() => setIsHovering(true)}>
                    <SettingsIcon />
                </button>
            </div>
            {isHovering && <div className={s.setting_btns} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} >
                <button>
                    <UpdateIcon />
                </button>
                <button onClick={remove}>
                    <DeleteIcon />
                </button>
            </div>}
        </div >
    )
}

export { Task }