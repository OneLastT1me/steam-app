import axios from 'axios'
import { useQueries } from 'react-query'

interface SteamLevels {
    response: {
        player_level: number
    };
}
  
const getLevel = async (steamId: string)=>{
    const { data }  = await axios.get<SteamLevels>(`api/IPlayerService/GetSteamLevel/v0001/?key=${import.meta.env.VITE_STEAM_KEY}&steamid=${steamId}`)  
    return data.response
}

export const useLevel = (steamIds: string[]) => {
    const data = useQueries(
            steamIds.map((steamId) => ({
                    queryKey: ['steams-levels', steamId],
                    queryFn: () => getLevel(steamId),
                    enabled: !!steamId
        }))
    )
    
    return data.map(({data}) => data)
}