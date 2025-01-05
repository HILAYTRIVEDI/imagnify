"use client"

import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/constants/index'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const SideBar = () =>
{
    const pathName = usePathname()
    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo">
                    <Image
                        src="/assets/images/logo-text.svg"
                        alt="Logo"
                        width={180}
                        height={28}
                    />
                </Link>
                <nav className="sidebar-nav">
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {
                                navLinks.slice(0, 6).map((link, index) =>
                                {
                                    const isActive = link.route === pathName;

                                    return (
                                        <li
                                            key={link.route}
                                            className={
                                                `sidebar-nav_element group 
                                            ${isActive ?
                                                    'bg-purple-gradient text-white' :
                                                    'text-gray-700'}`
                                            }>
                                            <Link href={link.route} className='sidebar-link'>
                                                <Image
                                                    src={link.icon}
                                                    alt='Logo'
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )

                                })
                            }
                        </ul>
                        <ul className='sidebar-nav_elements'>
                            {
                                navLinks.slice(6).map((link, index) =>
                                {
                                    const isActive = link.route === pathName;

                                    return (
                                        <li
                                            key={link.route}
                                            className={
                                                `sidebar-nav_element group 
                                            ${isActive ?
                                                    'bg-purple-gradient text-white' :
                                                    'text-gray-700'}`
                                            }>
                                            <Link href={link.route} className='sidebar-link'>
                                                <Image
                                                    src={link.icon}
                                                    alt='Logo'
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )

                                })
                            }
                            <li className='flex-center cursor-pointer gap-2 p-4'>
                                <UserButton showName />
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <Button variant='default' size='default' asChild className='bg-purple-gradient bg-purple'>
                            <Link href='/sign-in'>Sign In</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    )
}

export default SideBar