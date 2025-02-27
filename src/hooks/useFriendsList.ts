import axios from 'axios'
import { useQuery } from 'react-query'

interface FriendsList{
        friendslist: {
            friends:{
                steamid: string
                relationship: string
                friend_since: number
            }[]
        }    
    }


const getFriendsList = async (steamId: string)=>{
    const { data } = await axios.get<FriendsList>(`api/ISteamUser/GetFriendList/v0001/?steamid=${steamId}&key=${import.meta.env.VITE_STEAM_KEY}&relationship=friend`)
    return data.friendslist.friends
}

export const useFriendList = (steamId: string) => {
    return useQuery(['freindsList', steamId],() => getFriendsList(steamId), {
        enabled: !!steamId
      })
}