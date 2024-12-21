import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

// Yardımcı fonksiyon - bileşenin dışında tanımlanabilir
const getAuthorImage = (authorName: string): string => {
  const formattedName = authorName.toLowerCase().replace(' ', '-');
  return `/images/blog-pictures/${formattedName}.png`;
};

interface BlogCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
}

export default function BlogCard({
  id,
  image,
  category,
  title,
  author,
  date,
}: BlogCardProps) {

  const authorImage = useMemo(() => getAuthorImage(author), [author]);

  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  return (
    <Link href={`/post/${id}`} className="block">
    <div className="max-w-sm rounded-2xl overflow-hidden  border-gray-200 dark:border-[#181A2A] border-2 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail Image */}
      <div className="relative w-full h-48 p-3 mb-7">
        <Image
          src={image}
          alt={title}
          width={360}
          height={240}
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block bg-indigo-100 text-[#4B6BFB] dark:bg-[#181A2A] text-sm font-light rounded-lg px-3 py-1 mb-3">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-medium w-[90%] text-gray-900 leading-tight mb-3 dark:text-white">
          {title}
        </h3>

        {/* Author & Date */}
        <div className="flex items-center text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6">
              <Image
                src={authorImage}
                alt={author}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span>{author}</span>
          </div>
          <span className="ml-4">{formattedDate}</span>
        </div>
      </div>
    </div>
  </Link>
    
  );
}
