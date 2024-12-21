"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const LogoutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:text-black">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Çıkış Yap</h1>
        <p className="mb-4">Hesabınızdan çıkış yapmak istiyor musunuz?</p>
        <button
          onClick={() => {
            toast.success("Başarıyla çıkış yapıldı!");
            signOut({ callbackUrl: "/" });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
