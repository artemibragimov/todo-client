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
    return (
        <button onClick={() => setActiveFilter(name)} className={s.btn + ' ' + className} role="button" >
            {activeFilter === `${name}` ? <ActiveIcon /> : <Icon />}
            {name}
        </button >
    )
}

export { HomePageButton }