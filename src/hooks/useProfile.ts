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
    const { data } = await 
        axios.get<SteamProfile>
        (`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=AFE2D7140F2D5F5FC25E29323A1E7FF6&steamids=76561198038106270`)
    return data
}


export const useProfile = (steamId: string) => {
    return useQuery(['profile', steamId],() => getProfile(steamId), {
        enabled: !!steamId,
      })
}

