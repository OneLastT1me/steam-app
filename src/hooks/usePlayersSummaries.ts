import axios from "axios"
import { useQuery } from "react-query"

interface SteamCards  {
    response:{
        players:{
            steamid: string
            personaname: string
            avatar: string
            lastlogoff: string
            personastate: number
        }[]
    }
}

const getPlayersSummaries = async (steamIds: string[])=>{
    const idsString = steamIds.join(",");
    const data = await axios.get<SteamCards>(`api/ISteamUser/GetPlayerSummaries/v0002/?key=${import.meta.env.VITE_STEAM_KEY}&steamids=${idsString}`)
    return data.data.response.players
}

export const usePlayersSummaries = (steamIds: string[]) => {
    return useQuery(['friendsList', steamIds],() => getPlayersSummaries(steamIds), {

      })
}