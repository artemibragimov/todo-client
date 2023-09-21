import s from './HomePageButton.module.css'

interface HomePageButtonType {
    activeFilter: string;
    setActiveFilter: (arg0: string) => void;
    name: string;
    ActiveIcon: React.FC<React.SVGProps<SVGAElement>>;
    Icon: React.FC<React.SVGProps<SVGAElement>>;
}

const HomePageButton = ({ activeFilter, setActiveFilter, name, ActiveIcon, Icon }: HomePageButtonType) => {
    const className = activeFilter === name ? s.btn_active : s.btn_nonActive
    const onClick = () => {
        name === 'Add task' ? null : setActiveFilter(name)
    }
    return (
        <button onClick={onClick} className={s.btn + ' ' + className+' '+`${name === 'Add task' && s.addTask}`} role="button" >
            {activeFilter === `${name}` ? <ActiveIcon /> : <Icon />}
            {name}
        </button >
    )
}

export { HomePageButton }