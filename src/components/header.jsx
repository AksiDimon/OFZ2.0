import s from './list.module.css'
import {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'

export function Header () {
    const [isOpenLink, setIsOpenLink] = useState({
        ofz: false,
        corporates: false,
    })


    // NavLink

    return (
        <div className={s.barContainer}>
            
                <Link 
                to = {'/bonds/ofz'} 
                style={{flex: '1', textDecoration: 'none'}}
                >
                <div className={s.headName} > ОФЗ </div>
                </Link>
                <NavLink 
                to = {'/bonds/corporates'} 
                style={{flex: '1', textDecoration: 'none'}}
                >
                <div className={s.headName} > Корпоративные </div>
                </NavLink>
                <NavLink
                to = {'/bonds/replays'}
                style={{flex: '1', textDecoration: 'none'}}
                >
                    <div className={s.headName}> Замещающие </div>
                </NavLink>

        </div>
    )
}