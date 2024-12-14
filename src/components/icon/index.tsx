// ** Icon Imports
import { Icon, IconProps } from "@iconify/react"

interface IconifyIconProps extends IconProps {
  icon: string
}

const IconifyIcon: React.FC<IconifyIconProps> = ({ icon, ...rest }) => {
  return <Icon icon={icon} fontSize='1.375rem' {...rest} />
}

export default IconifyIcon
