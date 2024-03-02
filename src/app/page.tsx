import Layout from "../components/Layout";
import { load } from "outstatic/server";
import ContentGrid from "../components/ContentGrid";
import markdownToHtml from "../lib/markdownToHtml";
import { getAllRecipes } from "@/lib/getAllRecipes";
import Link from "next/link";

export default async function Index() {
  const { allRecipes } = await getData();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5">
        <section className="mt-16 mb-16 md:mb-12">
          <h1>All Recipes</h1>
        </section>
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
