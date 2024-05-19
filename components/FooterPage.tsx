import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
export default function Footer() {
  return (
    <footer className="footer max-w-6xl mx-auto grid-cols-3 gap-3 mt-5 p-10 text-accent-content">
      <aside className="col-span-1">
        <Link
          href="/"
          className="text-lg font-bold"
        >
          {siteMetadata.name}
        </Link>
        <p className=""> {siteMetadata.introduce} </p>
      </aside>
      <nav className="col-span-1 w-full flex justify-center">
        <ul className="flex flex-col gap-3">
          {/* 
                    TODO
                    样式优化
                    link 悬浮 颜色 
                    跳转链接
                    新增页面 */}
          <h2 className="text-lg font-bold">Quick Links</h2>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Other</Link>
          </li>
          <li>
            <Link href="/">Terms & Conditions</Link>
          </li>
        </ul>
      </nav>
      <nav className="col-span-1 w-full flex justify-center">
        <ul className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Social</h2>
          <li>
            <Link href="https://t.me/noncain">Telegram</Link>
          </li>
          <li>
            <Link href="https://github.com/EvilIrving">GitHub</Link>
          </li>
          <li>Email: dong.yy1916@gmail.com</li>
        </ul>
      </nav>
    </footer>
  )
}
