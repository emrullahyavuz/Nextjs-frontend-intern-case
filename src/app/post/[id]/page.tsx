import Advertisement from '@/components/Advertisement';
import EditPost from '@/components/EditPost';
import Header from '@/components/Header';
import ShareButtons from '@/components/ShareButtons';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

async function getBlogPost(id: string) {
  try {
    const post = await prisma.blog.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        title: true,
        category: true,
        author: true,
        date: true,
        image: true,
        content: true
      }
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function checkUserAuth() {
  const cookieStore = cookies();
  if (!cookieStore) return false;
  // Authentication logic goes here. 
  return true;
}

type PageProps = {
  params: { id: string },
  searchParams?: { key: string | string[] | undefined };
}

export default async function SinglePost({ params }: PageProps) {
  const post = await getBlogPost(params.id);
  const isLoggedIn = await checkUserAuth();

  if (!post) {
    return <div>Post not found</div>;
  }

  const dateObj = new Date(post.date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  const authorImage = `/images/blog-pictures/${post.author.toLowerCase().replace(' ', '-')}.png`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {isLoggedIn && <EditPost post={post} />}
          <div className="text-left space-y-4">
            <span className="inline-block text-white bg-[#4B6BFB] text-sm font-light rounded-lg px-3 py-1">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white w-[80%]">{post.title}</h1>
            <div className="flex items-center justify-start space-x-4 text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-x-2">
                <div className="relative w-10 h-10">
                  <Image
                    src={authorImage}
                    alt={post.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <span>{post.author}</span>
              </div>
              <span className='inline-block !ml-6'>{formattedDate}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <article className="prose max-w-none space-y-8">
            <div className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>No content available</p>
              )}
            </div>
          </article>

          {/* Add the rest of the article content here */}

          <Advertisement />
          <ShareButtons title={post.title} />
        </div>
      </div>
    </div>
  );
}