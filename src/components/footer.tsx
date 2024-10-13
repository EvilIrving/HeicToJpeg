const Footer = () => {
  return (
    <footer className="py-4 dark:bg-slate-800 dark:text-white">
      <div className="container mx-auto flex items-center justify-center">
        <p className="mr-2">If you have any questions, please contact me:</p>
        <a
          href="https://twitter.com/@LoseWings"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-primary"
        >
          Twitter
        </a>
        <a
          href="https://t.me/noncain"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-primary"
        >
          Telegram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
