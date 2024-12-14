import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { formatDate } from "date-fns"
import { toast } from "sonner"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(2, { message: "Password must be at least 6 characters." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  internalId: z.string(),
  gender: z.enum(["1", "0"], {
    errorMap: () => ({
      message: "Gender must be 1 (Female) or 0 (Male).",
    }),
  }),
})

export default function DialogCreateStaff({fetchStaffs}:{fetchStaffs:()=>{}}) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      dob: new Date("1990-01-01T00:00:00Z"),
      internalId: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataStaff = { ...values, userType: "Staff", operationalRole: "Manager" }
    try {
      const resCreate = await authorizedAxiosInstance.post(`${configs.host}/users`, dataStaff)
      console.log(resCreate.data.data)
      fetchStaffs();
      toast.success("Create account successfully!")
    } catch (error) {
      toast.error("Create account staff failed!Try again!")
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex justify-end'>
          <Button className='bg-blue-500 text-white' onClick={() => setOpen(true)}>
            Create staff
            <Plus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>CREATE STAFF</DialogTitle>
          <DialogDescription>Make create to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-3 gap-2'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FirstName</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter the firstname ...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LastName</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter the lastname ...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter the phone number ...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter the Email...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='*************' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? formatDate(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='internalId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>internalId</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Enter the internaltional ...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Enter the gender ...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
