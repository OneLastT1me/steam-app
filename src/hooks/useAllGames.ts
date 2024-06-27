import axios from "axios"
import { useQuery } from "react-query"

interface LastGames {
    response: {
        total_count: number,
        games: {
            appid: string;
            name: string,
            playtime_2weeks: number,
            playtime_forever: string,
            img_icon_url: string,
            rtime_last_played: string
        }[]
    }
  }
  

const getGames = async (steamId: string) =>{
    const lastGames  = await axios.get<LastGames>(`api/IPlayerService/GetOwnedGames/v1/?key=${import.meta.env.VITE_STEAM_KEY}&steamid=${steamId}&include_appinfo=true`)
    return lastGames.data.response
}

export const useAllGames = (steamId: string) => {
    return useQuery(['lastgames', steamId],() => getGames(steamId),{
        enabled: !!steamId,
      })
}