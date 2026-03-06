import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#17408B] flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-white" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 2 C12 2 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 12 C2 12 22 12 22 12" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 6 Q12 12 4 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M20 6 Q12 12 20 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">The Answer</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An unspecified error occurred.
                </p>
              )}
              <Link 
                href="/auth/login" 
                className="block text-center text-sm text-[#17408B] hover:text-[#17408B]/80 underline underline-offset-4"
              >
                Back to login
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
