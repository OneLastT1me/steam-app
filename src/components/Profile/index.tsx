
import { url, lastTimeAtGame, userStatusAcc } from "../../constants";
import { useAllGames } from "../../hooks/useAllGames";
import { useFriendList } from "../../hooks/useFriendsList";
import { usePlayersSummaries } from "../../hooks/usePlayersSummaries";
import { useProfile } from "../../hooks/useProfile";
import { useLevel } from "../../hooks/useSteamLevel";
import Cardprofile from "./cardprofile";
import { Link  } from "react-router-dom";

export default function Profile () {
    const steamid = localStorage.getItem('steamid')
    const { data: lvl} = useLevel(steamid!)
    const { data: user } = useProfile(steamid!)
    const { data: games } = useAllGames(steamid!)
    const { data: friendsIds } = useFriendList(steamid!)
    const SteamIds = friendsIds?.map(arr => arr.steamid)
    const { data: firendsList } = usePlayersSummaries(SteamIds!)

   
  
    const totalTimeToWeek = games?.games.reduce((totalTime, game) => {
        return (totalTime + (game.playtime_2weeks || 0) / 60)
        
    }, 0)


    //sort first for last week second for last session
    const lastGames = games?.games.sort(
        (a , b) => b.playtime_2weeks - a.playtime_2weeks ).sort(
            (a , b) => Number(new Date(b.rtime_last_played)) - Number(new Date(a.rtime_last_played))).slice(0, 3)

    // redirect on error.page
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
                privateMode={[2, 3].includes(user.communityvisibilitystate)}
                status={user.personastate}
                level={lvl?.player_level}
            >
                <div>
                {
                    [2, 3].includes(user.communityvisibilitystate)  && 
                    (   
                        <div className="flex px-[12px] gap-[10px]">
                            <div className="min-w-[625px]  rounded-[3px] ">
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
                                                            <p className="text-gameName pt-[10px]">{items.name}</p>
                                                            <p className="text-offline text-[13px] pt-[32px] text-end">
                                                            {(Number(items.playtime_forever) / 60).toFixed()} hrs on record<br/>
                                                            ast played on {lastTimeAtGame(items.rtime_last_played)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className=" flex justify-end mr-[5px]">
                                                    <Link to='/' className="text-gameName text-[13px]">Wishlist</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="w-[100%] bg-rgblightgray p-[10px] ">
                                {user!.personastate === 0 ?(
                                    <div>
                                        <p className="text-offline">Currently Offline</p>
                                        <p className="text-offline">Last Online {Math.floor(user.lastlogoff / (1000 * 60 * 60 * 24))} days ago</p>
                                    </div>
                                    )
                                     :( 
                                        <div>
                                            <p className="text-online">Online</p>
                                        </div>
                                )}
                                <div className=" mt-[40px]">
                                   { games && 
                                        (
                                            <div className="flex gap-[5px]">
                                                <Link to='/' className="text-gameName text-[14px] pt-[10px] pb-[40px] ">Games</Link><p className="text-[24px] text-offline">{games.game_count}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        true && 
                                        (
                                            <div>
                                                <div className="flex gap-[5px]">
                                                    <Link to='/' className="text-gameName text-[14px] pt-[10px]">Fiends</Link><p className="text-[24px] text-offline">{friendsIds?.length}</p>
                                                
                                                </div>
                                                {
                                                firendsList?.slice(0,6).map((item, index) => (
                                                    <Link to='/' key={index} >
                                                        <div className="h-[35px] flex ">
                                                            <img src={item.avatar} />
                                                            <div className="gap-[10px]">
                                                                <p className={`${userStatusAcc(item.personastate)}`}>{item.personaname}</p>
                                                                <p>off</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                
                            </div>
                        </div>
                    )
                }
                </div>
            </Cardprofile>
           
        </div>
    )
}