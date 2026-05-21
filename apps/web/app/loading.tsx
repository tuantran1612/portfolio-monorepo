import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Skeleton className="h-6 w-32 mb-6" />
      <Skeleton className="h-16 w-3/4 mb-4" />
      <Skeleton className="h-6 w-2/4 mb-8" />
      <div className="flex gap-3">
        <Skeleton className="h-11 w-36" />
        <Skeleton className="h-11 w-36" />
      </div>
    </div>
  )
}