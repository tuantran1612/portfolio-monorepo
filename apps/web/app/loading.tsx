import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero skeleton */}
      <div className="min-h-[90vh] flex flex-col justify-center py-24">
        <Skeleton className="h-5 w-32 mb-6 rounded-full" />
        <Skeleton className="h-16 w-48 mb-2" />
        <Skeleton className="h-16 w-64 mb-6" />
        <Skeleton className="h-6 w-2/3 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-10" />
        <div className="flex gap-4 mb-12">
          <Skeleton className="h-11 w-36 rounded-md" />
          <Skeleton className="h-11 w-36 rounded-md" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Featured projects skeleton */}
      <div className="py-20 border-t border-border/40">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-9 w-56 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values skeleton */}
      <div className="py-20 border-t border-border/40">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-9 w-48 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-8 rounded-2xl border border-border/30">
              <Skeleton className="h-10 w-10 rounded-xl mb-6" />
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}