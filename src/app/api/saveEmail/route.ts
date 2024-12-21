import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
export async function POST(request: Request) {
 try {
   const { email } = await request.json();
    // Email formatını kontrol et
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     return NextResponse.json(
       { error: 'Invalid email format' },
       { status: 400 }
     );
   }
    const user = await prisma.user.create({
     data: {
       email: email,
     },
   });
    return NextResponse.json({ success: true, user });
 } catch (error) {
  if (error instanceof Error) {
    console.error('Error saving email:', error);
    
    // Prisma hatası kontrolü
    if ('code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }
  }
    return NextResponse.json(
     { error: 'Failed to save email' },
     { status: 500 }
   );
 }
}