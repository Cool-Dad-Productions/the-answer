"use client"

import { useState } from "react"
import { Navbar, type League } from "@/components/navbar"
import { SearchSection } from "@/components/search-section"
import { ResultCard } from "@/components/result-card"
import { FollowUpChips } from "@/components/follow-up-chips"

export type AppState = "empty" | "loading" | "results"

// Mock data for demo purposes
const mockResults: Record<string, { answer: string; interpretation: string; followUps: string[] }> = {
  "What years did LeBron lead the league in scoring?": {
    answer: "LeBron James led the league in scoring once, during the 2007-08 season, averaging 30.0 points per game.",
    interpretation: "NBA regular season scoring leaders, LeBron James career",
    followUps: ["How many total points that season?", "Who was second in scoring?", "What was his career high PPG?", "Most scoring titles all-time?"]
  },
  "Who had the most rebounds in a game last season?": {
    answer: "Domantas Sabonis grabbed 28 rebounds against the Portland Trail Blazers on November 12, 2024 — the most in a single game last season.",
    interpretation: "Single game rebound leaders, 2024-25 NBA season",
    followUps: ["How many points did he have?", "Most rebounds in a career game?", "Season rebound leaders?", "Triple-doubles last season?"]
  },
  "Which team had the best record in WNBA history?": {
    answer: "The 2016 Minnesota Lynx finished 28-6 (.824), the best regular season record in WNBA history. They went on to win the championship that year.",
    interpretation: "Best regular season records, WNBA all-time",
    followUps: ["Who was their best player?", "Did they win the title?", "Second best record ever?", "Current dynasty teams?"]
  },
  "Most three-pointers made in a single season?": {
    answer: "Stephen Curry holds the record with 402 three-pointers made during the 2015-16 season, shattering his own previous record of 286.",
    interpretation: "Single season three-point leaders, NBA all-time",
    followUps: ["What was his percentage?", "Who has the most career threes?", "Most threes in a game?", "Top 5 seasons ever?"]
  },
  "Who won the 2016 Finals MVP?": {
    answer: "LeBron James won the 2016 NBA Finals MVP after leading the Cleveland Cavaliers to a historic comeback from a 3-1 deficit against the Golden State Warriors.",
    interpretation: "NBA Finals MVP, 2016",
    followUps: ["What were his stats?", "How many Finals MVPs does he have?", "Most Finals MVPs all-time?", "Who was the runner-up?"]
  }
}

const defaultFollowUps = ["How many points per game that year?", "Who was second?", "Compare to other seasons", "Show me a breakdown"]

export default function TheAnswer() {
  const [league, setLeague] = useState<League>("NBA")
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [appState, setAppState] = useState<AppState>("empty")
  const [result, setResult] = useState<{ answer: string; interpretation: string; followUps: string[] } | null>(null)

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setSubmittedQuery(searchQuery)
    setAppState("loading")
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = mockResults[searchQuery] || {
        answer: `Based on our records, the answer to "${searchQuery}" involves comprehensive statistical analysis across multiple seasons and players.`,
        interpretation: `Searching: ${searchQuery.toLowerCase()}`,
        followUps: defaultFollowUps
      }
      setResult(mockResult)
      setAppState("results")
    }, 1500)
  }

  const handleFollowUp = (question: string) => {
    setQuery(question)
    handleSearch(question)
  }

  const handleReset = () => {
    setQuery("")
    setSubmittedQuery("")
    setAppState("empty")
    setResult(null)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${league === "NBA" ? "bg-background" : "bg-background"}`}>
      <Navbar league={league} setLeague={setLeague} onLogoClick={handleReset} />
      
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-16">
        <SearchSection 
          league={league}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          appState={appState}
        />
        
        {appState === "loading" && (
          <div className="mt-12 flex flex-col items-center gap-4 animate-pulse">
            <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin ${
              league === "NBA" ? "border-[#17408B]" : "border-[#FF6900]"
            }`} />
            <p className="text-muted-foreground">Searching stats...</p>
          </div>
        )}
        
        {appState === "results" && result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultCard 
              league={league}
              answer={result.answer}
              interpretation={result.interpretation}
            />
            <FollowUpChips 
              league={league}
              suggestions={result.followUps}
              onSelect={handleFollowUp}
            />
          </div>
        )}
      </main>
    </div>
  )
}
