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
import { useRouter, useSearchParams } from 'next/navigation'

export default function page() {
    const searchParams= useSearchParams()
    const isSeller = searchParams.get('as')==='seller'
    const router=useRouter();
    const continueasseller=()=>{
        router.push("?as=seller ")
    }
    const continueasbuyer=()=>{
        router.replace("/sign-in",undefined)
    }
    const origin= searchParams.get('origin')
    const{register,handleSubmit, formState:{errors}}=useForm<TAuthCredentialsValidator>({
        resolver:zodResolver(AuthCredentialsValidator)
    })
    const {mutate:signIn,isLoading} =trpc.auth.signIn.useMutation({
        onSuccess:()=>{
            toast.success('Signed in successfully')
            router.refresh()  
             if(origin){
            router.push(`/${origin}`)
            return
        }
        if(isSeller){
            router.push('/sell')
            return
        }
        router.push('/')
        },
        onError:(err)=>{
            if(err.data?.code === 'UNAUTHORIZED'){
                toast.error('Invalid email or password')
            }
        }
     
    })

    const onSubmit=({
         email,password,
        }: TAuthCredentialsValidator)=>{
       //send data to server
        signIn({email,password})
    }
  return (
    <div className='container relative flex pt-10 flex-col items-center justify-center lg:px-0'>
<div className='mx-auto flex w-full flex-col justify-normal space-y-6 sm:w-[350px]'>
    <div className='flex flex-col items-center space-y-2 text-center'>
        <Image src={logo} alt='' className='h-10 w-40'/>
        <h1 className='text-2xl font-bold'>
            Sign in to your {isSeller ? 'seller':'' }{""} account
        </h1>
        <Link href='/sign-up' className='gap-1.5 flex items-center'>
           Don&apos;t have an account? Sign up
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

            <Button   className='w-full p-2 bg-green-500 rounded-md text-white font-bold'>
                Sign In
            </Button>
        </div>
    </form>
    <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t'/>
        </div>
            <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>or</span>
            </div>
    </div>
{isSeller ? (
            <Button  className='w-full p-2 bg-green-500 rounded-md text-white font-bold'
            disabled={isLoading}
            onClick={continueasbuyer }>Continue as Costumer</Button>

):(
    <Button  className='w-full p-2 bg-green-500 rounded-md text-white font-bold'
    onClick={continueasseller}
    disabled={isLoading}>Continue as Seller</Button>
)}
</div>
</div>
    </div>
  )
}