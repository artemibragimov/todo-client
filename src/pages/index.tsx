import s from '../styles/Home.module.css';
import {useState} from 'react';
import Task from '../components/task/Task';
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";
import {CalendarIcon, CalendarActiveIcon, DateIcon, DateActiveIcon, AddTaskIcon} from '../assets';
import ToggleButton from '../components/toggleButton/ToggleButton';
import CreateTaskForm from '../components/createTaskForm/CreateTaskForm';
import Dropdown from '../components/dropdown/Dropdown';
import Button from "../components/button/Button";

export default function Home() {

    const {isOpen, toggle} = useModal();
    const [filter, setFilter] = useState('Today');
    const [tasks, setTasks] = useState([
        {id: 1, isDone: false, name: 'learn 1', date: '19.09.2023'},
        {id: 2, isDone: false, name: 'learn 2', date: '19.09.2023'},
        {id: 3, isDone: true, name: 'learn 3', date: '19.09.2023'},
    ]);
    const [filteredTask, setFilteredTask] = useState(tasks);
    const isActive = (name: string) => (filter === name);
    const changeIsDone = (id: number) => {
        const filteredTasks = tasks.filter((task) => task.id == id);

        const {isDone, ...otherData} = filteredTasks[0];

        const changeTask = {
            isDone: !isDone,
            ...otherData
        };

        const newTasks = tasks.filter((task) => task.id !== id);
        newTasks.push(changeTask);

        newTasks.sort(function (a, b) {
            return parseFloat(`${a.id}`) - parseFloat(`${b.id}`);
        });
        setTasks(newTasks);
        setFilteredTask(newTasks);
    };
    const deleteTask = (id: number) => {
        const removeTask = filteredTask.filter((task) => task.id !== id);
        setFilteredTask(removeTask);
        setTasks(removeTask);
    };

    return (
        <div>
            <div className={s.taskContainer}>
                <div className={s.taskSettings}>
                    <div className={s.topBar}>
                        <ToggleButton
                            name='Today'
                            Icon={CalendarIcon}
                            ActiveIcon={CalendarActiveIcon}
                            handleClick={setFilter}
                            isActive={isActive}
                        />
                        <Dropdown
                            tasks={tasks}
                            setFilteredTask={setFilteredTask}
                            activeFilter={filter}
                            setActiveFilter={setFilter}/>
                        <ToggleButton
                            name='Date'
                            Icon={DateIcon}
                            ActiveIcon={DateActiveIcon}
                            handleClick={setFilter}
                            isActive={isActive}
                        />
                    </div>
                    <div className={s.bottomBar}>
                        <Button
                            name='Add task'
                            Icon={AddTaskIcon}
                            handleClick={toggle}/>
                    </div>
                </div>
                <div className={s.taskBoard}>
                    {filteredTask.map((obj, index) => (
                        <Task
                            filteredTask={filteredTask}
                            deleteTask={deleteTask}
                            changeIsDone={changeIsDone}
                            key={index}
                            id={obj.id}
                            isDone={obj.isDone}
                            name={obj.name}
                            date={obj.date}/>
                    ))}
                </div>
            </div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <>
                    <span>Crate task</span>
                    <CreateTaskForm
                        filteredTask={filteredTask}
                        toggle={toggle}
                    />
                </>
            </Modal>
        </div>
    );
}
