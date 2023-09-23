import s from '../styles/Home.module.css';
import {useEffect, useState} from 'react';
import Task from '../components/task/Task';
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";
import {
    CalendarIcon,
    CalendarActiveIcon,
    DateIcon,
    DateActiveIcon,
    AddTaskIcon,
    DoneIcon,
    DoneActiveIcon
} from '../assets';
import ToggleButton from '../components/toggleButton/ToggleButton';
import CreateTaskForm from '../components/createTaskForm/CreateTaskForm';
import Dropdown from '../components/dropdown/Dropdown';
import Button from "../components/button/Button";

export default function Home() {

    const {isOpen, toggle} = useModal();
    const [filter, setFilter] = useState('Today');
    const [tasksData, setTasksData] = useState([
        {id: 1, isDone: false, name: 'learn 1', date: '19.09.2023'},
        {id: 2, isDone: false, name: 'learn 2', date: '19.09.2023'},
        {id: 3, isDone: true, name: 'learn 3', date: '19.09.2023'},
    ]);
    const [tasks, setTasks] = useState(tasksData);
    const isActive = (name: string) => (filter === name);

    const createTask = (name: string) => {
        const date = new Date().toLocaleString().slice(0, 10);

        const newTask = {
            id: tasksData.length + 1,
            isDone: false,
            name: name,
            date: date
        };
        tasksData.push(newTask)
        /*
        let newTasksData = {...tasksData}

        newTasksData.push(newTask)
        setTasksData(newTasksData);
*/
    }
    const updateIsDone = (id: number) => {
        const filteredTasks = tasksData.filter((task) => task.id == id);

        const {isDone, ...otherData} = filteredTasks[0];

        const changeTask = {
            isDone: !isDone,
            ...otherData
        };

        const newTasks = tasksData.filter((task) => task.id !== id);
        newTasks.push(changeTask);

        newTasks.sort(function (a, b) {
            return parseFloat(`${a.id}`) - parseFloat(`${b.id}`);
        });
        setTasksData(newTasks);
    };
    const deleteTask = (id: number) => {
        const removeTask = tasksData.filter((task) => task.id !== id);
        setTasks(removeTask);
        setTasksData(removeTask);
    };

    useEffect(() => {
            let newTaskList: { id: number; isDone: boolean; name: string; date: string; }[] = []

            switch (filter) {
                case 'Done':
                    newTaskList = tasksData.filter((task) => task.isDone);
                    break
                case 'Undone':
                    newTaskList = tasksData.filter((task) => !task.isDone);
                    break;
                case 'All':
                    newTaskList = tasksData;
                    break;

                default:
                    const date = new Date().toLocaleString().slice(0, 10);
                    newTaskList = tasksData.filter((task) => task.date == date);
            }

            setTasks(newTaskList);
        },
        [filter, tasksData])

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
                            options={["All", "Done", "Undone"]}
                            handleClick={setFilter}
                            isActive={isActive}
                            Icon={DoneIcon}
                            ActiveIcon={DoneActiveIcon}
                        />
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
                    {tasks.map((obj, index) => (
                        <Task
                            filteredTask={tasksData}
                            deleteTask={deleteTask}
                            changeIsDone={updateIsDone}
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
                        createTask={createTask}
                        toggle={toggle}
                    />
                </>
            </Modal>
        </div>
    );
}
