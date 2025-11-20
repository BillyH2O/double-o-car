import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: "Configuration admin manquante" },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      const cookieStore = await cookies()
      cookieStore.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: "/",
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: "Mot de passe incorrect" },
        { status: 401 }
      )
    }
    } catch {
      return NextResponse.json(
        { success: false, error: "Erreur serveur" },
        { status: 500 }
      )
    }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin-auth")

    if (authCookie?.value === "authenticated") {
      return NextResponse.json({ authenticated: true })
    }

      return NextResponse.json({ authenticated: false }, { status: 401 })
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }
}

