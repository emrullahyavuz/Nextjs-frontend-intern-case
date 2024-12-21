import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
export async function PUT(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const { title, category, content } = await request.json();
   
   // Admin kontrolü burada yapılmalı
   
   const updatedPost = await prisma.blog.update({
     where: {
       id: parseInt(params.id)
     },
     data: {
       title,
       category,
       content
     }
   });
    return NextResponse.json(updatedPost);
 } catch (error) {
   return NextResponse.json(
     { error: 'Güncelleme başarısız oldu' },
     { status: 500 }
   );
 }
}
