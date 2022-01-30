import React, { useEffect, useRef } from 'react'
import  './header.scss'
import { AiFillHome } from 'react-icons/ai'
import { MdMovie } from 'react-icons/md'
import { IoTvSharp } from 'react-icons/io5'

import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/FilmLogo.png'

const headerNav = [
    {
        display: <AiFillHome />,
        path: '/',
    },
    {
        display: <MdMovie />,
        path: '/movie',
    },
    {
        display: <IoTvSharp />,
        path: '/tv',
    },
]

const Header = () => {

    const { pathName } = useLocation()
    const headerRef = useRef(null)

    const active = headerNav.findIndex(e => e.path === pathName)
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scroll > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink')
            }  else {
                headerRef.current.classList.remove('shrink')

            }
        }
        window.addEventListener('scroll', shrinkHeader)
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])

    return (
        <div ref={headerRef} className='header'>
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" className='img-logo' />
                    <Link to="/" style={{marginLeft: 5}}>Filmster</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => {
                            return (
                                <li key={i} className={`${i === active ? 'active' : 'nav-icon'}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                        {/* <AiFillHome /> */}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header
