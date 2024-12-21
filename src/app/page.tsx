'use client';
import { useEffect, useState } from 'react';
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Advertisement from '@/components/Advertisement';

type Blog = {
  id: number;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
};


export default  function BlogListing() {
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
 const [searchTerm, setSearchTerm] = useState('');
 const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      // Tarihe göre sıralama yapıyoruz
      const sortedData = sortBlogs(data, sortOrder);
      setBlogs(sortedData);
      setVisibleBlogs(sortedData.slice(0, blogsPerPage)); // İlk 9 blog'u göster
      setLoading(false);
    };

    fetchBlogs();
  }, [sortOrder]);

  const sortBlogs = (blogsToSort: Blog[], order: 'newest' | 'oldest') => {
    return [...blogsToSort].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

     // Sıralama değiştiğinde çağrılacak handler
  
     const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newOrder = e.target.value as 'newest' | 'oldest';
      setSortOrder(newOrder);
      const sortedBlogs = sortBlogs(blogs, newOrder);
      setBlogs(sortedBlogs);
      setVisibleBlogs(sortedBlogs.slice(0, currentPage * blogsPerPage));
    };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const filteredBlogs = blogs.filter(blog =>
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleBlogs(filteredBlogs.slice(0, nextPage * blogsPerPage));
    setCurrentPage(nextPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredBlogs = blogs.filter(blog =>
      blog.category.toLowerCase().includes(term.toLowerCase())
    );
    setVisibleBlogs(filteredBlogs.slice(0, currentPage * blogsPerPage));
  };

 
  



  return (
    <>
    <div className="max-w-6xl mx-auto px-4">
      {/* Page Title */}
      <Header onSearch={handleSearch} />
      <div className="flex space-x-4 flex-col text-center space-y-2 my-7">
        <h1 className="page-title text-4xl font-bold">Next.js Blog Uygulaması</h1>
          <div className="page-links divide-x-2 space-x-3 !ml-0">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/link-one" className="text-gray-600 hover:text-gray-900 pl-3">
            Link One
          </Link>
          </div>
        </div>

      <Hero />
      
      {/* Sıralama seçeneğini ekliyoruz */}
      <div className="flex justify-end my-6">
         <select
           value={sortOrder}
           onChange={handleSortChange}
           className="border rounded-md px-3 py-2 text-gray-700 dark:text-white dark:bg-[#181A2A] dark:border-[#181A2A]"
         >
           <option value="newest">En Yeni</option>
           <option value="oldest">En Eski</option>
         </select>
       </div>
      {/* Blog Cards */}
      {loading ? <Spinner /> :
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
        {visibleBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              author={blog.author}
              date={blog.date}
            />
          ))}
      </div>
      }

     {/* Load More Button - sadece gösterilecek blog kaldıysa görünür */}
     {visibleBlogs.length < blogs.length && (
       <div className="text-center mt-8">
         <button 
           onClick={handleLoadMore}
           className="text-[#696A75] bg-white border w-[123px] h-[48px] py-2 px-4 rounded dark:bg-[#181A2A] dark:border-[#181A2A] "
         >
           Load More
         </button>
       </div>
     )}

         {/* Advertisement Section */}
      <Advertisement />
      

      
    </div>
    
    
    </>
  );
}
