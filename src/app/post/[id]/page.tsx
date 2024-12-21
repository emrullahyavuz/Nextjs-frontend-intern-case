import Advertisement from '@/components/Advertisement';
import EditPost from '@/components/EditPost';
import Header from '@/components/Header';
import ShareButtons from '@/components/ShareButtons';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

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


async function checkUserAuth() {  // fonksiyon ismini daha uygun bir şekilde değiştirdik
  const cookieStore = cookies();
 if (!cookieStore) return false;
 return true;
}

export default async function SinglePost({ params }: { params: { id: string } }) {
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
  console.log(post.content)
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
        {isLoggedIn && <EditPost post={post} />}
          {/* Header bölümü - mevcut kod */}
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

          {/* Ana görsel - mevcut kod */}
          <div className="relative w-full h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Blog İçeriği - Yeni Bölüm */}

          <article className="prose max-w-none space-y-8">
          <div className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>No content available</p>
            )}
          </div>
        </article>

          <article className="prose max-w-none space-y-8">
            {/* Giriş Paragrafı */}
            <div className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
              <p>
                Traveling is an enriching experience that opens up new horizons, exposes us to different 
                cultures, and creates memories that last a lifetime. However, traveling can also be 
                stressful and overwhelming, especially if you don't plan and prepare adequately.
              </p>
            </div>

            {/* Ana Bölümler */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research Your Destination</h2>
              <p className="text-gray-600 dark:text-gray-200">
              Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.
              <br/>
              <br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.
              </p>
            </section>

            

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Plan Your Itinerary</h2>
              <p className="text-gray-600 dark:text-gray-200">
              While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.
              <br/>
              <br/> 

              Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
              </p>
              {/* Alıntı Bölümü */}
            <blockquote className="my-8 p-8 rounded-lg border-l-4 text-lg font-normal bg-[#F6F6F7] dark:bg-gray-800 italic text-gray-700 dark:text-gray-200">
              " Traveling can expose you to new environments and potential health risks, so it's crucial 
              to take precautions to stay safe and healthy. "
            </blockquote>
            </section>

            <div className="relative w-full h-[400px]">
            <Image
              src="/images/blog-pictures/single-post-image.png"
              alt={post.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
            
          <Advertisement />
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pack Lightly and Smartly</h2>
              <p className="text-gray-600 dark:text-gray-200">
              Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Safe and Healthy</h2>
              <p className="text-gray-600 dark:text-gray-200">
              Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It's also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Immerse Yourself in the Local Culture</h2>
              <p className="text-gray-600 dark:text-gray-200">
              One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
              </p>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Capture Memories</h2>
              <p className="text-gray-600 dark:text-gray-200">
              Finally, don't forget to capture memories of your journey. Whether it's through photographs, journaling, or souvenirs, preserving the moments and experiences of your travels can bring joy and nostalgia for years to come. However, it's also essential to be present in the moment and not let technology distract you from the beauty of your surroundings.
              </p>
            </section>
     

            

            {/* Sonuç Bölümü */}
            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Conclusion:</h2>
              <p className="text-gray-600 dark:text-gray-200">
              Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.
              </p>
            </section>
          </article>

          {/* Paylaşım Butonları */}
          <ShareButtons title={post.title} />
        </div>
      </div>

    </div>
  );
}
