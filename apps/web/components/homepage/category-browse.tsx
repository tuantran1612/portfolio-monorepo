import { LinkButton } from '@/components/ui/link'
import type { Category } from '@portfolio/types'

interface CategoryBrowseProps {
  categories: Category[]
}

export function CategoryBrowse({ categories }: CategoryBrowseProps) {
  return (
    <section className="py-16 border-t border-border/40">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        <LinkButton variant="outline" href="/projects">
          All
        </LinkButton>
        {categories.map((cat) => (
          <LinkButton
            key={cat.id}
            variant="outline"
            href={`/projects?category=${cat.slug}`}
          >
            {cat.name}
          </LinkButton>
        ))}
      </div>
    </section>
  )
}