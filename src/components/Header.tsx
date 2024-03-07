"use client";

import { dosis } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <li className={`group relative text-center`}>
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
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/" },
    { text: "Recipes", href: "/" },
    { text: "Contact", href: "/" },
  ];

  return (
    <nav className={`bg-tan h-navHeight ${dosis.className}`}>
      <div className="flex flex-wrap items-center justify-between py-4 pl-5 pr-10 mx-auto max-w-screen-lg h-full">
        <Link href="/">
          <Image
            src="/images/ITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.png"
            width={130}
            height={130}
            alt="It's Always Spicy"
            className="inline-block"
          />
        </Link>

        <button
          className="md:hidden rounded-full hover:bg-silver p-2"
          onClick={() => setNavOpen(!navOpen)}
        >
          <Image
            src="/images/icons8-menu.svg"
            width={25}
            height={25}
            alt={"Navigation Menu"}
          />
        </button>

        <div className="basis-full h-0 md:hidden" />

        <ul className="hidden md:flex items-center justify-between space-x-3 md:space-x-4 md:text-base">
          {navItems.map(({ text, href }) => (
            <NavItem text={text} href={href} key={text} />
          ))}
        </ul>
      </div>

      {navOpen && (
        <ul
          className={`absolute flex md:hidden items-center justify-between space-x-3 md:text-base w-full z-30 animate-slideIn bg-tan`}
        >
          {navItems.map(({ text, href }) => (
            <NavItem text={text} href={href} key={text} />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Header;
