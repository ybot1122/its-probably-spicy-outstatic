import Layout from "@/components/Layout";
import { getAllRecipes } from "@/lib/getAllRecipes";
import Link from "next/link";
import Image from "next/image";
import { FullHero } from "@/components/FullHero";
import { kalam } from "@/app/fonts";
import { RecipeCard } from "@/components/RecipeCard";
import { HomePageRecipe } from "@/components/HomePageRecipe";

export default async function Index() {
  const { allRecipes } = await getData();

  return (
    <Layout>
      <div className="w-full mt-10">
        <section className="max-w-screen-lg mx-auto px-5">
          <div className="group flex relative w-full aspect-square md:aspect-video mx-auto justify-center">
            <h1 className="absolute z-10 self-end rounded-lg text-xl md:text-3xl p-5 bg-transparentBlack text-center text-white uppercase mb-5 hover:bg-orange transition font-bold">
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
        <section>
          <div className="flex max-w-screen-lg mx-auto items-center mt-10">
            <h1
              className={` text-xl md:text-3xl ${kalam.className} text-left p-5`}
            >
              NEWEST RECIPES
            </h1>

            <span
              className="inline-block grow h-[2px] bg-orange mr-5"
              aria-hidden="true"
            ></span>
          </div>

          <div className="max-w-screen-lg mx-auto px-5 grid grid-cols-4 gap-4">
            {allRecipes
              .slice(0, 4)
              .map(({ title, image, slug, publishedAt }) => (
                <div key={title} className="col-span-4 sm:col-span-2">
                  <HomePageRecipe
                    title={title}
                    slug={slug}
                    image={image}
                    publishedAt={publishedAt}
                  />
                </div>
              ))}

            <div className="col-start-2 col-span-2 text-center">
              <Link
                href="/allRecipes"
                className="inline-block border-orange p-5 border-2 transition hover:bg-orange rounded-lg"
              >
                VIEW ALL RECIPES
              </Link>
            </div>
          </div>
        </section>

        {/*image zoom https://w3bits.com/labs/css-image-hover-zoom/ */}
        <section className={`mt-10 max-w-screen-lg mx-auto`}>
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
