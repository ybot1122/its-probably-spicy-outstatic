import Layout from "../components/Layout";
import { load } from "outstatic/server";
import ContentGrid from "../components/ContentGrid";
import markdownToHtml from "../lib/markdownToHtml";
import { getAllRecipes } from "@/lib/getAllRecipes";
import Link from "next/link";
import Image from "next/image";
import { FullHero } from "@/components/FullHero";
import { libre_baskerville, kalam } from "@/app/fonts";
import { EngagementBanner } from "@/components/EngagementBanner";

export default async function Index() {
  const { allRecipes } = await getData();

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto px-5 mt-10">
        <section>
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
        <section className={`${kalam.className} text-3xl font-light mt-20`}>
          <div className="relative float-right w-[128px] h-[128px] m-2">
            <Image
              src="/images/daisy.jpeg"
              fill
              alt="Head Chef Daisy"
              className="rounded-full object-cover"
            />
          </div>
          <p>
            I hope you enjoy my delicious recipes. We have so many different{" "}
            <span className="text-orange font-semibold">flavors</span>, hope you
            get to try them all!
          </p>
          <span className={`block mt-10`}>~ Head Chef Daisy</span>
        </section>

        <section
          className={`mt-20 ${libre_baskerville.className} grid grid-cols-4 gap-2`}
        >
          <div className="relative w-full h-[250px] col-span-2 md:col-span-1">
            <Image
              src="/images/IMG_3320.jpg"
              fill
              alt="Head Chef Daisy"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] col-span-2 md:col-span-1">
            <Image
              src="/images/IMG_3438.jpg"
              fill
              alt="Head Chef Daisy"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] col-span-2 md:col-span-1">
            <Image
              src="/images/IMG_3429.jpg"
              fill
              alt="Head Chef Daisy"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] col-span-2 md:col-span-1">
            <Image
              src="/images/IMG_3440.jpg"
              fill
              alt="Head Chef Daisy"
              className="rounded-lg object-cover"
            />
          </div>
        </section>

        <div className="mt-20">
          {allRecipes.map((slug) => (
            <p key={slug}>
              <Link href={`recipes/${slug}`}>{slug}</Link>
            </p>
          ))}
        </div>
      </div>
      <EngagementBanner />
    </Layout>
  );
}

async function getData() {
  const allRecipes = getAllRecipes();

  return {
    allRecipes,
  };
}
