import * as React from "react"
import { Icons } from "@/components/icon/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { app } from "@/firebase"
import { FaGoogle } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import axios from "axios"
import { configs } from "@/lib/config"
import { Checkbox } from "@/components/ui/checkbox"
import authorizedAxiosInstance from "@/utils/authorizedAxios"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [isStaff, setIsStaff] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resLogin = await axios.post(
        isStaff ? `${configs.host}/auth/internal/login` : `${configs.host}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        },
      )
      const dataUser = await resLogin.data.data
      localStorage.setItem("accessToken", dataUser.accessToken)
      toast.success("Login successfully!")
      setTimeout(() => {
        if (isStaff) {
          navigate("/admin/dashboard")
        } else {
          navigate("/")
        }
      }, 1000)
    } catch (error) {
      console.log(error)
      toast.error("Login failed! Please again!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    const auth = getAuth(app)
    auth.languageCode = "it"
    provider.setCustomParameters({
      login_hint: "user@example.com",
    })

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error("Error code: " + errorCode)
        console.error("Error message: " + errorMessage)
        console.error("Email: " + email)
        console.error("Credential: " + credential)
      })
  }

  const handleLoginFacebook = () => {
    const provider = new FacebookAuthProvider()
    provider.addScope("email")
    provider.addScope("public_profile")

    const auth = getAuth(app)

    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = FacebookAuthProvider.credentialFromResult(result)
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData?.email
        const credential = FacebookAuthProvider.credentialFromError(error)
        console.error("Error code: " + errorCode)
        console.error("Error message: " + errorMessage)
        console.error("Email: " + email)
        console.error("Credential: " + credential)
      })
  }

  const handleForgotPassword = async () => {
    navigate("/account/forgot-password")
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
                disabled={isLoading}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label className='mt-2' htmlFor='email'>
                Password
              </Label>
              <Input
                id='password'
                placeholder='********'
                type='password'
                autoCapitalize='none'
                autoComplete='password'
                autoCorrect='off'
                disabled={isLoading}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex items-end space-x-2'>
              <Checkbox onCheckedChange={() => setIsStaff(!isStaff)} id='isUser' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                is staff
              </label>
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Log In
            </Button>
          </div>
        </form>
        <div className='flex justify-end'>
          <p className='cursor-pointer text-sm text-blue-500 p-3' onClick={handleForgotPassword}>
            Forgot password
          </p>
        </div>
        <div className='text-center mt-2'>
          <p className='leading-7 [&:not(:first-child)]:mt-6 font-semibold'>Or</p>
        </div>
        <div></div>
        <div className='mt-2'>
          <Button className='block w-full mt-2' variant={"outline"} onClick={handleLoginGoogle}>
            <div className='flex items-center justify-center'>
              <FaGoogle />
              <p className='mx-2'>Google</p>
            </div>
          </Button>
          <Button className='block w-full mt-2' variant={"outline"} onClick={handleLoginFacebook}>
            <div className='flex items-center justify-center'>
              <FaFacebook />
              <p className='mx-2'>Facebook</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}
export default LoginForm
