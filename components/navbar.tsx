"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export type League = "NBA" | "WNBA"

interface NavbarProps {
  league: League
  setLeague: (league: League) => void
  onLogoClick: () => void
}

export function Navbar({ league, setLeague, onLogoClick }: NavbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            league === "NBA" ? "bg-[#17408B]" : "bg-[#FF6900]"
          }`}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-5 h-5 text-white"
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <path d="M5.5 5.5c3.5 3 9.5 3 13 0" />
              <path d="M5.5 18.5c3.5-3 9.5-3 13 0" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            The Answer
          </span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 rounded-full bg-muted">
            <button
              onClick={() => setLeague("NBA")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                league === "NBA"
                  ? "bg-[#17408B] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              NBA
            </button>
            <button
              onClick={() => setLeague("WNBA")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                league === "WNBA"
                  ? "bg-[#FF6900] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              WNBA
            </button>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
