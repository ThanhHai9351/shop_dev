import type { FC } from "react"
import React from "react"
import { RiMicrosoftLoopFill } from "react-icons/ri"
import { Link } from "react-router-dom"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link className='flex cursor-pointer items-center gap-1' to='/'>
      aloo
    </Link>
  )
}

export default Logo
