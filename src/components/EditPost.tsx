'use client';
import { useState } from 'react';
interface EditPostProps {
 post: {
   id: number;
   title: string;
   content?: string;
   category: string;
   author: string;
   date: Date;
   image: string;
 };
}

export default function EditPost({ post }: EditPostProps) {
 const [isEditing, setIsEditing] = useState(false);
 const [title, setTitle] = useState(post.title);
 const [category, setCategory] = useState(post.category);
 const [content, setContent] = useState(post.content);
  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   
   try {
     const response = await fetch(`/api/posts/${post.id}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ title, category, content }),
     });
      if (response.ok) {
       setIsEditing(false);
       window.location.reload();
     } else {
       alert('Güncelleme başarısız oldu!');
     }
   } catch (error) {
     console.error('Güncelleme hatası:', error);
     alert('Güncelleme sırasında bir hata oluştu!');
   }
 };
  if (!isEditing) {
   return (
     <button
       onClick={() => setIsEditing(true)}
       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
     >
       Düzenle
     </button>
   );
 }
  return (
   <form onSubmit={handleSubmit} className="space-y-4 bg-gray-300 dark:bg-[#242535] dark:text-black rounded-lg p-4">
     <div>
       <label className="block text-sm font-medium text-gray-700">Başlık</label>
       <input
         type="text"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700">Kategori</label>
       <input
         type="text"
         value={category}
         onChange={(e) => setCategory(e.target.value)}
         className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700">İçerik</label>
       <textarea
         value={content}
         onChange={(e) => setContent(e.target.value)}
         rows={10}
         className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
       />
     </div>
     <div className="flex space-x-4">
       <button
         type="submit"
         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
       >
         Kaydet
       </button>
       <button
         type="button"
         onClick={() => setIsEditing(false)}
         className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
       >
         İptal
       </button>
     </div>
   </form>
 );
}
