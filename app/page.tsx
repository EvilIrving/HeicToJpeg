import FAQ from '@/faq/page'
import dynamic from 'next/dynamic'

const UI = dynamic(() => import('../components/Main'), { ssr: false })
export default function Page() {
  return (
    <>
      <UI />
      <FAQ />
    </>
  )
}
