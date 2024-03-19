import Layout from "@/components/Layout";
import Image from "next/image";
import { kalam } from "@/app/fonts";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/getAllRecipes";
import { Metadata } from "next";
import { RecipeFinder } from "../recipes/[slug]/RecipeFinder";
import { AllRecipesMain } from "../recipes/[slug]/AllRecipesMain";

export const metadata: Metadata = {
  title: "Recipes",
};

export default async function AllRecipes() {
  const { allRecipes } = await getData();

  const content = [];

  allRecipes.map(({ title, slug, image }) =>
    content.push(
      <div className="col-span-3 sm:col-span-1" key={slug}>
        <RecipeCard title={title} slug={slug} image={image} />
      </div>,
    ),
  );

  for (let i = 0; i <= 20; i++) {
    content.push(
      <div className="col-span-3 sm:col-span-1" key={"Recipe-" + i}>
        <RecipeCard
          title={"Recipe Title " + i}
          slug={"/"}
          image={"98839941-d228-4593-a5e4-5ed472c92932.jpg"}
        />
      </div>,
    );
  }

  return (
    <Layout>
      <section className={`px-5 mt-10 mb-20`}>
        <input
          type="text"
          placeholder="Search Recipes"
          className="mb-5 bg-silver p-3 w-full rounded-full max-w-sm block mx-auto"
        ></input>

        <AllRecipesMain content={content} />
      </section>
    </Layout>
  );
}

async function getData() {
  const allRecipes = await getAllRecipes();

  return {
    allRecipes,
  };
}
