import Image from "next/image";
import Link from "next/link";

// 添加 logoUrl 作为参数
const Logo = ({ logoUrl = "/logo/logo.png" }) => {
  return (
    <Link className="block w-full" href="/">
      {/* <AspectRatio ratio={1 / 1} className="bg-muted"> */}
      <Image
        src={logoUrl} // 使用传入的 logoUrl
        alt="Logo"
        fill
        className="size-full object-cover"
      />
      {/* </AspectRatio> */}
    </Link>
  );
};

export default Logo;
