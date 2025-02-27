
type Props = {
    status: number
    lastlogoff: number
    finding: 'main'| 'list' 
}

 const StatusAcc = ({status, lastlogoff, finding}:Props) => {

    return (
        <div>
            {
            status === 0 ?(
                <div>
                    {finding === 'main' &&  <p className="text-offline">'Currently Offline</p>}
                    <p className="text-offline">Last Online {Math.floor(lastlogoff / (1000 * 60 * 60 * 24))} days ago</p>
                </div>
                    )
                    :( 
                        <div>
                            <p className="text-online">{finding === 'main' && 'Currently'} Online</p>
                        </div>
            )}
        </div>
        )
}

export default StatusAcc