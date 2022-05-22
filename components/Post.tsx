import { PostInterface } from '../typings'
import Link from 'next/link'
import { urlFor } from '../sanity'
import Image from 'next/image'

interface PostProps {
  post: PostInterface
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { author, description, mainImage, slug, title } = post

  return (
    <Link href={`/post/${slug.current}`}>
      <article className="group cursor-pointer overflow-hidden rounded-md border shadow-sm transition-shadow duration-300 hover:shadow-md">
        <img
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={urlFor(mainImage).url()}
          alt={slug.current}
        />
        <div className="flex items-center justify-between p-5">
          <div className="w-9/12">
            <h3 className="mb-1 text-lg font-semibold">{title}</h3>
            <p className="text-sm">
              {description} by{' '}
              <span className="text-xs font-bold text-slate-700">
                {author.name}
              </span>
            </p>
          </div>
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={urlFor(author.image).url()}
            alt={author.name}
          />
        </div>
      </article>
    </Link>
  )
}
