import axios from "axios"
import { useQuery } from "react-query"
  
const getLevel = async (steamId: string) =>{
    const lastGames  = await axios.get(`api/IPlayerService/GetSteamLevel/v0001/?key=${import.meta.env.VITE_STEAM_KEY}&steamid=${steamId}&include_appinfo=true`)
    return lastGames.data.response
}

export const useLevel = (steamId: string) => {
    return useQuery(['steamLevel', steamId],() => getLevel(steamId),{
        enabled: !!steamId,
      })
}