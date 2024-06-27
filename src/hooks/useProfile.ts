import axios from "axios";
import { useQuery } from "react-query";


interface SteamProfile {
  response: {
    players: {
      steamid: string;
      communityvisibilitystate: number,
      profilestate: number,
      personaname: string,
      commentpermission: number,
      profileurl: string,
      avatar: string,
      avatarmedium: string,
      avatarfull: string,
      avatarhash: string,
      lastlogoff: number,
      personastate: number,
      realname: string,
      primaryclanid: string,
      timecreated: number,
      personastateflags: number,
      loccountrycode: string
    }[]
  }
}

const getProfile =  async (steamId: string) => {
    const  profile  = await 
        axios.get<SteamProfile>
        (`/api/ISteamUser/GetPlayerSummaries/v2/?key=${import.meta.env.VITE_STEAM_KEY}&steamids=${steamId}`)
        return profile.data.response.players[0]
}


export const useProfile = (steamId: string) => {
    return useQuery(['profile', steamId],() => getProfile(steamId), {
        enabled: !!steamId,
      })
}

