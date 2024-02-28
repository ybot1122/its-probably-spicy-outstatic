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
  const { recipeName, publishedAt, author, description, images, prepTime, totalTime } = await getData()

  return (
    <Layout>
        <article className="mb-8">
            <div className="relative w-full h-80">
              <Image
                alt={recipeName}
                src={images.hero}
                fill
                className='object-cover'
              />
            </div>
            <div className='grid grid-cols-2'>
              <div className='bg-blue'>
                <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
                  {recipeName}
                </h1>
                <div className="">
                  Recipe by {`${author}`}
                </div>
                <div className="">
                  Published on <DateFormatter dateString={publishedAt} />
                </div>
                <div>
                  {description}
                </div>
                <div className='grid grid-cols-2'>
                  <div className='col-span-1'>
                    <p>Prep Time</p>
                      <p>{prepTime}</p>
                    </div>
                    <div>
                      <p>Total Time</p>
                      <p>{totalTime}</p>
                    </div>
                </div>
              </div>

              <div className='col-span-1'>
                {images.gallery.map((img) => <Image src={img} alt={recipeName} width={200} height={200} key={img} />)}
              </div>
            </div>
        </article>
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
    "prepTime": "42 mins",
    "totalTime": "12 hrs 42 mins",
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
    images: {
      hero: '/images/industrial-pattern.png',
      gallery: [
        '/images/flycream-travel.png',
        '/images/couple-pizza.png',
        '/images/og-image.png'
      ]
    }
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('projects')
  return posts.map((slug) => ({ slug }))
}
