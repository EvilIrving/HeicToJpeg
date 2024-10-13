export const headerNavLinks = [
  { href: "/", title: "Home" },
  { href: "/blog", title: "Blog" },
  { href: "/tags", title: "Tags" },
  { href: "/projects", title: "Projects" },
  { href: "/about", title: "About" },
];

export const siteMetadata = {
  title: "HEIC to PNG/JPEG Converter - Simple, Free, and Offline",
  name: "Heic Convert",
  author: "Cain",
  headerTitle: "HEIC to PNG/JPEG Converter - Simple, Free, and Offline",
  description:
    "Convert HEIC to JPG effortlessly with our user-friendly website. Experience high-quality image conversion and enjoy compatibility across multiple platforms.",
  introduce:
    "Our converter provides a hassle-free solution, allowing you to transform your HEIC files into widely supported formats. With our offline functionality, you can conveniently convert your images without the need for an internet connection. ",
  language: "en-us",
  theme: "system", // system, dark or light
  siteUrl: "https://convertools.site",
  siteRepo: "https://github.com/EvilIrving/heic_convert",
  siteLogo: "/static/images/logo.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "dong.yy1916@gmail.com",
  github: "https://github.com/EvilIrving",
  x: "https://x.com/Losewings",
  youtube: "https://youtube.com",
  linkedin: "https://www.linkedin.com",
  threads: "https://www.threads.net",
  instagram: "https://www.instagram.com",
  locale: "en-US",
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    // umamiAnalytics: {
    // We use an env variable for this site to avoid other users cloning our analytics ID
    // umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    // You may also need to overwrite the script if you're storing data in the US - ex:
    // src: 'https://us.umami.is/script.js'
    // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    // },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    googleAnalytics: {
      googleAnalyticsId: "G-H8B2S3ZDV2", // e.g. G-XXXXXXX
    },
  },
};
