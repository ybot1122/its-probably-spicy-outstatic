import Image from "next/image";

const FullHero = ({
  alt,
  src,
  title,
}: {
  alt: string;
  src: string;
  title: string;
}) => {
  return (
    <section className="relative w-full h-recipeHero mb-10">
      <div className="relative w-full h-full before:absolute before:block before:w-full before:h-full before:z-10 before:bg-recipeHeroScrim">
        <Image alt={alt} src={src} fill className="object-cover" />
      </div>
      <div className="absolute h-full top-0 left-[50%] translate-x-[-50%] w-full max-w-screen-xl mx-auto z-20">
        <h1 className="relative top-[50%] translate-y-[-50%] font-primary text-4xl font-bold p-20 text-white z-20 max-w-[1000px] text-center lg:text-left">
          {title}
        </h1>
      </div>
    </section>
  );
};

export { FullHero };
