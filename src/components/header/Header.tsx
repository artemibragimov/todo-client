import Link from 'next/link';
import s from './Header.module.css';
import {ProfileIcon} from '../../assets';

const Header = () => (
    <header className={s.header}>
        <Link href='/' className={s.logo}>To-Do</Link>
        <div className={s.userName}>UserName</div>
        <Link href='/profile'>
            <ProfileIcon width={30}/>
        </Link>
    </header>
);

export {Header};