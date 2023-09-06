import Link from "next/link"
import Image from "next/image"

import { sitedata } from "@/data/sitedata"
import { MainNavigation } from "@/components/main-nav"

export default function Navigation() {
    return (
        <div className="lg:fixed w-full border-b border-neutral-900 z-20 lg:top-0 lg:left-0 backdrop-blur-sm">
            <div className="flex items-center px-8 h-14 flex-wrap">
                <Image
                    src="/next.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
                <span className="text-neutral-700 mx-2">
                    {' / '}
                </span>
                <p className="text-lg">
                    {sitedata.header_title}
                </p>
                <MainNavigation className="ml-10"/>
            </div>
        </div>
    )
}