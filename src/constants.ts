
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