import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='flex flex-row items-center justify-between px-5 py-4 top-0 w-full font-sans'>
          <h2 className='font-bold text-3xl'>Event{' '}<span className='text-primary'>Hive</span></h2>
          <div className='font-semibold text-lg hidden md:flex lg:flex items-center justify-between'>
              <Link href="/login"><button>Login</button></Link>
              <Link href="/signup"><button className='bg-primary py-3 px-7 rounded-lg ml-7'>Signup</button></Link>

          </div>
      </div>
  )
}

export default Header
