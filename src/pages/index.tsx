import s from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Task from '../components/task/Task';
import Modal from "../components/modal/Modal";
import {
    CalendarIcon,
    CalendarActiveIcon,
    DateIcon,
    DateActiveIcon,
    AddTaskIcon,
    DoneIcon,
    DoneActiveIcon,
    FirstNewIcon,
    FirstOldIcon
} from '../assets';
import ToggleButton from '../components/toggleButton/ToggleButton';
import TaskForm from '../components/taskForm/TaskForm';
import Dropdown from '../components/dropdown/Dropdown';
import Button from "../components/button/Button";
import Delete from "../components/delete/Delete";
import Pagination from "../components/pagination/Pagination";

export default function Home() {

    const [tasksData, setTasksData] = useState([
        { id: 0, isDone: true, name: 'learn 1', date: '19.09.2023' },
        { id: 1, isDone: false, name: 'learn 2', date: '20.09.2023' },
        { id: 2, isDone: false, name: 'learn 3', date: '21.09.2023' },
        /*{ id: 3, isDone: true, name: 'learn 4', date: '19.09.2023' },
        { id: 4, isDone: false, name: 'learn 5', date: '19.09.2023' },
        { id: 5, isDone: false, name: 'learn 6', date: '19.09.2023' },
        { id: 6, isDone: true, name: 'learn 7', date: '19.09.2023' },
        { id: 7, isDone: false, name: 'learn 8', date: '19.09.2023' },
        { id: 8, isDone: false, name: 'learn 9', date: '19.09.2023' },
        { id: 9, isDone: true, name: 'learn 10', date: '19.09.2023' },
        { id: 10, isDone: false, name: 'learn 11', date: '19.09.2023' },
        { id: 11, isDone: false, name: 'learn 12', date: '19.09.2023' },
        { id: 12, isDone: true, name: 'learn 13', date: '19.09.2023' },
        { id: 13, isDone: true, name: 'learn 1', date: '19.09.2023' },
        { id: 14, isDone: false, name: 'learn 2', date: '19.09.2023' },
        { id: 15, isDone: false, name: 'learn 3', date: '19.09.2023' },
        { id: 16, isDone: true, name: 'learn 4', date: '19.09.2023' },
        { id: 17, isDone: false, name: 'learn 5', date: '19.09.2023' },
        { id: 18, isDone: false, name: 'learn 6', date: '19.09.2023' },
        { id: 19, isDone: true, name: 'learn 7', date: '19.09.2023' },
        { id: 20, isDone: false, name: 'learn 8', date: '19.09.2023' },
        { id: 21, isDone: false, name: 'learn 9', date: '19.09.2023' },*/
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
    const [currentPage, setCurrentPage] = useState(2);

    const isActive = (name: string) => (filter === name);
    const isDate = () => (filter === 'firstNew' || filter === 'firstOld')

    const setDateFilter = () => {
        switch (filter) {
            case 'firstOld':
                setFilter('firstNew')
                break
            case 'firstNew':
                setFilter('firstOld')
                break
            default:
                setFilter('firstNew')
        }
    }

    const openModal = (action: string, name?: string, id?: number) => {
        setAction({
            action: action,
            name: name,
            id: id
        });
        setIsVisible(true);
    };

    const createTask = (name: string) => {
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

        const { name, ...otherData } = filteredTasks[0];

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
    };

    const deleteTask = (id?: number) => {
        const removeTask = tasksData.filter((task) => task.id !== id);
        setTasksData(removeTask);
    };

    const updateIsDone = (id: number) => {
        const filteredTasks = tasksData.filter((task) => task.id == id);

        const { isDone, ...otherData } = filteredTasks[0];

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

    //for pagination
    const pageSize = 7;
    const taskPortion = tasks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

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
            case 'firstNew':
                newTaskList = tasksData.sort(function (a, b) {
                    return parseFloat(a.date) - parseFloat(b.date);
                });
                break;
            case 'firstOld':
                newTaskList = tasksData.sort(function (a, b) {
                    return parseFloat(b.date) - parseFloat(a.date);
                });
                break;

            default:
                newTaskList = tasksData.filter((task) => task.date == date);
        }

        setTasks(newTaskList);
        setCurrentPage(1)
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
                            ActiveIcon={filter === 'firstNew' ? FirstNewIcon : FirstOldIcon}
                            handleClick={setDateFilter}
                            isActive={isDate}
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

                    <Pagination
                        pageSize={pageSize}
                        totalTask={tasks.length}
                        currentPage={currentPage}
                        handleClick={setCurrentPage}
                    />

                    {taskPortion.map((obj, index) => (
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
    );
}
