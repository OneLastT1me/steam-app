import { Link } from "react-router-dom"
import  SteamLogo from './../../assets/SteamLogo.svg'
import Authorizathion from "../Action/authorization"

const Menu = () =>{
    return(
        <header className="h-[105px] bg-header">
            <div className="max-w-[940px] h-full mx-auto flex">
                <img src={SteamLogo} className="w-[174px] h-[44px]  mt-[30px] mr-[40px]"/>
                <ul className="flex space-x-4 pt-[45px]" >
                    <li className="relative group">
                        <div>
                            <Link to="/" className="text-header">STORE</Link>
                            <ul className=" absolute hidden mt-2 w-[124px] group-hover:block">
                                <li className="">
                                    <Link to="/" className="dropdown-menu">Home</Link>
                                </li>
                                <li className="">
                                    <Link to="/" className="dropdown-menu">Wishlist</Link>
                                </li>
                                <li className=" ">
                                    <Link to="/" className="dropdown-menu">Points shop</Link>
                                </li>
                                <li className=" ">
                                    <Link to="/" className="dropdown-menu">News</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/" className="text-header">COMMUNITY</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-header">ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-header">SUPPORT</Link>
                    </li>
                </ul>
            <Authorizathion />
            </div>
    </header>
    )
}

export default Menu