'use client'

import { Trash2, MailOpen, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useContacts, useMarkAsRead, useDeleteContact } from '@/hooks/useContacts'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export default function ContactsPage() {
  const { data: contacts, isLoading } = useContacts()
  const { mutate: markAsRead, isPending: isMarking } = useMarkAsRead()
  const { mutate: deleteContact } = useDeleteContact()

  function handleDelete(id: string) {
    if (!confirm('Delete this contact?')) return
    deleteContact(id)
  }

  const unreadCount = contacts?.filter((c) => !c.read).length ?? 0

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
              : 'All messages read'}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : contacts?.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground border border-border/50 rounded-xl">
          <Mail className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>No contact submissions yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {contacts?.map((contact) => (
            <div
              key={contact.id}
              className={cn(
                'border rounded-xl p-5 transition-colors',
                contact.read
                  ? 'border-border/40 bg-background'
                  : 'border-primary/30 bg-primary/5'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.email}</span>
                    {!contact.read && (
                      <Badge className="text-xs bg-primary/10 text-primary border-0">
                        New
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {format(new Date(contact.createdAt), 'MMM d, yyyy · h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {contact.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!contact.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => markAsRead(contact.id)}
                      disabled={isMarking}
                    >
                      <MailOpen className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}