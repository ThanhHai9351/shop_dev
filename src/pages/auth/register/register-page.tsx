import { Link } from "react-router-dom"
import Logo from "@/components/icon/logo"
import RegisterForm from "@/pages/auth/register/register-form"

const RegisterPage = () => {
  return (
    <>
      <div className='container relative md:flex md:flex-row lg:grid lg:max-w-full lg:grid-cols-2 lg:px-0 h-full'>
        <div className='relative hidden flex-col bg-muted p-10 text-white dark:border-r lg:flex h-full'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium gap-6'>
            <div className='flex flex-col w-12'>
              <Link to='/'>
                <Logo width={50} />
              </Link>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>Shop3Man</h4>
            </div>
          </div>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <footer className='text-sm'>
                <p className='mb-3 text-xl'>Chào mừng bạn đến với hệ thống Shop3Man!</p>
                <p>
                  Vui lòng đăng nhập để truy cập vào các tính năng và dịch vụ của chúng tôi. Nếu bạn chưa có tài khoản,
                  hãy đăng ký để trải nghiệm ngay hôm nay!
                </p>
                <p>Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn theo các tiêu chuẩn bảo mật cao nhất.</p>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8 h-screen flex items-center justify-center scroll-m-1'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center'>
              <Logo width={75} />
            </div>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Register</h1>
              <p className='text-sm text-muted-foreground'>Enter your credentials below to access.</p>
            </div>
            <RegisterForm />
            <div className='flex flex-col space-y-2 text-center'>
              <p className='text-sm text-muted-foreground'>
                You have an account? <Link to='/account/login'>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
