'use client';

import s from './home.module.css';
import { Task } from '../components/task/Task';
import { useState } from 'react';
import Modal from "../components/modal/Modal";
import useModal from "../hooks/useModal";
import { CelendarIcon, CelendarActiveIcon, DoneIcon, DoneActiveIcon, DateIcon, DateActiveIcon, AddIcon, AddActiveIcon } from '../assets';
import { HomePageButton } from '../components/homePageButton/HomePageButton';
import { CreateTaskForm } from '../components/createTaskForm/CreateTaskForm';
import Dropdown from '../components/dropdown/Dropdown';

export default function Home() {

  const { isOpen, toggle } = useModal();
  const [activeFilter, setActiveFilter] = useState('Today');
  const [tasks, setTasks] = useState([
    { id: 1, isDone: false, name: 'learn 1', date: '19.09.2023' },
    { id: 2, isDone: false, name: 'learn 2', date: '19.09.2023' },
    { id: 3, isDone: true, name: 'learn 3', date: '19.09.2023' },
  ]);

  const [filteredTask, setFilteredTask] = useState(tasks)

  const changeIsDone = (id: Number) => {
    const filteredTasks = tasks.filter((task) => task.id == id)

    const { isDone, ...otherData } = filteredTasks[0]

    const changeTask = {
      isDone: !isDone,
      ...otherData
    }

    const newTasks = tasks.filter((task) => task.id !== id)
    newTasks.push(changeTask)

    newTasks.sort(function (a, b) {
      return parseFloat(`${a.id}`) - parseFloat(`${b.id}`);
    });
    setTasks(newTasks)
    setFilteredTask(newTasks)
  }

  return (
    <div>
      <div className={s.taskContainer}>
        <div className={s.taskSettings}>
          <div className={s.topBar}>

            <HomePageButton
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              name='Today'
              ActiveIcon={CelendarActiveIcon}
              Icon={CelendarIcon}
            />

            <Dropdown
              tasks={tasks}
              setFilteredTask={setFilteredTask}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            <HomePageButton
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              name='Date'
              ActiveIcon={DateActiveIcon}
              Icon={DateIcon}
            />
          </div>

          <div className={s.bottomBar} onClick={() => toggle()}>
            <HomePageButton
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              name='Add task'
              ActiveIcon={AddActiveIcon}
              Icon={AddActiveIcon}
            />
          </div>
        </div>

        <div className={s.taskBoard}>
          {filteredTask.map((obj, index) => (
            <Task
            setTasks={setTasks}
              filteredTask={filteredTask}
              setFilteredTask={setFilteredTask}
              changeIsDone={changeIsDone}
              key={index}
              id={obj.id}
              isDone={obj.isDone}
              name={obj.name}
              date={obj.date} />
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} toggle={toggle} setActive={() => setActiveFilter('')}>
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
