import { useProfile } from "../../hooks/useProfile";
import Cardprofile from "./cardprofile";

export default function Profile () {


    const response = {players: [
      {
        steamid: "76561198038106270",
        communityvisibilitystate: 3,
        profilestate: 1,
        personaname: "Impulse",
        commentpermission: 1,
        profileurl: "https://steamcommunity.com/id/MeImpulse/",
        avatar: "https://avatars.steamstatic.com/8967ad6ff52c66017f4552c0100d99e77f510f90.jpg",
        avatarmedium: "https://avatars.steamstatic.com/8967ad6ff52c66017f4552c0100d99e77f510f90_medium.jpg",
        avatarfull: "https://avatars.steamstatic.com/8967ad6ff52c66017f4552c0100d99e77f510f90_full.jpg",
        avatarhash: "8967ad6ff52c66017f4552c0100d99e77f510f90",
        lastlogoff: 1719265065,
        personastate: 0,
        realname: "Metalliy",
        primaryclanid: "103582791430030342",
        timecreated: 1297528554,
        personastateflags: 0,
        loccountrycode: "AQ"
      }
    ]}

    return(
        <div>
           <Cardprofile 
                avatar={response.players[0].avatarfull} 
                personaname={response.players[0].personaname} 
                realname={response.players[0].realname} 
                country={response.players[0].loccountrycode} 
                privateMode={true} 
                status={response.players[0].personastate}
            />
        </div>
    )
}