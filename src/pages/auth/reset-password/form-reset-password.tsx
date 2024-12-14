import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation, useNavigate } from "react-router-dom"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { toast } from "sonner"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormResetPassword = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")
  const [password, setPassword] = React.useState<string>("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const resResetPass = await authorizedAxiosInstance.post(`${configs.host}/auth/verify-and-reset-password`, {
      token: token,
      newPassword: password,
    })
    if (resResetPass.data.statusCode === 200) {
        toast.success("New password change successfully !");
      navigate("/account/login")
    }
  }

  return (
    <>
      <div {...props}>
        <form onSubmit={onSubmit}>
          <div className='grid gap-2'>
            <div className='grid gap-1'>
              <Label className=''>New Password</Label>
              <Input
                placeholder='******'
                type='password'
                autoCapitalize='none'
                autoCorrect='off'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default FormResetPassword
