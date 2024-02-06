"use client"
import {  ShoppingCart } from 'lucide-react';
import React from 'react';
import { Sheet,SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from '@radix-ui/react-separator';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import empty from '../../public/emptyCart.png'

export default function Cart() {
  const itemcount = 0;
  const fee=1

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 items-center flex '>
        <ShoppingCart className='h-6 flex-shrink-0 group-hover:text-green-500' />
        <span className='ml-2 text-sm font-medium text-gray-300 first-line:group-hover:text-gray-800 '>
          {itemcount}
        </span>
      </SheetTrigger>

      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart({itemcount})</SheetTitle>
        </SheetHeader>
        {itemcount > 0 ? (
          <>
            <div className='flez w-full flex-col pr-6'>
              Cart items
          
            <div className='space-y-4 pr-6'>
              <Separator />
            </div>
            <div className='space-y-1.5 pr-6'>
            <div className='flex'>
              <span className='flex-1'>Shipping</span>
              <span>Free</span>
            </div>
            <div className='flex'>
              <span className='flex-1'>Transaction Fee</span>
              <span>{formatPrice(fee)}</span>
            </div>
            <div className='flex'>
              <span className='flex-1'>Total</span>
              <span>{formatPrice(fee)}</span>
            </div>
</div>

<SheetFooter>
  <SheetTrigger asChild>
    <Link href='/cart' 
    className=" bg-green-400  hover:bg-green-300 hover:cursor-pointer text-white font-medium  p-[0.5vh] rounded-md w-full items-center text-center
    "
    >
          Continue to checkout
    </Link>
  </SheetTrigger>
</SheetFooter>
</div> 
          </>
        ):(
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div aria-hidden className=' relative mb-4 h-fit w-fit '></div>
<Image src={empty}


alt='empty'/>
<div>
  Your cart is empty
</div>
<SheetTrigger>
  <Link href='/products' className='  hover:cursor-pointer text-blue-700 font-medium  p-[0.5vh] rounded-md w-full items-center text-center
'>
  Go Back to Browsing
  </Link>
</SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
