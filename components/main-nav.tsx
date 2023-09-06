"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sitedata } from "@/data/sitedata"

export function MainNavigation({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()

    const routes = [
        {
            href: '/',
            label: 'Home',
            active: pathname === '/',
        },
        {
            href: '/blog',
            label: 'Blog',
            active: pathname === '/blog'
        },
        {
            href: '/contact',
            label: 'Contact',
            active: pathname === '/contact'
        },
        {
            href: sitedata.github.repo,
            label: 'Github ^',
            active: pathname === sitedata.github.repo
        }
    ]
    return (
        <nav
            className={
                cn("flex items-center space-x-5", className)
            }
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm transition-colors hover:text-neutral-300",
                        route.active ? 'text-blue-500' : 'text-neutral-600'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}