import InfoIconPic from './img/IconInfo.png'
import {ReactElement} from "react";

// Add new ImageName to ***IconName*** then add Data in ***IconInit***
type IconName = 'InfoIcon'
type TIconInit = {
    name:IconName,
    width:number
    height:number
    alt:string
    src:string
}
interface IIconStorage {
    IconName: IconName
    className?:string
}



export const InfoIcon = InfoIconPic





//Here is Data
const IconInit:TIconInit[] = [
    {
        name: 'InfoIcon',
        width: 24,
        height: 24,
        alt: 'info-icon',
        src: InfoIcon
    }
]


const IconStorage = ({IconName,className}:IIconStorage):ReactElement=> {
    const Icon = IconInit.filter(icon => icon.name === IconName)[0]
    return <img src={Icon.src} alt={Icon.alt} width={Icon.width} height={Icon.height} className={className} />
}


export default IconStorage