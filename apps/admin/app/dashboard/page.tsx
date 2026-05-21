import { projectService } from '@/services/project.service'
import { contactService } from '@/services/contact.service'
import { FolderKanban, Mail, Star } from 'lucide-react'

async function getStats() {
  try {
    const [projects, contacts] = await Promise.all([
      projectService.getAll(),
      contactService.getAll(),
    ])
    return {
      total: projects.length,
      featured: projects.filter((p: any) => p.featured).length,
      contacts: contacts.length,
      unread: contacts.filter((c: any) => !c.read).length,
    }
  } catch {
    return { total: 0, featured: 0, contacts: 0, unread: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Total projects',
      value: stats.total,
      icon: FolderKanban,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Featured',
      value: stats.featured,
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Total contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Unread',
      value: stats.unread,
      icon: Mail,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, Tuan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border border-border/50 rounded-xl p-5 bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={cn('h-4 w-4', card.color)} />
              </div>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}