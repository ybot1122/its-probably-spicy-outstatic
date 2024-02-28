import Layout from '@/components/Layout'
import markdownToHtml from '@/lib/markdownToHtml'
import { getDocumentSlugs, load } from 'outstatic/server'
import DateFormatter from '@/components/DateFormatter'
import Image from 'next/image'
import { OstDocument } from 'outstatic'
import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Project = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: {
    slug: string
  }
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const project = await getData()

  if (!project) {
    return {}
  }

  return {
    title: project.recipeName,
    description: project.description,
    openGraph: {
      title: project.recipeName,
      description: project.description,
      type: 'article',
      url: absoluteUrl(`/projects/test`),
      images: [
      ]
    },
  }
}

export default async function Project(params: Params) {
  console.log(params, 'fsf')
  console.log('asb')
  const { recipeName, publishedAt, author, description } = await getData()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5">
        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-square">
              <Image
                alt={recipeName}
                src={'/images/industrial-pattern.png'}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div>
              <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
                {recipeName}
              </h1>
              <div className="hidden md:block md:mb-8 text-slate-600">
                Launched on <DateFormatter dateString={publishedAt} />{' '}
                {`by ${author}`}.
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}

async function getData() {
  return {
    recipeName: 'Classic Sourdough Pancakes or Waffles',
    publishedAt: '2022-09-14T17:55:40.452Z',
    author: 'Head Chef Daisy',
    "description": "With their mild tang, sourdough pancakes are a tasty change from your usual breakfast short stack. You might worry that their flavor will be strong enough to clash with syrup or your other favorite toppings, but no worries: pancakes made with sourdough starter simply taste a bit richer and more nuanced than the norm. And sourdough waffles? They\u0027re perfect for either a drizzle of maple or as the base for savory toppings like fried chicken. \n ",
    "recipeYield": [
        "12 waffles or 24 pan",
        "about  2 dozen medium pancakes or 1 dozen 8\u0022 waffles"
    ],
    "datePublished": "December 31, 2009 at 7:00pm",
    "prepTime": "PT42M",
    "cookTime": "PT0M",
    "totalTime": "PT12H42M",
    "recipeIngredient": [
        "2 cups (240g) King Arthur Unbleached All-Purpose Flour",
        "1 cup (227g) sourdough starter unfed/discard",
        "2 tablespoons (28g) granulated sugar",
        "2 cups (454g) buttermilk",
        "all of the overnight sponge",
        "2 large eggs",
        "1/4 cup (50g) vegetable oil or 4 tablespoons (57g) butter melted",
        "3/4 teaspoon table salt",
        "1 teaspoon baking soda"
    ],
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('projects')
  return posts.map((slug) => ({ slug }))
}
