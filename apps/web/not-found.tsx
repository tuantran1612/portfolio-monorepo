import { LinkButton } from '@/components/ui/link-button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
      <p className="text-8xl font-black text-primary/20 mb-6">404</p>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <LinkButton href="/" variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to home
      </LinkButton>
    </div>
  )
}