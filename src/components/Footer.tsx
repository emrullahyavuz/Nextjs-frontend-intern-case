'use client'
import Image from 'next/image'
import { useState } from 'react'


export default function Footer() {
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('/api/saveEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Email saved successfully!');
      setEmail('');
    } else {
      setMessage(data.error);
    }
  };

  return (
    
    <footer className="bg-gray-100 w-full">
       
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-16 md:px-4 grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {/* About Section */}
        <div className='w-[85%]'>
        <h3 className="text-lg font-semibold">About</h3>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <p className="mt-4">
          <strong>Email:</strong> <span className='dark:text-gray-500'>info@jstemplate.net</span><br />
          <strong>Phone:</strong> <span className='dark:text-gray-500'>880 123 456 789</span>
        </p>
      </div>

      <div className="footer-links flex space-x-20">
        {/* Quick Link Section */}
      <div>
        <h3 className="text-lg font-semibold">Quick Link</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="text-gray-600 hover:underline">Home</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">About</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Blog</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Archived</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Author</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Contact</a></li>
        </ul>
      </div>

      {/* Category Section */}
      <div>
        <h3 className="text-lg font-semibold">Category</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="text-gray-600 hover:underline">Lifestyle</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Technology</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Travel</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Business</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Economy</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Sports</a></li>
        </ul>
      </div>
      </div>

      {/* Newsletter Section */}
      <div className='bg-white px-7 py-10 w-full  h-[254px] rounded-[20px] dark:bg-[#242535]'>
        <h3 className="text-lg font-semibold text-center">Weekly Newsletter</h3>
        <p className="text-gray-600 text-center">Get blog articles and offers via email.</p>
        
        <div>
      
      <form onSubmit={handleSubmit} className="mt-0 md:mt-6">
       <div className="flex flex-col space-y-4">
       <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="p-3 pl-3 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-[#181A2A] dark:border-[#3B3C4A] "
            required
          />
          <Image 
            src="/images/mail.svg"
            width={20}
            height={20}
            alt="Email icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
         <button 
           type="submit"
           className="bg-[#4B6BFB] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
         >
           Subscribe
         </button>
       </div>
       {message && (
         <p className={`mt-2 text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
           {message}
         </p>
       )}
     </form>
    </div>
          
          
       
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-300">
      <div className="mx-auto flex flex-col px-4 md:px-0 md:flex-row items-center justify-between">
        <div className="text-gray-600 flex items-center space-x-2">
          <Image 
            src="/images/Logo.svg"
            width={48} 
            height={48} 
            alt="MetaBlog Logo" 
            className="dark:brightness-0 dark:invert"
            
          />
          <div className="logo-info">
            <strong className='dark:text-white'><span className='font-light'>Meta</span>Blog</strong> 
            <p>© JS Template 2023. All Rights Reserved.</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:underline">Terms of Use</a>
          <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:underline">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  )
}

