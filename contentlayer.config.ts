import { defineDocumentType, makeSource, ComputedFields , defineNestedType } from "contentlayer/source-files"

// Remark plugins
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

// Rehype plugins
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath 
    }
}

// Nested types here

const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        name: { type: 'string', required: true },
        avatar: { type: 'string', default: '/static/users/user.png' },
        alias: { type: 'string' },
    }
}))

// Blog post type
export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: 'posts/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        author: { type: 'nested', required: true, of: Author },
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: (doc) => ({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: doc.title,
                datePublished: doc.date,
                dateModified: doc.date,
                description: doc.description,
                author: doc.author,
            }),
        },
    },
}))

// Source content
export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [
            remarkGfm, 
            remarkMath,
        ],
        rehypePlugins: [
            rehypeAutolinkHeadings,
            rehypePrettyCode,
            rehypeSlug,
        ],
    },
})