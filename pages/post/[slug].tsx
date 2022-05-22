import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { sanityClient, urlFor } from '../../sanity'
import { FormInputs, PostInterface } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface Props {
  post: PostInterface
}

const PostPage: NextPage<Props> = ({ post }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    title,
    slug,
    description,
    author,
    body,
    mainImage,
    _createdAt,
    localDate,
    comments,
  } = post

  const {
    // register input field'larını submit fonksiyonunun(onSubmit) parametresine register'lamamızı sağlıyor.
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // clientside'dan direk sanity'ye post oluşturması için istek gönderseydik, input değerleri koyduğumuz şartlara uymasa bile bir şekilde
      // istek atılma ihtimali olacaktı, o yüzden daha güvenli olması için kendi api route'umuzdan istek atıyoruz sanırım.
      const response = await (
        await fetch('/api/generateComment', {
          method: 'POST',
          body: JSON.stringify(data),
        })
      ).json

      setIsSubmitted(true)

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="centered-container pt-5 pb-12">
      <img
        className="h-96 w-full object-cover"
        src={urlFor(mainImage).url()}
        alt={slug.current}
      />
      <article>
        <div className="my-7 mb-9">
          <h1 className="mb-3 text-3xl">{title}</h1>
          <p className="mb-2 text-slate-500">{description}</p>
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={urlFor(author.image).url()}
              alt={author.name}
            />
            <div>
              Blog post by{' '}
              <address className="inline text-sm font-bold text-green-600">
                {author.name}
              </address>{' '}
              - Published at <time title={localDate}>{localDate}</time>
            </div>
          </div>
        </div>
        <PortableText
          className="post-body"
          content={body}
          serializers={{
            h2: (props: any) => (
              // bu şekilde props'u geçirince children yani içinde yazan da geçiyor.
              <h2 className="mb-2 text-xl font-semibold" {...props} />
            ),
            li: ({ children }: { children: JSX.Element }) => (
              <li className="text-xl">{children}</li>
            ),
            // for paragraph tag
            normal: ({ children }: { children: JSX.Element }) => (
              <p className="mb-4">{children}</p>
            ),
            // Buraya nasıl custom element ekleneceğini bulamadım, o nedenle global.css'e yazdım.
            mainImage: (props: any) => (
              <figure>
                <img
                  src={urlFor(props.node.asset).width(600).url()}
                  alt={props.node.alt}
                />

                <figcaption>{props.node.caption}</figcaption>
              </figure>
            ),
          }}
          projectId={process.env.NEXT_PUBLIC_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_DATASET}
        />
      </article>

      <hr className="mx-auto my-16 max-w-screen-sm border border-b-2 border-b-indigo-500" />
      {/* Form  */}
      <section className="mx-auto max-w-screen-md">
        <h5 className="text-base font-semibold text-indigo-500">
          Enjoyed this article?
        </h5>
        <p className="text-3xl font-semibold after:mt-2 after:mb-5 after:block after:border after:border-slate-200">
          Leave a comment below!
        </p>
        {isSubmitted ? (
          <section className="space-y-2 rounded bg-indigo-500 p-10 text-white">
            <h5 className="text-3xl font-semibold">
              Thank you for sharing your thoughts with us!
            </h5>
            <p>Once it has been approved, it will appear below!</p>
          </section>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('_id')}
              className="hidden"
              type="text"
              value={post._id}
            />
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              className="mb-6 w-full rounded py-3 px-4 text-slate-700 shadow outline-none ring-gray-200 placeholder:text-slate-400 focus:ring focus:ring-indigo-400"
              type="text"
              placeholder="John Doe"
            />
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              className="mb-6 w-full rounded py-3 px-4 text-slate-700 shadow
            outline-none ring-gray-200 placeholder:text-slate-400 focus:ring focus:ring-indigo-400"
              type="email"
              placeholder="your@email.com"
              id="email"
            />
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              {...register('message', { required: true, min: 3 })}
              className="4laceholder:text-slate-400 mb-6 h-44 w-full rounded py-3 px-4 text-slate-700 shadow outline-none ring-gray-200 focus:ring focus:ring-indigo-400"
              placeholder="Write your comment."
              id="comment"
            />

            <div className="mt-2 mb-2">
              {errors.name && (
                <p className="mb-1 text-sm font-semibold text-rose-600">
                  -{' '}
                  {errors.name.type === 'required'
                    ? 'The Name Field is required!'
                    : 'Name field must be minimum 3 characters!'}
                </p>
              )}
              {errors.email && (
                <p className="mb-1 text-sm font-semibold text-rose-600">
                  -{' '}
                  {errors.email.type === 'required'
                    ? 'The Email Field is required!'
                    : 'Enter a valid email!'}
                </p>
              )}
              {errors.message && (
                <p className="text-sm font-semibold text-rose-600">
                  - The Comment Field is required!
                </p>
              )}
            </div>
            <button
              className="block w-full rounded-md bg-indigo-500 py-2 font-semibold text-white transition-colors hover:bg-indigo-400"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </section>

      {/* Comments */}
      {comments && (
        <section className="mx-auto mt-12 max-w-screen-md rounded p-10  shadow-sm ring-1 ring-gray-200">
          <h5 className="text-3xl font-medium">Comments</h5>
          <hr className="mt-2 mb-5 h-0.5 bg-gray-200" />
          <div className="space-y-2">
            {comments.map(({ _id, name, message }) => (
              <p key={_id}>
                <span className="font-semibold text-indigo-600">{name}: </span>
                {message}
              </p>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == 'post'] {
      _id,
      slug {
        current
      }
    }
  `

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: PostInterface) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: true,
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<{ post: PostInterface }> = async ({
  params,
}) => {
  const { slug } = params as Params
  // Ya da aşağıdaki gibi de yazılabilir ama yukarıdaki daha profesyonel duruyor.
  // const slug = params!.slug as string

  // Groq'a özel _type gibi property'ler yazılabileceği gibi direk post'a özel slug gibi property'ler de başına bir şey konmadan query'e eklenebiliyor.
  // $slug sonrasında fetch fonksiyonunda belirteceğimiz değerin placeholder'ı. Sonuna [0] vererek dönecek olan tek elemanlı array object'e dönüştürülüyor.
  // custom yani post'un normalde içinde olmayan field'ları aşağıdaki gibi '' içinde belirtiyoruz('comments'), bu şekilde alt query olduğu zaman "^" şu anda içinde bulunulan
  // query item'ı anlamına geliyor, neden approved'da da kullanmadık bilmiyorum(?), içinde bulunulan post'u post yazarak direk belirtebiliyoruz(post._ref)(?).
  const query = `
    *[_type == 'post' && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      description,
      slug,
      mainImage,
      author -> {
        name, image
      },
      'comments': *[
        _type == 'comment' &&
        post._ref == ^._id &&
        approved == true
      ],
      body
    }
  `

  const post = (await sanityClient.fetch(query, { slug })) as PostInterface

  if (!post) {
    return {
      notFound: true,
    }
  }

  let localDate

  // React-hydration hatası aldığımız için burada oluşturuluyor.
  if (post._createdAt) {
    localDate = new Date(post._createdAt).toDateString()
  }

  return {
    props: {
      post: { ...post, localDate },
    },
    revalidate: 60,
  }
}
