'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, A11y } from 'swiper/modules'
import { ArrowRight, ArrowLeft as ArrowLeftIcon } from 'lucide-react'
import { ProjectCard } from '@/components/projects/project-card'
import { LinkButton } from '@/components/ui/link'
import type { Project } from '@portfolio/types'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  if (projects.length === 0) return null

  return (
    <section ref={sectionRef} className="py-20 rounded-md bg-black">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase text-white tracking-widest mb-2">
            Selected work
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="swiper-prev-btn w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            className="swiper-next-btn w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-prev-btn',
          nextEl: '.swiper-next-btn',
        }}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!overflow-visible"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 flex justify-center">
        <LinkButton href="/projects" variant="outline">
          View all projects
          <ArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </section>
  )
}