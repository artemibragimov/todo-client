import s from './Task.module.css';
import {CompleteIcon, SettingsIcon, NonCompleteIcon} from '../../assets';
import {useEffect, useState} from 'react';
import {UpdateIcon, DeleteIcon} from '../../assets';
import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import CreateTaskForm from '../createTaskForm/CreateTaskForm';

interface Task {
    filteredTask: Array<{ id: number, isDone: boolean, name: string, date: string }>;
    isDone: boolean;
    name: string;
    date: string;
    id: number;
    changeIsDone: (id: number) => void;
    deleteTask: (id: number) => void;
}

const Task = ({deleteTask, filteredTask, isDone, name, date, id, changeIsDone}: Task) => {

    const [isHovering, setIsHovering] = useState(false);
    const {isOpen, toggle} = useModal();

    useEffect(() => {
        setIsHovering(false);
    }, [filteredTask]);

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
            {isHovering && <div className={s.setting_btns} onMouseOver={() => setIsHovering(true)}
                                onMouseOut={() => setIsHovering(false)}>
                <button onClick={toggle}>
                    <UpdateIcon/>
                </button>
                <button onClick={() => deleteTask(id)}>
                    <DeleteIcon/>
                </button>
            </div>}

            <Modal isOpen={isOpen} toggle={toggle}>
                <>
                    <span>Update task</span>
                    <CreateTaskForm
                        filteredTask={filteredTask}
                        toggle={toggle}
                    />
                </>
            </Modal>
        </div>
    );
};

export default Task;