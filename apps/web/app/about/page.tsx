import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const skills = {
  Frontend: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Shadcn/UI'],
  Backend: ['NestJS', 'Node.js', 'Prisma', 'REST API', 'JWT'],
  Database: ['MongoDB', 'PostgreSQL', 'Redis'],
  DevOps: ['Docker', 'GitHub Actions', 'Railway', 'Vercel', 'Linux'],
}

const experiences = [
  {
    role: 'Mid Full Stack Developer',
    company: 'Your Company',
    period: '2023 — Present',
    description: 'Building scalable web applications with NestJS and Next.js.',
  },
  {
    role: 'Junior Frontend Developer',
    company: 'Previous Company',
    period: '2022 — 2023',
    description: 'Developed responsive UIs with React and TailwindCSS.',
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I'm a full stack developer based in Ho Chi Minh City, Vietnam.
          I enjoy building products from scratch — from database schema to
          deployed UI. I care about clean code, good architecture, and
          shipping things that actually work.
        </p>
      </div>

      <Separator className="my-10" />

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Skills</h2>
        <div className="flex flex-col gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Experience</h2>
        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                {i < experiences.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-muted-foreground">@</span>
                  <span className="text-primary font-medium">{exp.company}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* Education */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Education</h2>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
          <div>
            <h3 className="font-semibold">Bachelor of Software Engineering</h3>
            <p className="text-sm text-muted-foreground">Your University · 2019 — 2023</p>
          </div>
        </div>
      </section>

    </div>
  )
}