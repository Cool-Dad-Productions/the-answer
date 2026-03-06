"use client"

import { ArrowRight } from "lucide-react"
import type { League } from "@/app/page"

interface FollowUpChipsProps {
  league: League
  suggestions: string[]
  onSelect: (question: string) => void
}

export function FollowUpChips({ league, suggestions, onSelect }: FollowUpChipsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Follow-up questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-md active:scale-95 animate-in fade-in slide-in-from-bottom-2 ${
              league === "NBA"
                ? "border-[#17408B]/30 text-[#17408B] hover:bg-[#17408B] hover:text-white hover:border-[#17408B]"
                : "border-[#FF6900]/30 text-[#FF6900] hover:bg-[#FF6900] hover:text-white hover:border-[#FF6900]"
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "backwards"
            }}
          >
            {suggestion}
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        ))}
      </div>
    </div>
  )
}
