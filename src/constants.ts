
export const url = (gameId: string) => 
    `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`

export const lastTimeAtGame = (time: (string | number)) => 
    new Date(Number(time) * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })