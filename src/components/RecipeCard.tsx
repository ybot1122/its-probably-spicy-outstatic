import { mooli } from "@/app/fonts";
import { RecipeData } from "@/interfaces/recipeData";
import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({
  title,
  slug,
  image,
}: {
  title: RecipeData["recipeName"];
  slug: string;
  image: RecipeData["images"]["hero"];
}) => {
  return (
    <div className={`mb-5 bg-tan`}>
      <div className="w-full aspect-square border-orange px-5 pt-5">
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
        <h2
          className={`mt-5 text-2xl font-semibold p-2 text-center ${mooli.className}`}
        >
          <Link href={`/recipes/${slug}`}>{title}</Link>
        </h2>
        <p className="text-center px-5 mb-5">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
    </div>
  );
};

export { RecipeCard };
