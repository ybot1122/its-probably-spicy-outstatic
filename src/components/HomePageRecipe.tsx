import { RecipeData } from "@/interfaces/recipeData";
import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "./DateFormatter";

const HomePageRecipe = ({
  title,
  slug,
  image,
  publishedAt,
}: {
  title: RecipeData["recipeName"];
  slug: string;
  image: RecipeData["images"]["hero"];
  publishedAt: RecipeData["publishedAt"];
}) => {
  return (
    <div className="relative w-full aspect-square">
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
      <div className="absolute bottom-5 left-5">
        <h2 className="inline-block left-10 bg-orange text-sm px-2 font-bold mb-2">
          <DateFormatter dateString={publishedAt} />
        </h2>
        <h2 className="bg-silver text-2xl px-2 font-bold w-[100%]">
          {" "}
          <Link href={`/recipes/${slug}`}>{title}</Link>
        </h2>
      </div>
    </div>
  );
};

export { HomePageRecipe };
