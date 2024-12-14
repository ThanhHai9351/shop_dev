import * as React from "react"
import { Icons } from "@/components/icon/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { configs } from "@/lib/config"
import axios from "axios"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const RegisterForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    aliasName: "",
    middleName: "",
    englishFirstName: "",
    englishLastName: "",
    avatarUrl: "http://example.com/avatar.jpg",
    dob: "1990-01-01",
    gender: "MALE",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!")
      setIsLoading(false)
      return
    }

    try {
      const resRegister = await axios.post(
         `${configs.host}/customers` ,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        },
      )
      const dataUser = await resRegister.data.data
      toast.success("Register successfully!")
      console.log("Registering user:", formData)
      toast.success("Customer registered successfully!")
      navigate("/account/login");
    } catch (error) {
      console.error(error)
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>
      <Toaster richColors />
      <div {...props} className={`space-y-6 ${className}`}>
        <form onSubmit={onSubmit} className='space-y-4 scroll-m-0'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              placeholder='Enter your first name'
              type='text'
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              placeholder='Enter your last name'
              type='text'
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='aliasName'>Alias Name</Label>
            <Input
              id='aliasName'
              placeholder='Enter your alias name'
              type='text'
              value={formData.aliasName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input
              id='phoneNumber'
              placeholder='Enter your phone number'
              type='text'
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='dob'>Date of Birth</Label>
            <Input
              id='dob'
              placeholder='YYYY-MM-DD'
              type='date'
              value={formData.dob}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='********'
              type='password'
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              placeholder='********'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Register
          </Button>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
