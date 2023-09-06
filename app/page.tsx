import { sitedata } from "@/data/sitedata"

export default function Home() {
  return (
    <section>
      <h1 className="font-bold text-7xl mb-8 tracking-tight mt-40 text-center">
        Next starter blog template
      </h1>
      <p className="text-center text-xl text-neutral-600">
        {sitedata.description}
      </p>
    </section>
  )
}
