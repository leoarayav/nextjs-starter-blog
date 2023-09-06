import { useMDXComponent } from 'next-contentlayer/hooks'

function Alert(props: any) {
    let { type = "" } = props;
    switch (type) {
        case "success":
            type = "bg-green-900 bg-opacity-20 border-green-700 text-neutral-200";
            break;
        case "warning":
            type = "bg-yellow-900 bg-opacity-20 border-yellow-700 text-neutral-200";
            break;
        case "error":
            type = "bg-red-900 bg-opacity-20 border-red-700 text-neutral-200";
            break;
        case "info":
            type = "bg-blue-900 bg-opacity-20 border-blue-700 text-neutral-200";
            break;
        default:
            type = "bg-neutral-900 bg-opacity-20 border-neutral-700 text-neutral-200";
    }

    return (
        <div className={`border ${type} bg-opacity-40 rounded-md text-md max-w-xl mt-6 mb-6`} role="alert">
            <h5 className="mt-2 font-bold text-md px-4">
                {props.title}
            </h5>
            <div className="px-4 py-3">
                {props.children}
            </div>
        </div>
    )
}

const components = {
    Alert
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)
    return (
        <article className='prose prose-quoteless prose-invert'>
            <Component components={components} />
        </article>
    )
}