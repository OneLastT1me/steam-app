
import { url, lastTimeAtGame, userStatusAcc, colorAccLevel } from '../../constants'
import { useAllGames } from '../../hooks/useAllGames'
import { useFriendList } from '../../hooks/useFriendsList'
import StatusAcc from '../Ui/statusAcc'
import { usePlayersSummaries } from '../../hooks/usePlayersSummaries'
import { useProfile } from '../../hooks/useProfile'
import { useLevel } from '../../hooks/useSteamLevel'
import Cardprofile from './cardprofile'
import { Link  } from 'react-router-dom'

export default function Profile () {
    const steamid = localStorage.getItem('steamid')
    const { data: user } = useProfile(steamid!)
    const { data: games } = useAllGames(steamid!)
    const { data: friendsIds } = useFriendList(steamid!)
    const fiendsIds = friendsIds?.map(arr => arr.steamid)
    const { data: firendsList } = usePlayersSummaries(fiendsIds!)
    const allId = [steamid!, fiendsIds!].flat()
    const  levelUsers = useLevel(allId)
   
    // unite steam id and lvl acc( ferst steam - its you acc)
    const userIdLvl =  levelUsers.map((item, index)=> ({
        ...item, steamId: allId[index]
    }))

    //add lvl steam and sort list by lvl
    const totalListFriends = firendsList?.map((item) => {
        const matchedUser = userIdLvl.find(user => user.steamId === item.steamid)
        return matchedUser ? { ...item, player_level: matchedUser.player_level } : item
    }).sort((a, b) => b.player_level! - a.player_level!)

    const totalTimeToWeek = games?.games.reduce((totalTime, game) => {
        return (totalTime + (game.playtime_2weeks || 0) / 60)
    }, 0)

    //sort first for last week second for last session
    const lastGames = games?.games.sort(
        (a , b) => b.playtime_2weeks - a.playtime_2weeks ).sort(
            (a , b) => Number(new Date(b.rtime_last_played)) - Number(new Date(a.rtime_last_played))).slice(0, 3)

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
                level={levelUsers[0]?.player_level}
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
                                <StatusAcc 
                                    status={user.personastate}
                                    lastlogoff={user.lastlogoff}
                                    finding={'main'}
                                />
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
                                                <div className="flex gap-[5px] mb-[12px]">
                                                    <Link to='/' className="text-gameName text-[14px] pt-[10px]">Fiends</Link><p className="text-[24px] text-offline">{friendsIds?.length}</p>
                                                
                                                </div>
                                                {
                                                    totalListFriends?.slice(0,6).map((item, index) => (
                                                        <Link to='/' key={index} >
                                                            <div className="h-[36px] flex  justify-between gap-[10px] mb-[15px] ">
                                                                <div className="flex">
                                                                    <img src={item.avatar} className="mr-[8px]"/>
                                                                    <div className="gap-[10px] font-motiva text-[12px]">
                                                                        <p className={`${'text-' + userStatusAcc(item.personastate)}`}>{item.personaname}</p>
                                                                        <StatusAcc 
                                                                            status={item.personastate}
                                                                            lastlogoff={Number(item.lastlogoff)}
                                                                            finding={'list'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center justify-center rounded-full border-[2px] w-[32px] h-[32px] text-[16px] text-lightwhite mt-[5px]"
                                                                        style={{ borderColor: item.player_level ? colorAccLevel(item.player_level) : '#000' }}>{item.player_level}</div>
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