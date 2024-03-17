import Layout from "@/components/Layout";
import { getAllRecipes } from "@/lib/getAllRecipes";
import DateFormatter from "@/components/DateFormatter";
import Image from "next/image";
import { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import { getRecipe } from "@/lib/getRecipe";
import { RecipeData } from "@/interfaces/recipeData";
import { IMAGE_PATH } from "@/lib/imagePath";
import { FullHero } from "@/components/FullHero";

export interface Params {
  params: {
    slug: string;
  };
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const recipeData = await getData(params.params.slug);

  if (!recipeData) {
    return {};
  }

  return {
    title: recipeData.recipeName,
    description: recipeData.description,
    openGraph: {
      title: recipeData.recipeName,
      publishedTime: recipeData.publishedAt,
      authors: [recipeData.author],
      type: "article",
      description: recipeData.description,
    },
    /* TODO
    keywords: ['test']
    */
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
        <FullHero
          alt={recipeName}
          src={IMAGE_PATH + images.hero}
          title={recipeName}
        />
        <section className="grid grid-cols-2 max-w-screen-xl mx-auto">
          <div className="bg-white ml-5 mr-5 col-span-2 md:col-span-1 text-center lg:text-left lg:ml-20 lg:mr-0">
            <div className={`mb-10 text-sm `}>
              <span className="inline-block border-r-2 border-orange pr-5">
                Recipe by {`${author}`}
              </span>
              <span className="pl-5">
                <DateFormatter dateString={publishedAt} />
              </span>
            </div>
            <div className="lg:pr-10 mb-10 text-xl leading-relaxed text-left">
              {description}
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 mb-10">
              <div className="col-span-1">
                <p>Prep Time</p>
                <p className="text-xl">{prepTime}</p>
              </div>
              <div className="col-span-1">
                <p>Total Time</p>
                <p className="text-xl">{totalTime}</p>
              </div>
              <div className="col-span-1">
                <p>Yield</p>
                <p className="text-xl">{totalYield}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 ml-5 mr-5 mb-10 lg:ml-0 lg:mr-20 md:col-span-1">
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
            <div className="col-span-4 md:col-span-3 md:bg-white md:p-10 lg:px-20">
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
  const recipes = await getAllRecipes();
  return recipes.map(({ slug }) => ({ slug }));
}
