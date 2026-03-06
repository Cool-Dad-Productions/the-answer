"use client"

import { Search } from "lucide-react"
import type { League, AppState } from "@/app/page"

interface SearchSectionProps {
  league: League
  query: string
  setQuery: (query: string) => void
  onSearch: (query: string) => void
  appState: AppState
}

const nbaExamples = [
  "What years did LeBron lead the league in scoring?",
  "Who had the most rebounds in a game last season?",
  "Most three-pointers made in a single season?",
  "Who won the 2016 Finals MVP?",
]

const wnbaExamples = [
  "Which team had the best record in WNBA history?",
  "Most points scored in a WNBA game?",
  "Who has the most career assists in the WNBA?",
  "WNBA MVP winners last 5 years?",
]

export function SearchSection({ league, query, setQuery, onSearch, appState }: SearchSectionProps) {
  const examples = league === "NBA" ? nbaExamples : wnbaExamples
  const isCondensed = appState !== "empty"
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleExampleClick = (example: string) => {
    setQuery(example)
    onSearch(example)
  }

  return (
    <div className={`transition-all duration-300 ${isCondensed ? "pt-0" : "pt-24 md:pt-32"}`}>
      {!isCondensed && (
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            Ask anything about {league} stats
          </h1>
          <p className="text-muted-foreground text-lg">
            Get instant answers powered by AI
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-300 ${
          isCondensed ? "shadow-sm" : "shadow-lg"
        }`}>
          <div className={`absolute left-4 transition-colors ${
            league === "NBA" ? "text-[#17408B]" : "text-[#FF6900]"
          }`}>
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask anything about ${league} stats…`}
            className={`w-full pl-12 pr-28 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-300 ${
              league === "NBA" 
                ? "focus:ring-[#17408B]/30 focus:border-[#17408B]" 
                : "focus:ring-[#FF6900]/30 focus:border-[#FF6900]"
            } ${isCondensed ? "py-3 text-base" : "py-4 text-lg"}`}
          />
          <button
            type="submit"
            className={`absolute right-2 px-5 py-2 rounded-full text-white font-medium transition-all duration-200 hover:opacity-90 active:scale-95 ${
              league === "NBA" ? "bg-[#17408B]" : "bg-[#FF6900]"
            } ${isCondensed ? "text-sm" : "text-base"}`}
          >
            Search
          </button>
        </div>
      </form>
      
      {!isCondensed && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <p className="text-center text-sm text-muted-foreground mb-4">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 hover:shadow-md active:scale-95 ${
                  league === "NBA"
                    ? "border-[#17408B]/20 text-[#17408B] hover:bg-[#17408B]/5 hover:border-[#17408B]/40"
                    : "border-[#FF6900]/20 text-[#FF6900] hover:bg-[#FF6900]/5 hover:border-[#FF6900]/40"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
