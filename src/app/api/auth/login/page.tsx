"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
type Provider = "google" | "github" | "credentials";
const LoginPage = () => {
 const router = useRouter();
 const { data: session, status } = useSession();
 const [isLoading, setIsLoading] = useState<Provider | null>(null);
 const [showCredentials, setShowCredentials] = useState(false);
 const [credentials, setCredentials] = useState({
   email: "",
   password: "",
 });
  const handleSignIn = async (provider: Provider) => {
   try {
     setIsLoading(provider);
     
     const result = await signIn(provider, {
       callbackUrl: "/",
       redirect: false,
     });
      if (result?.ok) {
       toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
       setTimeout(() => {
         router.push('/');
       }, 1500);
     } else {
       toast.error(result?.error);
     }
   } catch (error) {
     console.error("Giriş hatası:", error);
     toast.error("Beklenmeyen bir hata oluştu");
   } finally {
     setIsLoading(null);
   }
 };
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     setIsLoading("credentials");
     
     const result = await signIn("credentials", {
       email: credentials.email,
       password: credentials.password,
       callbackUrl: "/",
       redirect: false,
     });
      if (result?.ok) {
       toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
       setTimeout(() => {
         router.push('/');
       }, 1500);
     } else {
       toast.error(result?.error || "Giriş yapılırken bir hata oluştu");
     }
   } catch (error) {
     console.error("Giriş hatası:", error);
     toast.error("Beklenmeyen bir hata oluştu");
   } finally {
     setIsLoading(null);
   }
 };
  if (status === "loading") {
   return (
     <div className="min-h-screen flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
     </div>
   );
 }
  if (session) {
   return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
       <div className="bg-white p-8 rounded-lg shadow-md">
         <h1 className="text-2xl font-bold mb-4">
           Hoş geldiniz, {session.user?.name}!
         </h1>
         <p className="mb-4 text-gray-600">Giriş yapmış durumdasınız.</p>
         <button
           onClick={() => router.push('/')}
           className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
         >
           Ana Sayfaya Git
         </button>
       </div>
     </div>
   );
 }
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       <h1 className="text-3xl font-bold mb-8 text-center">Giriş Yap</h1>
       <div className="flex flex-col gap-4">
         <button
           onClick={() => handleSignIn("google")}
           disabled={isLoading !== null}
           className={`w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-x-3 ${
             isLoading === "google" ? "opacity-70 cursor-not-allowed" : ""
           }`}
         >
           <FaGoogle size={20} />
           {isLoading === "google" ? "Giriş yapılıyor..." : "Google ile Giriş Yap"}
         </button>
          <button
           onClick={() => handleSignIn("github")}
           disabled={isLoading !== null}
           className={`w-full px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors flex items-center justify-center gap-x-3 ${
             isLoading === "github" ? "opacity-70 cursor-not-allowed" : ""
           }`}
         >
           <FaGithub size={20} />
           {isLoading === "github" ? "Giriş yapılıyor..." : "GitHub ile Giriş Yap"}
         </button>
          {!showCredentials ? (
           <button
             onClick={() => setShowCredentials(true)}
             disabled={isLoading !== null}
             className={`w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors`}
           >
             Kullanıcı Adı ve Şifre ile Giriş Yap
           </button>
         ) : (
           <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4">
             <input
               type="email"
               placeholder="E-posta"
               value={credentials.email}
               onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
               required
             />
             <input
               type="password"
               placeholder="Şifre"
               value={credentials.password}
               onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
               required
             />
             <button
               type="submit"
               disabled={isLoading !== null}
               className={`w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${
                 isLoading === "credentials" ? "opacity-70 cursor-not-allowed" : ""
               }`}
             >
               {isLoading === "credentials" ? "Giriş yapılıyor..." : "Giriş Yap"}
             </button>
             <button
               type="button"
               onClick={() => setShowCredentials(false)}
               className="text-sm text-gray-600 hover:text-gray-800"
             >
               Geri Dön
             </button>
           </form>
         )}
       </div>
     </div>
     <ToastContainer position="top-right" autoClose={3000} />
   </div>
 );
};
export default LoginPage;