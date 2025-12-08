'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const { data: session } = useSession()
    console.log(session)
  return (

    <div>
        <button className='px-3 py-2 rounded-md bg-black text-white' onClick={() => signOut()}>Signout</button>
    </div>
  )
}

export default Page