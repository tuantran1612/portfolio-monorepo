import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile']

export function CategoryBrowse() {
  return (
    <section className="py-16 border-t border-border/40">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Button key={cat} variant="outline" asChild>
            <Link href={cat === 'All' ? '/projects' : `/projects?category=${cat}`}>
              {cat}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  )
}