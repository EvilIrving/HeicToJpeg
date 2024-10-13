import Link from "next/link";

import NotFoundIcon from "@/components/svgs/404";

export default function Custom404() {
  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
      <NotFoundIcon />
      <div className="mx-auto mt-10 w-[300px] rounded-xl bg-white p-8 text-center shadow-md">
        <p className="mb-6 font-mono text-xl text-primary md:text-2xl">
          抱歉,您查找的页面未找到
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-green-400 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:text-green-400"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
