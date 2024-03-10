import Link from "next/link";
import Image from "next/image";
import { dosis } from "@/app/fonts";

/* Social Media Icons https://www.iconfinder.com/social-media-icons*/

const socials = ["facebook", "whatsapp", "instagram", "youtube"];

const Footer = () => {
  return (
    <footer className={`bg-tan ${dosis.className}`}>
      <div className="grid grid-cols-3 max-w-screen-lg mx-auto items-center">
        <div className="col-span-3 md:col-span-1 p-10 border-b md:border-b-0 border-silver">
          <p className="mb-5">
            Get our best recipes, grocery finds, and clever kitchen tips
            delivered to your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="p-2 grow"
            />
            <button type="submit" className="p-2 bg-orange font-bold">
              GO
            </button>
          </form>
        </div>
        <div className="col-span-3 md:col-span-1 text-center px-10 py-10 md:py-0 border-b md:border-b-0 border-silver">
          <p className=" italic">Follow Us</p>
          {socials.map((social) => (
            <Link
              href="https://google.com"
              className="inline-block m-2"
              key={social}
            >
              <Image
                src={`/images/socials/${social}.svg`}
                width={28}
                height={28}
                alt={`It's Probably Spicy on ${social}`}
              />
            </Link>
          ))}
        </div>
        <div className="col-span-3 md:col-span-1 p-10 text-xs italic text-center">
          &#169; It's Probably Spicy 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
