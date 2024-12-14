// ** Returns initials from string
export const getInitials = (str: string): string => {
  return str.split(/\s+/).reduce((response, word) => (response += word.charAt(0)), "")
}
