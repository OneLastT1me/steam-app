import { url, lastTimeAtGame } from "../../constants";
import { useAllGames } from "../../hooks/useAllGames";
import { useProfile } from "../../hooks/useProfile";
import Cardprofile from "./cardprofile";
import { Link } from "react-router-dom";

export default function Profile () {
    const steamid = localStorage.getItem('steamid')
    const { data: user } = useProfile(steamid!)
    const  { data: games} = useAllGames(steamid!)


    const totalTimeToWeek = games?.games.reduce((totalTime, game) => {
        return (totalTime + (game.playtime_2weeks || 0) / 60) ;
    }, 0)

    //sort first for last week second for last session
    const lastGames = games?.games.sort(
        (a , b) => b.playtime_2weeks -a.playtime_2weeks ).sort(
            (a , b) => Number(new Date(b.rtime_last_played)) - Number(new Date(a.rtime_last_played))).slice(0, 3)

    // rewrok on error.page
    if(!user){
        return null
    }

  
    return(
        <div>
           <Cardprofile 
                avatar={user.avatarfull} 
                personaname={user.personaname} 
                realname={user.realname} 
                country={user.loccountrycode} 
                privateMode={user.communityvisibilitystate === (3 || 2)} 
                status={user.personastate}
            >
                <div>
                {
                    user.communityvisibilitystate === (3 || 2) && 
                    (
                        <div className="w-[625px] mx-[12px] rounded-[3px]">
                            {
                                games && (
                                    <div>
                                        <div className="text-ls text-lightwhite font-motiva px-[10px] py-[5px] bg-gradient-to-r from-rgbwhite to-rgbgray flex justify-between">
                                                <p>Recent Activity</p>
                                                <p>{totalTimeToWeek?.toFixed(1)} hours past 2 weeks</p>
                                        </div>
                                        <div className="pt-[28px] px-[10px] pb-[11px] bg-rgblightgray">
                                            {lastGames?.map((items, index) =>(
                                                <div className="w-full min-h-[70px] bg-rgblightgray py-[8px] px-[10px] mb-[21px] flex" key={index}>
                                                    <div>
                                                        <img src={url(items.appid)} alt="image-game" className="h-[70px] min-w-[184px]"/>
                                                    </div>
                                                    <div className="ml-[10px] flex justify-between w-full">
                                                        <p className="text-namegame pt-[10px]">{items.name}</p>
                                                        <p className=" text-offline text-[13px] pt-[32px] text-end">
                                                           {(Number(items.playtime_forever) / 60).toFixed()} hrs on record<br/>
                                                           ast played on {lastTimeAtGame(items.rtime_last_played)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className=" flex justify-end mr-[5px]">
                                                <Link to='/' className="text-namegame text-[13px]">Wishlist</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                </div>
            </Cardprofile>
           
        </div>
    )
}