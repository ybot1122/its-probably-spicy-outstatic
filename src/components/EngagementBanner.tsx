import Link from "next/link";
import Image from "next/image";

/* Social Media Icons https://www.iconfinder.com/social-media-icons*/

const socials = ["facebook", "whatsapp", "youtube", "instagram"];

const EngagementBanner = () => {
  return (
    <section className="grid grid-cols-3 bg-tan">
      <div className="col-span-1"></div>
      <div className="col-span-1">
        <div className="grid grid-cols-2">
          {socials.map((social) => (
            <div className="col-span-1" key={social}>
              <Link href="https://google.com" className="inline-block">
                <Image
                  src={`/images/socials/${social}.svg`}
                  width={64}
                  height={64}
                  alt={`It's Probably Spicy on ${social}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1"></div>
    </section>
  );
};

export { EngagementBanner };
