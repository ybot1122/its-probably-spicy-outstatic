import Layout from "../components/Layout";
import { load } from "outstatic/server";
import ContentGrid from "../components/ContentGrid";
import markdownToHtml from "../lib/markdownToHtml";
import { getAllRecipes } from "@/lib/getAllRecipes";
import Link from "next/link";
import Image from "next/image";
import { FullHero } from "@/components/FullHero";

export default async function Index() {
  const { allRecipes } = await getData();

  return (
    <Layout>
      <FullHero
        alt="New Recipe Now Available"
        src="/images/IMG_3320.jpg"
        title={"New Recipe Now Available"}
      />

      <div className="max-w-screen-lg mx-auto">
        <div>
          {allRecipes.map((slug) => (
            <p key={slug}>
              <Link href={`recipes/${slug}`}>{slug}</Link>
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}

async function getData() {
  const allRecipes = getAllRecipes();

  return {
    allRecipes,
  };
}
