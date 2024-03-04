'use client';
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes';


const NavBar = () => {
    const currentPath = usePathname();
    const { data: session, status  } = useSession();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/" ><FaBug /></Link>
    <ul className='flex space-x-6 text-zinc-500'>
            {links.map(link => <li key={link.href}>
                <Link href={link.href} 
                className={classnames({
                    'text-zinc-900' : link.href === currentPath,
                    'text-zinc-500' : link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors' : true
                })}>{link.label}</Link></li>)}
            
        </ul>
        <Box>
           {status === "authenticated" && <Link href='/api/auth/signout'>Log out</Link> }
           {status !== "authenticated" && <Link href='/api/auth/signin'>Sign In</Link> }
        </Box>
        
    </nav>
  )
}

export default NavBar

