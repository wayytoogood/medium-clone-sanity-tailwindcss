import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Posts } from '../components/Posts'
import { sanityClient } from '../sanity'
import { PostInterface } from '../typings'

interface HomeProps {
  posts: PostInterface[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  console.log(posts)

  return (
    <>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Posts posts={posts} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const query = `
    *[_type == 'post'] {
      _id,
      title,
      description,
      slug,
      mainImage,
      author -> {
         name, image
      }
    }
  `

  const posts = await sanityClient.fetch(query)

  return {
    props: { posts },
    revalidate: 60,
  }
}
