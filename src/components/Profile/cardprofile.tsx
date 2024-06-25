
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { useEffect, useState } from "react";

type Props = {
    avatar: string
    personaname: string
    realname?: string
    country?: string
    privateMode: boolean
    text?: string
    status: number
}

const Cardprofile = ({avatar, personaname, realname, country, privateMode, text, status}: Props) =>{
    const [stateSteam, setStateSteam] = useState('bg-offline')
    countries.registerLocale(en)  

    useEffect(()=>{
        if(status === 0){
            setStateSteam('bg-offline')
           }else if(status === 1){
            setStateSteam('bg-online')
           }else if(status === 2){
            setStateSteam('bg-ingame')
           }
    },[])
 

    return(
        <div>
            <div className="bg-profile h-screen w-full items-center justify-center">
                <div className={`${!privateMode ? 'h-[224px]' : ' min-h-full'} max-w-[990px]  mx-auto bg-darkgray`}>
                    <div className="min-h-[224px] px-[25px] pt-[24px] flex">
                        <div className={`${stateSteam} w-[168px] h-[168px] mt-[5px]`}>
                            <img src={avatar} alt="avatar-profile" className="rounded-[3px] p-[2px] "/>
                        </div>
                        <div className="pt-[8px] ml-[36px]">
                            <p className="text-lightwhite text-xl font-extralight font-motiva">
                                {personaname}
                            </p>
                            {privateMode ? (
                                <div>
                                    <p className="text-hex text-[13px] gap-[14px]">
                                        {realname} {country && countries.getName(country, "en")} 
                                    </p>
                                    <p className="text-hex text-[13px] mt-[32px]">
                                        {!text && 'No information given'}
                                    </p>
                                </div>
                            ):(
                                <p className="pt-[12px] font-size-[17px] text-oceanblue">This profile is private</p>
                            )}
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cardprofile