import Link from "next/link"
import Image from "next/image"

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { Mdx } from "@/components/mdx"
import { formatDate } from "@/lib/date"

// Post properties
interface PostProps {
    params: { slug: string[] }
}

async function getPostFromParams(params: PostProps["params"]) {
    const slug = params.slug.join("/")
    const post = allPosts.find((post) => post.slug === slug)
    if (!post) return null
    return post
}

export async function generateMetadata({
    params,
}: PostProps): Promise<Metadata> {
    const post = await getPostFromParams(params)
    if (!post) return notFound()
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            authors: [post.author.name],
            publishedTime: new Date(post.date).toISOString(),
        }
    }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
    return allPosts.map((post) => ({ slug: post.slug.split("/") }))
}

export default async function PostPage({ params }: PostProps) {
    const post = await getPostFromParams(params)
    if (!post) return notFound()
    return (
        <section className="mt-12 flex-col flex-wrap relative">
            <div className="flex mb-14">
                <Link href="/blog" className="text-neutral-600">
                    &larr; Back to posts
                </Link>
            </div>
            <div className="text-sm mb-3 text-neutral-400">
                {formatDate(post.date)}
            </div>
            <h1 className="font-bold text-6xl tracking-tighter max-w-[650px] text-neutral-200">
                {post.title}
            </h1>
            <p className="text-neutral-500 mt-4 text-lg">
                {post.description}
            </p>
            <div className="mt-4 flex flex-col">
                <p className="mb-3 text-neutral-500">Posted by</p>
                <div className="inline-flex">
                    <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <div className="text-neutral-400 text-sm ml-2 font-bold">
                        {post.author.name}
                    </div>
                    <div className="text-neutral-500 text-sm ml-1.5">
                        (@{post.author.alias})
                    </div>
                </div>
            </div>
            <hr className="max-w-2xl border-t border-neutral-800 my-6" />
            <Mdx code={post.body.code} />
        </section>
    )
}