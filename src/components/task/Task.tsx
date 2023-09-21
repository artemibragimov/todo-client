import Image from 'next/image'
import s from './Task.module.css'

interface Task {
    activeFilter: string;
    setActiveFilter: (arg0: string) => void;
    name: string;
    ActiveIcon: React.FC<React.SVGProps<SVGAElement>>;
    Icon: React.FC<React.SVGProps<SVGAElement>>;
}

const Task = ({ isDone, name, date }) => (
    <div className={s.task}>
        <Image src='completed.svg' alt='Completed Icon' width={30} height={30} />
        <div className={s.task_name}>
            {name}
        </div>
        <div className={s.task_date}>
            {date}
            <Image src='settings.svg' alt='Settings Icon' width={30} height={20} />
        </div>
    </div>
)

export { Task }