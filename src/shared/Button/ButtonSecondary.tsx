import React from "react"
import type { ButtonProps } from "@/shared/Button/Button"
import Button from "@/shared/Button/Button"

export interface ButtonSecondaryProps extends ButtonProps {
  href?: string
  onClick: () => void
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ className = "", onClick, ...args }) => {
  const CLASSES = `text-primary border-2 border-primary/15 dark:border-neutral-500 dark:text-white hover:border-primary transition-all duration-200 text-sm ${className}`

  return <Button className={CLASSES} onClick={onClick} {...args} />
}

export default ButtonSecondary
