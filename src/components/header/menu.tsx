import { Link } from "react-router-dom"
import  SteamLogo from './../../assets/SteamLogo.svg'
import Authorization from "../Action/authorization"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"
import '../../index.css'

type MenuItem = {
    name: string;
    link: string;
    dropDown?: MenuItem[];
};

const Menu = () =>{
    const [activeStyle, setActiveStyle] = useState('STORE')
    const { data: user} = useLogin();

    const MENU: MenuItem[] = [
        {
            name: 'STORE',
            link: '/',
            dropDown: [
                {
                    name: 'Home',
                    link: '/'
                },
                {
                    name: 'Wishlist',
                    link: '/'
                },
            ]
        },
        {
            name: user ? user.displayName.toUpperCase() : 'PROFILE',
            link: user ? '/' : 'http://localhost:5009/auth/steam',
            dropDown: user  && [
               { 
                    name:'Activity',
                    link: '/'
                },
                {
                    name: 'Profile',
                    link: '/profile'
                } ,
                {
                    name:'Friends',
                    link: '/'
                },
                {
                    name:'Games',
                    link: '/'
                },
            ],
        },
  
        
    ]

    return(
        <header className="h-[105px] bg-darkblue">
            <div className="w-[953px] h-full mx-auto flex">
                <Link to="/" className="text-header mr-[40px]"><img src={SteamLogo} className="w-[186px] h-[74px] pt-[30px] mr-[40px]"/></Link>
                <div className="w-full flex justify-between">
                    <ul className=" flex pt-[41px] ml-[-16px]">
                        {
                            MENU.map((item, index) => (
                                <li className="group px-[7px] pb-[7px]" key={index} onClick={() => setActiveStyle(item.name)}>
                                    <Link 
                                        to={item.link} 
                                        className={activeStyle === item.name? 'active-menu' : 'text-header'}
                                    >{item.name}</Link> 
                                    {item.dropDown  &&(
                                        <ul className="absolute hidden mt-[3px] ml-[-10px] w-[136px] group-hover:block">
                                            {item.dropDown.map((item, index) =>(
                                                <li key={index}>
                                                    <Link to={item.link} className="dropdown-menu">{item.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))
                        }
                        </ul>
                    <Authorization />
                </div>
            </div>
    </header>
    )
}

export default Menu