import Layout from "@/components/Layout";
import { getAllRecipes } from "@/lib/getAllRecipes";
import DateFormatter from "@/components/DateFormatter";
import Image from "next/image";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { libre_baskerville } from "@/app/fonts";
import ImageGallery from "@/components/ImageGallery";
import { getRecipe } from "@/lib/getRecipe";
import { RecipeData } from "@/interfaces/recipeData";
import { IMAGE_PATH } from "@/lib/imagePath";

export interface Params {
  params: {
    slug: string;
  };
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const project = await getData(params.params.slug);

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

export default async function Recipe(params: Params) {
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
  } = await getData(params.params.slug);

  return (
    <Layout>
      <article className="mb-8">
        <div className="relative w-full h-recipeHero mb-10">
          <div className="relative w-full h-full before:absolute before:block before:w-full before:h-full before:z-10 before:bg-recipeHeroScrim">
            <Image
              alt={recipeName}
              src={IMAGE_PATH + images.hero}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute h-full top-0 left-[50%] translate-x-[-50%] w-full max-w-screen-xl mx-auto z-20">
            <h1 className="relative top-[50%] translate-y-[-50%] font-primary text-6xl font-bold p-20 text-white z-20 max-w-[1000px] text-center lg:text-left">
              {recipeName}
            </h1>
          </div>
        </div>

        <section className="grid grid-cols-2 max-w-screen-xl mx-auto">
          <div className="bg-white ml-5 mr-5 col-span-2 lg:col-span-1 text-center lg:text-left lg:ml-20 lg:mr-0">
            <div className={`mb-10 text-sm ${libre_baskerville.className}`}>
              <span className="inline-block border-r-2 border-orange pr-5">
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
            <div className="border-t-2 border-orange mt-5 pt-5 mb-10 lg:mr-10">
              <p>Yield</p>
              <p className="text-xl">{totalYield}</p>
            </div>
          </div>
          <div className="col-span-2 ml-5 mr-5 mb-10 lg:ml-0 lg:mr-20 lg:col-span-1">
            <ImageGallery
              images={images.gallery.map((img) => ({
                src: IMAGE_PATH + img,
                alt: recipeName,
              }))}
            />
          </div>
        </section>

        {/* Ingredients and Instructions */}
        <section className="bg-tan">
          <div className="grid grid-cols-4 p-5 max-w-screen-xl mx-auto lg:p-20">
            <div className="col-span-4 md:col-span-1">
              <h2 className="text-xl mb-5 mt-10">Ingredients</h2>
              <ul className="ml-5" role="list">
                {recipeIngredients.map((ingredient, ind) => (
                  <li
                    key={ind}
                    className="mb-5 mr-5 before:w-[10px] before:h-[1px] before:bg-orange before:inline-block before:absolute before:mt-3 before:ml-[-1rem]"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 md:col-span-3 bg-white p-10 lg:pl-20 lg:pr-20">
              <h2 className="text-xl mb-5">Instructions</h2>
              <ol
                className="list-decimal list-inside"
                key="recipe-instructions"
              >
                {recipeInstructions.map((step, ind) => (
                  <li key={`instruction-${ind}`} className="mb-10">
                    {step.text}
                    {step.image && (
                      <Image
                        src={IMAGE_PATH + step.image}
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

async function getData(slug: string) {
  const recipe = getRecipe(slug);

  return recipe as RecipeData;
}

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((slug) => ({ slug }));
}
