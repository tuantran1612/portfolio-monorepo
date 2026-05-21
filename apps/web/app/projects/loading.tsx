import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <Skeleton className="h-10 w-48 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="flex gap-2 mb-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-video rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}