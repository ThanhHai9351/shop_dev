import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { toast } from "sonner"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormforgotPassword = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState<string>("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    try{
      const res = await authorizedAxiosInstance.post(`${configs.host}/auth/reset-password`,{email: email})
      if(res.data.statusCode === 200)
      {
        toast.success("Send mail succeed, please check your mail to reset password !");
      }
    }catch(err){
     
    }
  }

  return (
    <>
      <div {...props}>
        <form onSubmit={onSubmit}>
          <div className='grid gap-2'>
            <div className='grid gap-1'>
              <Label className='' htmlFor='email'>
                Email
              </Label>
              <Input
                id='email'
                placeholder='name@example.com'
                type='email'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect='off'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default FormforgotPassword
