"use client";

import { dosis } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <li className={`group relative md:text-center uppercase`}>
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
    { text: "About", href: "/about" },
    { text: "Recipes", href: "/allRecipes" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`bg-tan dark:bg-tan h-navHeight ${dosis.className}`}>
      <div className="grid grid-cols-2 py-4 mx-auto max-w-screen-lg h-full">
        <div>
          <Link href="/">
            <Image
              src="/images/ITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.png"
              width={130}
              height={130}
              alt="It's Always Spicy"
              className="inline-block ml-5 mr-5"
            />
          </Link>
        </div>

        <div className="md:hidden justify-self-end flex mr-5">
          <button
            className=" rounded-full hover:bg-silver p-2 self-center"
            onClick={() => setNavOpen(!navOpen)}
          >
            <Image
              src="/images/icons8-menu.svg"
              width={25}
              height={25}
              alt={"Navigation Menu"}
            />
          </button>
        </div>

        <div className="flex col-start-2 justify-end">
          <ul
            className={`${!navOpen ? "hidden" : ""} absolute md:mr-5 md:static max-md:animate-slideIn md:flex w-1/2 md:w-auto z-40 bg-tan items-center justify-between md:space-x-4 text-2xl`}
          >
            {navItems.map(({ text, href }) => (
              <NavItem text={text} href={href} key={text} />
            ))}
          </ul>
        </div>
      </div>

      {/*navOpen && (
        <ul
          className={`absolute flex md:hidden items-center justify-between space-x-3 text-2xl w-full z-30 animate-slideIn bg-tan`}
        >
          {navItems.map(({ text, href }) => (
            <NavItem text={text} href={href} key={text} />
          ))}
        </ul>
          )*/}
    </nav>
  );
};

export default Header;
