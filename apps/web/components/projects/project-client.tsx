'use client'

import { useState } from 'react'
import { useProjects } from '@/hook/useProject'
import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { Project, Category } from '@portfolio/types'

interface ProjectsClientProps {
  initialProjects: Project[]
  categories: Category[]
}

export function ProjectsClient({ initialProjects, categories }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)

  const { data: projects, isLoading, isError } = useProjects(activeCategory, undefined)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-muted-foreground text-lg">
          Things I've built — side projects, client work, and experiments.
        </p>
      </div>

      {/* Category filter */}
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

      {/* Loading */}
      {isLoading && (
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
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">Failed to load projects.</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && projects?.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">
            No projects found{activeCategory ? ` in this category` : ''}.
          </p>
          {activeCategory && (
            <Button variant="outline" className="mt-4" onClick={() => setActiveCategory(undefined)}>
              Clear filter
            </Button>
          )}
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && projects && projects.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
            {activeCategory ? ` in this category` : ' total'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}