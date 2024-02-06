

import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../public/logo.png';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Cart from './Cart';
import { getServerSideUser } from '@/lib/payload-utils';
import {cookies} from 'next/headers'



const Header= async() => {
  const nextCookies= cookies()
  // const [isMenuOpen, setMenuOpen] = useState(false);
  const {user}= await getServerSideUser(nextCookies)
  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  return (
    <div className='flex flex-col justify-between sticky top-0  items-center overflow-x-hidden bg-white'>
      
    <div className='container bg-white items-center flex px-[3vw] justify-between  max-lg:hidden border-b border-b-gray-300'>
    <Link href="/" className='left-header items-center'>

  <Image src={logo} alt='logo' width={150} height={70} className='object-contain bg-none max-w-[150px] max-h-[70px]' />
</Link>

      <div className='middle-header text-[2vh]  flex font-semibold justify-center items-center text-gray-700'>
        <Link href="/pages/"  className='textLink'>Service</Link>
        <Link href="/pages/" className='textLink'>Software</Link>
        <Link href="/pages/" className='textLink'>Job</Link>
        <Link href="/pages/" className='textLink'>Blog</Link>
        <Link href="/pages/" className='textLink'>Contact</Link>
      </div>
      <div className='right-header flex items-center'>
        {user ? null :(
          <div className='headerButton mr-4 '>
          <Link href="/sign-in" >Sign In</Link>
        </div>
        )}
         {user ? (<p> </p>):(
            <div className='headerButton mr-4'>
            <Link href='/sign-up'>Sign Up</Link>
          </div>
        )}
          <div className='flex items-center hover:cursor-pointer mr-4'>
            <Cart/>
          </div>
        <div className='items-center hover:cursor-pointer'>
          <LanguageIcon className='text-gray-500'/>
        </div>
      </div>
    </div>
    <div className='header2 w-full  max-lg:hidden border-b border-b-gray-200 rounded-b-3xl flex items-center justify-evenly'>
      <Link href="/pages/GraphicsDesign" className='pageslink' >Graphics & Design</Link>
      <Link href="/pages/ProgrammingTech" className='pageslink'> Programming & Tech</Link>
      <Link href="/pages/WritingTranslation" className='pageslink'>Writing & Translation</Link>
      <Link href="/pages/DigitalMarketing" className='pageslink'>Digital Marketing </Link>
      <Link href="/pages/AiSERVICES" className='pageslink'>AI Services</Link>
      <Link href="/pages/VideoAnimation" className='pageslink'>Video Animation</Link>
      <Link href="/pages/Photography" className='pageslink'>Photography</Link>
      <Link href="/pages/Business" className='pageslink'>Business</Link>
      
    </div>

    {/* Mobile Menu */}
    <div className='lg:hidden flex justify-between items-center  w-full'>
      <div className='container flex max-w-6xl p-[1vh] m-auto justify-between '>
        <Link href="/" className='left-header items-center'>
          <Image src={logo} alt='logo' width={150} height={60} className='object-contain bg-none' />
        </Link>
        <div className='rightHead-md'>
          <MenuIcon className='hover:cursor-pointer text-[4vh]' /*onClick={toggleMenu}*/></MenuIcon> 
        </div>
      </div>
      {/* {isMenuOpen && (
        <div className='lg:hidden  w-full fixed h-screen z-50 left-0 right-0 top-14'>
          
          <div className='fixed bg-white flex flex-col h-screen border rounded-md fright-0 w-[60%]  z-50 '>
            <Link href="/pages/"  className='textLinkpop'>Service</Link >
            <Link href="/pages/"  className='textLinkpop'>Software</Link >
            <Link href="/pages/"  className='textLinkpop'>Job</Link >
            <Link href="/pages/"  className='textLinkpop'>Blog</Link >
            <Link href="/pages/"  className='textLinkpop'>Browse Categories</Link >
            <Link href="/pages/"  className='textLinkpop'>Contact</Link >
          </div>
        </div>
      )} */}
    </div>
  </div>
  );
};

export default Header;
