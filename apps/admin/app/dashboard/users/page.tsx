'use client'

import { useState } from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers, useCreateUser, useDeleteUser } from '@/hooks/useUsers'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'staff']),
})

type UserFormValues = z.infer<typeof userSchema>

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false)

  const { data: users, isLoading } = useUsers()
  const { mutate: createUser, isPending: isCreating } = useCreateUser()
  const { mutate: deleteUser } = useDeleteUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', password: '', role: 'staff' },
  })

  function handleCreate(values: UserFormValues) {
    createUser(values, {
      onSuccess: () => { setShowForm(false); reset() },
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this user?')) return
    deleteUser(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage admin and staff accounts
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add user
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="border border-border/50 rounded-xl p-6 mb-8 bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">New user</h2>
            <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); reset() }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-5 max-w-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="John Doe"
                  {...register('name')}
                  className={cn(errors.name && 'border-destructive')}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="john@portfolio.com"
                  {...register('email')}
                  className={cn(errors.email && 'border-destructive')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className={cn(errors.password && 'border-destructive')}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Role</label>
                <select
                  {...register('role')}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create user'}
              </Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); reset() }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="border border-border/50 rounded-xl overflow-hidden">
          {users?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No users found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => (
                  <tr
                    key={user.id}
                    className={cn(
                      'border-b border-border/30 hover:bg-muted/30 transition-colors',
                      i === (users?.length ?? 0) - 1 && 'border-b-0'
                    )}
                  >
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {format(new Date(user.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}