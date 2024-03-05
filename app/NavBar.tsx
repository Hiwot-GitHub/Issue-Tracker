'use client';
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text} from '@radix-ui/themes';


const NavBar = () => {
   
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href="/" ><FaBug /></Link>
            <NavLinks />
           </Flex>
           <AuthStatus />
        </Flex> 
        </Container> 
        
    </nav>
  )
}

export default NavBar

const NavLinks = () => {
    const currentPath = usePathname();
   
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
    return  <ul className='flex space-x-6 text-zinc-500'>
    {links.map(link => <li key={link.href}>
        <Link href={link.href} 
         className={classnames({
            "nav-link": true,
            '!text-zinc-900' : link.href === currentPath,
         })}>{link.label}</Link></li>)}

    
</ul>
}

const AuthStatus = () => {
    const { data: session, status  } = useSession();
    if (status === "loading") return null;
    if (status === "unauthenticated") return <Link className='nav-link' href='/api/auth/signin'>Sign In</Link>;
    return  <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar size='2' radius='full' className='cursor-pointer' src={session!.user?.image!} fallback="?" />      
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size='4'>{session!.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href='/api/auth/signout'>Log out</Link> 
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
}
