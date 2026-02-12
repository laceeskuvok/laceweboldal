import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // 1. Kezdő válasz létrehozása
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Supabase kliens inicializálása (ÚJ SZINTAXIS: getAll / setAll)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Először a kérésben frissítjük a cookie-kat
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          
          // Majd újraépítjük a választ a frissített cookie-kkal
          response = NextResponse.next({
            request,
          })
          
          // Végül beállítjuk a válaszban is a cookie-kat
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Session / User ellenőrzése
  // Fontos: a getUser() biztonságosabb middleware-ben, mint a getSession()
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Átirányítási logika
  // Ha a felhasználó az /admin útvonalat próbálja elérni és nincs bejelentkezve
  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Ha a felhasználó be van jelentkezve és a /login oldalt akarja elérni
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

// ... (a fenti kód marad változatlan) ...

export const config = {
  matcher: ['/admin/:path*', '/login'],
  // Ezt a sort add hozzá:
  runtime: 'nodejs', // Kényszerített Node.js runtime, elkerüli az Edge hibákat
}