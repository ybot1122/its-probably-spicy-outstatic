import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="layout flex items-center justify-between py-4 bg-tan px-10">
      <Link href="/">
        <Image
          src="/images/ITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.png"
          width={150}
          height={150}
          alt="It's Always Spicy"
          className="inline-block"
        />
      </Link>
      <ul className="flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base">
        <li className="hover:border-b-2 border-orange p-5">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/#posts" className="hover:underline">
            Posts
          </Link>
        </li>
        <li>
          <Link href="/#projects" className="hover:underline">
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
