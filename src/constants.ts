
export const url = (gameId: string) => 
    `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`

export const lastTimeAtGame = (time: (string | number)) => 
    new Date(Number(time) * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })

export const userStatusAcc = (status: number) => {
    switch (status) {
        case 0:
            return 'offline'
        case 1:
          return 'online' 
        case 2:
          return 'ingame'
        default:
          return 'online'

      }
}

export const colorAccLevel = (level: number) => {
    switch (true) {
      case level < 10:
        return 'lightwhite'
      case level < 20:
        return '#c02942'
      case level < 30:
        return '#d95b43' 
      case level < 40:
        return '#fecc23'
      case level < 50:
        return '#467a3c'
      case level < 60:
        return '#4e8ddb'
      case level < 70:
        return '#7652c9'
      case level < 80:
        return '#c252c9'
      case level < 90:
        return '#542437'  
      default:
        return 'offline'
  }
}