import { useProfile } from "../../hooks/useProfile";

export default function Profile () {
    const steamId = localStorage.getItem('steamid')
    const  {data} = useProfile(steamId!);

    console.log(data?.response)

    return(
        <div>
            <div className="bg-profile h-screen w-full  items-center justify-center">
                <div className="max-w-[1018px] min-h-full mx-auto">
                    <div className="min-h-[224px] px-[25px] pt-[24px] flex">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}