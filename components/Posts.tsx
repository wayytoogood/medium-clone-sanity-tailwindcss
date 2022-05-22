import { PostInterface } from '../typings'
import { Post } from './Post'

interface PostsProps {
  posts: PostInterface[]
}

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <section className="centered-container my-12 grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
      {posts.map(
        (post): JSX.Element => (
          <Post post={post} />
        )
      )}
    </section>
  )
}
