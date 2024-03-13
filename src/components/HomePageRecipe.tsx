import { mooli } from "@/app/fonts";
import { RecipeData } from "@/interfaces/recipeData";
import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";
import Link from "next/link";

const HomePageRecipe = ({
  title,
  slug,
  image,
}: {
  title: RecipeData["recipeName"];
  slug: string;
  image: RecipeData["images"]["hero"];
}) => {
  return (
    <div className={`mb-5 bg-orange`}>
      <div className="relative w-full aspect-square px-5 pt-5">
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
        <h2 className="absolute bottom-20 left-10 bg-tan text-2xl px-2">
          {" "}
          <Link href={`/recipes/${slug}`}>{title}</Link>
        </h2>
      </div>
    </div>
  );
};

export { HomePageRecipe };
