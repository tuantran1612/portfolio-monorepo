'use client'

import { useState } from 'react'
import { useProjects } from '@/hook/useProject'
import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { Project } from '@portfolio/types'
import type { Category } from '@portfolio/types'

const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile']

interface ProjectsClientProps {
  initialProjects: Project[]
  categories: Category[]
}

export function ProjectsClient({ initialProjects, categories }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)

  const { data: projects, isLoading, isError } = useProjects(activeCategory)

  return (
    <div className="container mx-auto px-4 py-16">
      {/* ... header ... */}

      {/* Category filter — dynamic from API */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Button
          size="sm"
          variant={activeCategory === undefined ? 'default' : 'outline'}
          onClick={() => setActiveCategory(undefined)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={activeCategory === cat.slug ? 'default' : 'outline'}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* ... rest of component ... */}
    </div>
  )
}