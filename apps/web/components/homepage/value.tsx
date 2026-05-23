'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Zap, Layers } from 'lucide-react'

// register inside module scope but after import
gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    number: '01',
    icon: Code2,
    title: 'Clean Architecture',
    description:
      'I write code that is readable, maintainable, and scalable. Every layer has a clear responsibility — from database schema to UI component.',
    tags: ['NestJS', 'Prisma', 'TypeScript'],
  },
  {
    number: '02',
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'I ship working products quickly without sacrificing quality. CI/CD pipelines, Docker, and automated testing keep every release smooth.',
    tags: ['Docker', 'GitHub Actions', 'Railway'],
  },
  {
    number: '03',
    icon: Layers,
    title: 'Full Stack Ownership',
    description:
      'From API design to pixel-perfect UI — I handle the entire stack. No handoff gaps, no communication overhead, just end-to-end delivery.',
    tags: ['Next.js', 'REST API', 'PostgreSQL'],
  },
]

export function Values() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.value-card')
      if (!cards.length) return

      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <section ref={sectionRef} className="py-20 border-t border-border/40">
      <div className="mb-12">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
          What I bring
        </p>
        <h2 className="text-3xl font-bold tracking-tight">Values I deliver</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value) => (
          <div
            key={value.number}
            className="value-card group relative p-8 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
          >
            <span className="absolute top-6 right-6 text-4xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors">
              {value.number}
            </span>

            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <value.icon className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-lg font-semibold mb-3">{value.title}</h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {value.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {value.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}