import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'


export async function middleware(req) {
    // token will exist if user is logged in

    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    //  allow the requests if the following is true..

    //  1) if the token exists

    const { pathname } = req.nextUrl

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    // redirect them to login if they don't have token AND are requesting a protected route

    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login')
    }


}