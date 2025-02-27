
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import { colorAccLevel, userStatusAcc } from '../../constants'

type Props = {
    avatar: string
    personaname: string
    realname?: string
    country?: string
    privateMode: boolean
    text?: string
    status: number
    children: React.ReactElement
    level?: number
}

const Cardprofile = ({avatar, personaname, realname, country, privateMode, text, status, level, children}: Props) =>{
    countries.registerLocale(en)  

    return(
        <div>
            <div className="bg-profile h-screen w-full items-center justify-center">
                <div className={`${!privateMode ? 'h-[224px]' : ' min-h-full'} max-w-[980px]  mx-auto bg-darkgray`}>
                    <div className="min-h-[224px] px-[25px] pt-[24px] flex">
                        <div className="min-w-[623px] flex">
                            <div className={`bg-${userStatusAcc(status)} w-[168px] h-[168px] mt-[5px]`}>
                                <img src={avatar} alt="avatar-profile" className="rounded-[4px] p-[2px] "/>
                            </div>
                            <div className="pt-[8px] ml-[36px]">
                                <p className="text-lightwhite text-xl font-extralight font-motiva">
                                    {personaname}
                                </p>
                                {privateMode ? (
                                    <div>
                                        <p className="text-hex text-[13px] gap-[14px]">
                                            {realname} {country && countries.getName(country, 'en')} 
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
                        {   privateMode && 
                        <div className="flex pt-[8px]">
                            <p className="mr-[10px] text-lightwhite font-motiva font-extralight text-[24px]">Level</p>
                            <div className="flex items-center justify-center rounded-full border-[2px] w-[32px] h-[32px] text-[16px] text-lightwhite mt-[5px]"
                                style={{ borderColor: level ? colorAccLevel(level) : '#000' }}>{level}</div>
                        </div> 
                        }
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Cardprofile