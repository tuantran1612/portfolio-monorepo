import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/projects/project-card'
import { projectService } from '@/services/project.service'

const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile']

async function getFeaturedProjects() {
  try {
    return await projectService.getFeatured()
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <div className="container mx-auto px-4">

      {/* Hero */}
      <section className="py-24 md:py-32 flex flex-col items-start gap-6 max-w-3xl">
        <Badge variant="secondary" className="text-xs">
          Available for work
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Hi, I'm <span className="text-primary">Tuan Tran</span>
          <br />
          Full Stack Developer
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          I build scalable web applications with modern technologies.
          Passionate about clean code, great UX, and solving real problems.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          {['NestJS', 'Next.js', 'TypeScript', 'MongoDB', 'Docker', 'Prisma'].map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-t border-border/40">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground text-sm mt-1">
              A selection of my recent work
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No featured projects yet.</p>
          </div>
        )}
      </section>

      {/* Category browse */}
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

      {/* Short bio */}
      <section className="py-16 border-t border-border/40 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight mb-4">About me</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I'm a mid-level full stack developer based in Ho Chi Minh City, Vietnam.
          I specialize in building RESTful APIs with NestJS and modern frontends
          with Next.js. I care about clean architecture, developer experience,
          and shipping products that work.
        </p>
        <Button variant="outline" asChild>
          <Link href="/about">
            More about me
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

    </div>
  )
}