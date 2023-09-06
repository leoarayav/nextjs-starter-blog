import Link from "next/link"
import Image from "next/image"

import type { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/date"

interface PostCardProps {
    post: Omit<Post, "_id" | "_raw" | "body">
}

export default function PostCard({
    post
}: PostCardProps) {
    return (
        <>
            <Link href={`/blog/${post.slug}`} passHref>
                <div className="border border-neutral-800 py-5 px-4 rounded-lg">
                    <div className="inline-flex">
                        <p className="text-sm text-neutral-400">
                            {formatDate(post.date)}
                            {' • '}
                        </p>
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={20}
                            height={20}
                            className="rounded-full ml-2"
                        />
                    </div>
                    <h2 className="text-2xl font-semibold mt-2 mb-3">
                        {post.title}
                    </h2>
                    <p className="text-base text-neutral-400">
                        {post.description}
                    </p>
                </div >
            </Link>
        </>
    )
}