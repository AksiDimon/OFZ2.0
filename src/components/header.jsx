import s from './list.module.css'
import { useState, useRef, useLayoutEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'


export function Header() {
    const refEl = useRef(null);
    const [positionHeader, setPositionHeader] = useState(0);
    // const [isOpenLink, setIsOpenLink] = useState({
    //     ofz: false,
    //     corporates: false,
    // })
    useLayoutEffect(() => {
        if (refEl.current) {
            const rect = refEl.current.getBoundingClientRect();

            //   Object.assign(refEl.current.style, {
            //     position: 'fixed',
            //     bottom: `${positionHeader}%`
            //   })

        }


    }, [positionHeader])
    console.log(refEl, '🙈', refEl.current)
    function hendleClick() {
        const rect = refEl.current.getBoundingClientRect();
        setPositionHeader(rect.height * Math.random());
        console.log(rect.height * Math.random(), '😴')
    }


    // NavLink

    return (
        <>
        <div>
            <Link
        to = {'/'}
        style={{  textDecoration: 'none'}}
        className={s.toMainPage}
        >
        To main
        </Link>
        </div>
        
        <div className={s.barContainer} ref={refEl}>

            <Link
                to={'/bonds/ofz'}
                style={{ flex: '1', textDecoration: 'none' }}
            >
                <div className={s.headName} > ОФЗ </div>
            </Link>
            <NavLink
                to={'/bonds/corporates'}
                style={{ flex: '1', textDecoration: 'none' }}
            >
                <div className={s.headName} > Корпоративные </div>
            </NavLink>
            <NavLink
                to={'/bonds/replays'}
                style={{ flex: '1', textDecoration: 'none' }}
            >
                <div className={s.headName}> Замещающие </div>
            </NavLink>
            {/* <button onClick={hendleClick} > Move Header</button> */}
        </div>
        </>

    )
}