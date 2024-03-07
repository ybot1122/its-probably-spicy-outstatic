import Image from "next/image";
import Link from "next/link";

const NavItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <li className="group relative text-center">
      <Link href={href} className="block p-5">
        {text}
      </Link>
      <span
        className="opacity-0 transition-opacity ease-in duration-300 group-hover:opacity-100 block w-full h-[2px] bg-orange b-0"
        aria-hidden="true"
      ></span>
    </li>
  );
};

const Header = () => {
  const navItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/" },
    { text: "Recipes", href: "/" },
    { text: "Contact", href: "/" },
  ];

  return (
    <nav className="bg-tan">
      <div className="layout flex items-center justify-between py-4 px-10 mx-auto max-w-screen-lg">
        <Link href="/">
          <Image
            src="/images/ITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.png"
            width={150}
            height={150}
            alt="It's Always Spicy"
            className="inline-block"
          />
        </Link>
        <ul className="flex items-center justify-between space-x-3 md:space-x-4 md:text-base">
          {navItems.map(({ text, href }) => (
            <NavItem text={text} href={href} key={text} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
