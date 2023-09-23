import s from '../styles/Home.module.css';
import {useEffect, useState} from 'react';
import Task from '../components/task/Task';
import Modal from "../components/modal/Modal";
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
import TaskForm from '../components/taskForm/TaskForm';
import Dropdown from '../components/dropdown/Dropdown';
import Button from "../components/button/Button";
import Delete from "../components/delete/Delete";

export default function Home() {

    const [tasksData, setTasksData] = useState([
        {id: 1, isDone: false, name: 'learn 1', date: '19.09.2023'},
        {id: 2, isDone: false, name: 'learn 2', date: '19.09.2023'},
        {id: 3, isDone: true, name: 'learn 3', date: '19.09.2023'},
    ]);

    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState('Today');
    const [tasks, setTasks] = useState(tasksData);
    const [action, setAction] = useState<{
        action: string,
        name?: string;
        id?: number;
    }>({
        action: 'Add task',
        name: undefined,
        id: undefined
    });

    const isActive = (name: string) => (filter === name);


    const openModal = (action: string, name?: string, id?: number) => {
        setAction({
            action: action,
            name: name,
            id: id
        });
        setIsVisible(true);
        console.log(action) //вид действия ------------------------------------------------------
    };

    const createTask = (name: string, id?: number) => {
        const date = new Date().toLocaleString().slice(0, 10);
        const taskList = [];

        const newTask = {
            id: tasksData.length + 1,
            isDone: false,
            name: name,
            date: date
        };

        taskList.push(...tasksData);
        taskList.push(newTask);
        setTasksData(taskList);
    };


    const updateTask = (newName: string, id?: number) => {
        const filteredTasks = tasksData.filter((task) => task.id == id);

        const {name, ...otherData} = filteredTasks[0];

        const changeTask = {
            name: newName,
            ...otherData
        };

        const newTasks = tasksData.filter((task) => task.id !== id);
        newTasks.push(changeTask);

        newTasks.sort(function (a, b) {
            return parseFloat(`${a.id}`) - parseFloat(`${b.id}`);
        });

        setTasksData(newTasks);
    }

    const deleteTask = (id?: number) => {
        const removeTask = tasksData.filter((task) => task.id !== id);
        setTasksData(removeTask);
    };

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


    useEffect(() => {
            let newTaskList: { id: number; isDone: boolean; name: string; date: string; }[] = [];
            const date = new Date().toLocaleString().slice(0, 10);

            switch (filter) {
                case 'Done':
                    newTaskList = tasksData.filter((task) => task.isDone);
                    break;
                case 'Undone':
                    newTaskList = tasksData.filter((task) => !task.isDone);
                    break;
                case 'All':
                    newTaskList = tasksData;
                    break;

                default:
                    newTaskList = tasksData.filter((task) => task.date == date);
            }

            setTasks(newTaskList);
        },
        [filter, tasksData]);

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
                            handleClick={openModal}
                        />
                    </div>
                </div>
                <div className={s.taskBoard}>
                    {tasks.map((obj, index) => (
                        <Task
                            handleClick={openModal}
                            changeIsDone={updateIsDone}
                            key={index}
                            id={obj.id}
                            isDone={obj.isDone}
                            name={obj.name}
                            date={obj.date}
                        />
                    ))}
                </div>
            </div>
            <Modal isVisible={isVisible} toggle={setIsVisible}>
                {action.action === 'Add task' &&
                    <TaskForm
                        id={action.id}
                        name={action.name}
                        handleSubmitForm={createTask}
                        toggle={setIsVisible}
                        formTitle={'Create task'}
                    />
                }
                {action.action === 'Update task' &&
                    <TaskForm
                        id={action.id}
                        name={action.name}
                        handleSubmitForm={updateTask}
                        toggle={setIsVisible}
                        formTitle={'Update task'}
                    />
                }
                {action.action === 'Delete task' &&
                    <Delete
                        id={action.id}
                        handleClick={deleteTask}
                        toggle={setIsVisible}
                        title={'Delete task'}
                    />}
            </Modal>
        </div>
    )
}
