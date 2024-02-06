'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../../public/logo.png'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/account-credential-validator'
import { trpc } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import {toast} from 'sonner'
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'

export default function page() {
    const router=useRouter();
    const{register,handleSubmit, formState:{errors}}=useForm<TAuthCredentialsValidator>({
        resolver:zodResolver(AuthCredentialsValidator)
    })
    const {mutate,isLoading} =trpc.auth.createPayloadUser.useMutation({
onError:(err) =>{
    if(err.data?.code === 'CONFLICT'){
        toast.error(
            'This email is already in use. Sign in instead'
        )
        return
}
if(err instanceof ZodError){
    toast.error(err.issues[0].message)
    return
}
toast.error(
    'Something went wrongplease try again'
)
},
onSuccess:({senttoEmail}) => {
    toast.success(`Verification email sent to ${senttoEmail}.`)
    router.push('/verify-email?to='+senttoEmail )
    
}
    })

    const onSubmit=({
         email,password,
        }: TAuthCredentialsValidator)=>{
       //send data to server
        mutate({email,password})
    }
  return (
    <div className='container relative flex pt-10 flex-col items-center justify-center lg:px-0'>
<div className='mx-auto flex w-full flex-col justify-normal space-y-6 sm:w-[350px]'>
    <div className='flex flex-col items-center space-y-2 text-center'>
        <Image src={logo} alt='' className='h-10 w-40'/>
        <h1 className='text-2xl font-bold'>
            Create an account
        </h1>
        <Link href='/sign-in' className='gap-1.5 flex items-center'>
            Already have an account? Sign in
            <ArrowRight className='h-4 w-4'/>
        </Link>
    </div>

<div className='grid gap-6'>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
        <div className='grid gap-1 py-2'>
    <Label htmlFor='email'>Email</Label>
    <Input
        {...register("email")}
        className={cn({'focus-visible:ring-red-500': errors.email})}
        placeholder='you@example.com'
        autoComplete='email'
        id='email' // Add an id attribute
    />
    {errors?.email &&(
        <p className='text-sm text-red-500 '>
            {errors.email.message}
        </p>
    )}
</div>



        <div className='grid gap-1 py-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
            type='password'
            {...register("password")}
             className=
             {cn({'focus-visible:ring-red-500':errors.password})} 
             placeholder='Password'/>
              {errors?.password &&(
        <p className='text-sm text-red-500 '>
            {errors.password.message}
        </p>)}
        </div>

            <Button  className='w-full p-2 bg-green-500 rounded-md text-white font-bold'>
                Sign Up
            </Button>
        </div>
    </form>

</div>
</div>
    </div>
  )
}