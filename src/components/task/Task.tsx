import s from './Task.module.css';
import { CopleteIcon, SettingsIcon, NonCopleteIcon } from '../../assets';

interface Task {
    isDone: boolean;
    name: string;
    date: string;
    id: number;
    changeIsDone: (id: number) => void
}

const Task = ({ isDone, name, date, id, changeIsDone }: Task) => {
    return(
    <div className={s.task}>

        <button onClick={() => changeIsDone(id)}>
            {isDone ? <CopleteIcon /> : <NonCopleteIcon />}
        </button>

        <div className={s.task_name}>
            {name}
        </div>
        <div className={s.task_date}>
            {date}
            <SettingsIcon />
        </div>
    </div>
)}

export { Task }