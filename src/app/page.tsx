import Layout from "@/components/Layout";
import { load } from "outstatic/server";
import ContentGrid from "../components/ContentGrid";
import markdownToHtml from "../lib/markdownToHtml";
import { getAllRecipes } from "@/lib/getAllRecipes";
import Link from "next/link";
import Image from "next/image";
import { FullHero } from "@/components/FullHero";
import { libre_baskerville, kalam } from "@/app/fonts";
import { IMAGE_PATH } from "@/lib/imagePath";

const TEMP = [
  "IMG_3320.jpg",
  "IMG_3438.jpg",
  "IMG_3429.jpg",
  "IMG_3440.jpg",
  "IMG_3320.jpg",
  "IMG_3438.jpg",
  "IMG_3429.jpg",
  "IMG_3440.jpg",
];

export default async function Index() {
  const { allRecipes } = await getData();

  return (
    <Layout>
      <div className="w-full mt-10">
        <section className="max-w-screen-lg mx-auto px-5">
          <h1
            className={`max-w-screen-sm mx-auto text-xl md:text-3xl ${kalam.className} text-center py-5`}
          >
            FEATURED RECIPE
          </h1>

          <div className="group flex relative max-w-screen-sm w-full aspect-video mx-auto justify-center">
            <h1 className="absolute z-10 self-end rounded-lg text-xl md:text-3xl p-5 bg-transparentBlack text-center text-white uppercase mb-5 hover:bg-orange transition">
              {" "}
              <Link href="/recipes/demo-for-daisy">Shiomi Skippers Burger</Link>
            </h1>
            <Image
              src="/images/IMG_3328.jpg"
              fill
              alt="Head Chef Daisy"
              className="rounded-lg object-cover shadow-3xl"
            />{" "}
          </div>
        </section>

        {/*image zoom https://w3bits.com/labs/css-image-hover-zoom/ */}
        <section className={`${libre_baskerville.className} `}>
          <div className="flex max-w-screen-lg mx-auto items-center mt-20">
            <h1
              className={` text-xl md:text-3xl ${kalam.className} text-left p-5`}
            >
              MORE RECIPES
            </h1>

            <span
              className="inline-block grow h-[2px] bg-orange mr-5"
              aria-hidden="true"
            ></span>
          </div>

          <div className="max-w-screen-lg mx-auto px-5 grid grid-cols-4 gap-4">
            {allRecipes.slice(0, 4).map(({ title, image, slug }) => (
              <div className="col-span-2 md:col-span-1 mb-5 bg-tan" key={title}>
                <div className="w-full aspect-square border-orange p-2">
                  <div className="relative w-full aspect-square">
                    <Link href={`/recipes/${slug}`}>
                      <Image
                        src={IMAGE_PATH + image}
                        fill
                        alt={title}
                        className="object-cover"
                      />
                    </Link>
                  </div>
                </div>
                <div className="grid place-items-center pb-2">
                  <h2>
                    <Link href={`/recipes/${slug}`}>{title}</Link>
                  </h2>
                </div>
              </div>
            ))}

            <div className="col-start-2 col-span-2 text-center">
              <Link
                href="/"
                className="inline-block border-orange p-5 border-2 transition hover:bg-orange rounded-lg"
              >
                VIEW ALL RECIPES
              </Link>
            </div>
          </div>
        </section>

        {/*image zoom https://w3bits.com/labs/css-image-hover-zoom/ */}
        <section
          className={`${libre_baskerville.className} mt-20 max-w-screen-lg mx-auto`}
        >
          <FullHero
            src="/images/granola.jpg"
            alt="World's Best Granola"
            title="Looking for the World's Best Granola?"
          />
        </section>
      </div>
    </Layout>
  );
}

async function getData() {
  const allRecipes = await getAllRecipes();

  return {
    allRecipes,
  };
}
