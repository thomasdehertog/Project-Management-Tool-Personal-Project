import { Avatar as AntdAvatar, AvatarProps } from 'antd'

type Props = AvatarProps & {
    name: string;
}

const CustomAvatar = ( { name, style, ... rest }: Props) => {
  return (
    <AntdAvatar
        alt={'Javascript Mastery'}
        size="small"
        style={{ background: '#87d068',
        display:'flex', 
        alignItems: 'center',
        border: 'none'
    
    }}

    >CustomAvatar</AntdAvatar>
  )
}

export default CustomAvatar; 
