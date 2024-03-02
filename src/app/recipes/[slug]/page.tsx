import Layout from "@/components/Layout";
import { getDocumentSlugs } from "outstatic/server";
import DateFormatter from "@/components/DateFormatter";
import Image from "next/image";
import { OstDocument } from "outstatic";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { libre_baskerville } from "@/app/fonts";
import ImageGallery from "@/components/ImageGallery";

type Project = {
  tags: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const project = await getData();

  if (!project) {
    return {};
  }

  return {
    title: project.recipeName,
    description: project.description,
    openGraph: {
      title: project.recipeName,
      description: project.description,
      type: "article",
      url: absoluteUrl(`/projects/test`),
      images: [],
    },
  };
}

export default async function Project(params: Params) {
  const {
    recipeName,
    publishedAt,
    author,
    description,
    images,
    prepTime,
    totalTime,
    totalYield,
    recipeIngredients,
    recipeInstructions,
  } = await getData();

  return (
    <Layout>
      <article className="mb-8">
        <div className="relative w-full h-recipeHero mb-10">
          <div className="relative w-full h-full before:absolute before:block before:w-full before:h-full before:z-10 before:bg-recipeHeroScrim">
            <Image
              alt={recipeName}
              src={images.hero}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute h-full top-0 left-0">
            <h1 className="relative top-[50%] translate-y-[-50%] font-primary text-6xl font-bold p-20 text-white z-20 max-w-[1000px]">
              {recipeName}
            </h1>
          </div>
        </div>

        <section className="grid grid-cols-2 max-w-screen-xl mx-auto">
          <div className="bg-white ml-5 mr-5 col-span-2 lg:col-span-1 text-center lg:text-left lg:ml-20 lg:mr-0">
            <div className={`mb-10 text-sm ${libre_baskerville.className}`}>
              <span className="inline-block border-r-2 border-silver pr-5">
                Recipe by {`${author}`}
              </span>
              <span className="pl-5">
                <DateFormatter dateString={publishedAt} />
              </span>
            </div>
            <div className="pr-10 mb-10 text-xl leading-loose text-center lg:text-left">
              {description}
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <p>Prep Time</p>
                <p className="text-xl">{prepTime}</p>
              </div>
              <div>
                <p>Total Time</p>
                <p className="text-xl">{totalTime}</p>
              </div>
            </div>
            <div className="border-t-2 border-silver mt-5 pt-5 mb-10">
              <p>Yield</p>
              <p className="text-xl">{totalYield}</p>
            </div>
          </div>
          <div className="col-span-2 mr-20 lg:col-span-1">
            <ImageGallery
              images={images.gallery.map((img) => ({
                src: img,
                alt: recipeName,
              }))}
            />
          </div>
        </section>

        {/* Ingredients and Instructions */}
        <section className="bg-tan">
          <div className="grid grid-cols-4 p-20 max-w-screen-xl mx-auto">
            <div className="col-span-1">
              <h2 className="text-xl mb-5 mt-10">Ingredients</h2>
              <ul>
                {recipeIngredients.map((ingredient, ind) => (
                  <li key={ind} className="mb-5 mr-5">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 bg-white p-10">
              <h2 className="text-xl mb-5">Instructions</h2>
              <ol className="list-decimal" key="recipe-instructions">
                {recipeInstructions.map((step, ind) => (
                  <li key={`instruction-${ind}`} className="">
                    {step.text}
                    {step.image && (
                      <Image
                        src={step.image}
                        alt={`${recipeName} step ${ind + 1}`}
                        width={50}
                        height={50}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

async function getData() {
  return {
    recipeName: "Classic Sourdough Pancakes or Waffles",
    publishedAt: "2022-09-14T17:55:40.452Z",
    author: "Head Chef Daisy",
    description:
      "With their mild tang, sourdough pancakes are a tasty change from your usual breakfast short stack. You might worry that their flavor will be strong enough to clash with syrup or your other favorite toppings, but no worries: pancakes made with sourdough starter simply taste a bit richer and more nuanced than the norm. And sourdough waffles? They\u0027re perfect for either a drizzle of maple or as the base for savory toppings like fried chicken. \n ",
    datePublished: "December 31, 2009 at 7:00pm",
    prepTime: "42 mins",
    totalTime: "12 hrs 42 mins",
    totalYield: 'about 2 dozen medium pancakes or 1 dozen 8" waffles',
    recipeIngredients: [
      "2 cups (240g) King Arthur Unbleached All-Purpose Flour",
      "1 cup (227g) sourdough starter unfed/discard",
      "2 tablespoons (28g) granulated sugar",
      "2 cups (454g) buttermilk",
      "all of the overnight sponge",
      "2 large eggs",
      "1/4 cup (50g) vegetable oil or 4 tablespoons (57g) butter melted",
      "3/4 teaspoon table salt",
      "1 teaspoon baking soda",
    ],
    recipeInstructions: [
      {
        text: "To make the overnight sponge: Stir down your refrigerated starter, and remove 1 cup (227g). Note: This is a good opportunity to feed the remainder, if necessary.",
        image: null,
      },
      {
        text: "In a large bowl, stir together the 1 cup (227g) unfed starter, flour, sugar, and buttermilk.",
        image: "/images/couple-pizza.png",
      },
      {
        text: "Cover and let rest at cool room temperature (about 65°F to 70°F) for about 12 hours, or overnight.",
        image: "/images/flycream-travel.png",
      },
      {
        text: "To make the batter: In a small bowl or mixing cup, beat together the eggs, and oil or butter. Add to the overnight sponge, stirring just to combine.",
        image: null,
      },
      {
        text: "Add the salt and baking soda, stirring to combine. The batter will expand and may bubble a bit.",
        image: "/images/flycream-travel.png",
      },
      {
        text: "To make pancakes: Pour the batter by the 1/4-cupful onto a preheated, lightly greased griddle. Cook until bubbles form and pop on the top side of the pancakes, then turn over and cook until browned underneath.",
        image: "/images/flycream-travel.png",
      },
      {
        text: "To make waffles: Pour the batter onto your preheated, greased waffle iron, and bake according to the manufacturer's instructions. Repeat with the remaining batter.",
        image: "/images/flycream-travel.png",
      },
      {
        text: "Serve pancakes or waffles immediately, with your favorite toppings; or hold in a warm oven until ready to serve.",
        image: null,
      },
      {
        text: "Storage instructions: Store any leftovers in the refrigerator for a day or two; freeze for longer storage.",
        image: null,
      },
    ],
    images: {
      hero: "/images/Yellow-Banana-Bread_Hero_0530.jpg",
      gallery: [
        "/images/flycream-travel.png",
        "/images/couple-pizza.png",
        "/images/og-image.png",
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("projects");
  return posts.map((slug) => ({ slug }));
}
