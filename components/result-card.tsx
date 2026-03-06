"use client"

import type { League } from "@/app/page"

interface ResultCardProps {
  league: League
  answer: string
  interpretation: string
}

export function ResultCard({ league, answer, interpretation }: ResultCardProps) {
  return (
    <div className={`rounded-2xl border-2 bg-card p-6 md:p-8 shadow-lg transition-colors ${
      league === "NBA" ? "border-[#17408B]/20" : "border-[#FF6900]/20"
    }`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
        league === "NBA" 
          ? "bg-[#17408B]/10 text-[#17408B]" 
          : "bg-[#FF6900]/10 text-[#FF6900]"
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          league === "NBA" ? "bg-[#17408B]" : "bg-[#FF6900]"
        }`} />
        Answer
      </div>
      
      <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
        {answer}
      </p>
      
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground italic">
          Interpreted as: <span className="text-foreground/70">{interpretation}</span>
        </p>
      </div>
    </div>
  )
}
