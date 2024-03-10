import Layout from "@/components/Layout";
import Image from "next/image";
import { kalam } from "@/app/fonts";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/getAllRecipes";

const categories = [
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "instant pot",
    subcategories: ["easy", "fast", "10 ingredients or less", "comfort"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
];

export default async function AllRecipes() {
  const { allRecipes } = await getData();

  const content = [];

  allRecipes.map(({ title, slug, image }) =>
    content.push(
      <div className="col-span-1" key={slug}>
        <RecipeCard title={title} slug={slug} image={image} />
      </div>,
    ),
  );

  for (let i = 0; i <= 20; i++) {
    content.push(
      <div className="col-span-1" key={"Recipe-" + i}>
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
      <section className={`px-5 mt-20 mb-20`}>
        <div className="flex">
          <div className="w-[240px] border-r border-orange pr-2 shrink-0">
            <input
              type="text"
              placeholder="Search Recipes"
              className="mb-5 bg-silver p-3 w-full rounded-full"
            ></input>
            All Recipes (1,325)
            <ul className="pl-5">
              {categories.map(({ category, subcategories }) => (
                <li key={category}>
                  {category}

                  <ul className="pl-5 list-disc">
                    {subcategories.map((subcategory) => (
                      <li key={subcategory}>{subcategory}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="grow grid grid-cols-3 gap-2 ml-4">{content}</div>
        </div>
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
