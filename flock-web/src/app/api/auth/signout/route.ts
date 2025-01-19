import { signOut } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST() {
  return signOut({ redirectTo: "/" })
} 