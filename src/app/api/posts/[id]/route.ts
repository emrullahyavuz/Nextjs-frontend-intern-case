import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    // URL'den ID'yi al
    const id = request.url.split('/').pop();
    const { title, category, content } = await request.json();

    const updatedPost = await prisma.blog.update({
      where: {
        id: parseInt(id!)
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