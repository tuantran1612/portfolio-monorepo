'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-xl font-bold tracking-tight mb-3">
        Dashboard error
      </h1>
      <p className="text-muted-foreground text-sm max-w-sm mb-8">
        {error.message || 'Something went wrong loading this page.'}
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} size="sm">Try again</Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/dashboard'}
        >
          Back to overview
        </Button>
      </div>
    </div>
  )
}