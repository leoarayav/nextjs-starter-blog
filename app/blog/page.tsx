import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import PostCard from "@/components/posts/postcard"

export const metadata: Metadata = {
    title: 'Nextblog | Blog',
    description: 'Read the tests posts from this template'
}

export default async function Blog() {
    const posts = allPosts.sort((a, b) => {
        return Number(new Date(b.date)) - Number(new Date(a.date))
    })
    return (
        <section className="max-w-xl">
            <h1 className="font-semibold text-4xl mt-10 tracking-tighter text-center lg:text-left">
                The latest posts
            </h1>
            <div className="flex flex-col mt-6 space-y-4">
                {posts.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </section>
    )
}