import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  title: string
  description: string
  category: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
      {/* Image */}
      {project.imageUrl ? (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/30">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{project.title}</h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        {project.liveUrl && (
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link href={project.liveUrl} target="_blank">
              <ExternalLink className="h-3 w-3 mr-1" />
              Live
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={project.repoUrl} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}