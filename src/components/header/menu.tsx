import { Link } from "react-router-dom"
import  SteamLogo from './../../assets/SteamLogo.svg'
import Authorization from "../Action/authorization"
import { useState } from "react"
import { MOCK_MENU } from "./MOCK"

const Menu = () =>{
    const [activeStyle, setActiveStyle] = useState('STORE')

    return(
        <header className="h-[105px] bg-darkblue">
            <div className="max-w-[940px] h-full mx-auto flex">
                <Link to="/" className="text-header mr-[40px]"><img src={SteamLogo} className="w-[176px] h-[74px] pt-[30px] mr-[40px]"/></Link>
                <div className="w-full flex justify-between">
                    <ul className=" flex pt-[45px]">
                        {
                            MOCK_MENU.map((item, index) => (
                                <li className="group pl-[7px] pr-[7px] pb-[7px]" key={index} onClick={() => setActiveStyle(item.name)}>
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