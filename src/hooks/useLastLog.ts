import axios from "axios";
import { useQuery } from "react-query";

interface Props {
    response: {
      accounts: {
        public_data: {
          steamid: string,
          visibility_state: number,
          profile_state: number,
          sha_digest_avatar: string,
          persona_name: string,
          profile_url: string,
          content_country_restricted: boolean
        },
        private_data: {
          persona_state: number,
          persona_state_flags: number,
          time_created: number,
          last_logoff_time: number,
          last_seen_online: number
        }
      }[]
    }
}

const getLastLogTime =  async (steamId: string) => {
    const data  = await 
        axios.get<Props>
        (`api/IPlayerService/GetPlayerLinkDetails/v1/?key=${import.meta.env.VITE_STEAM_KEY}&steamids=${steamId}`)
        console.log(data.data)
        return data.data.response
}


export const useLastLogTime= (steamId: string) => {
    return useQuery(['lastLog', steamId],() => getLastLogTime(steamId), {
        enabled: !!steamId,
      })
}
