'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MailX } from 'lucide-react'

export default function ContactError({
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
    <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <MailX className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        Contact form unavailable
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't load the contact form. Please try again or email directly.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <a href="mailto:your@email.com">Email directly</a>
        </Button>
      </div>
    </div>
  )
}