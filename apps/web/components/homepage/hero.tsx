'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { LinkButton } from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin()

const techStack = ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Prisma']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero-line-1', { opacity: 0, y: 40, duration: 0.7 }, '-=0.3')
      .from('.hero-line-2', { opacity: 0, y: 40, duration: 0.7 }, '-=0.5')
      .from('.hero-desc', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .from('.hero-tech span', { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, '-=0.2')
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="min-h-[90vh] flex flex-col justify-center py-24 md:py-32 max-w-4xl"
    >
      <div className="hero-badge mb-6">
        <Badge variant="secondary" className="text-xs px-3 py-1">
          Available for work
        </Badge>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
        <span className="hero-line-1 block text-foreground">Hi, I'm</span>
        <span className="hero-line-2 block text-primary">Tuan Tran</span>
      </h1>

      <p className="hero-desc text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-10">
        Full stack developer building scalable web applications
        with modern technologies. Based in Ho Chi Minh City.
      </p>

      <div className="flex flex-wrap gap-4 mb-12">
        <div className="hero-cta">
          <LinkButton href="/projects" size="lg">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </LinkButton>
        </div>
        <div className="hero-cta">
          <LinkButton href="/contact" variant="outline" size="lg">
            Get in touch
          </LinkButton>
        </div>
      </div>

      <div className="hero-tech flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}