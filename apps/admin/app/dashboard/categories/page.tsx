'use client'

import { useState } from 'react'
import { Plus, X, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useSeedCategories,
} from '@/hooks/useCategories'
import type { Category } from '@portfolio/types'

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const { data: categories, isLoading } = useCategories()
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory()
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory()
  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: seedCategories, isPending: isSeeding } = useSeedCategories()

  const isFormOpen = showForm || !!editingCategory

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: editingCategory?.name || '' },
  })

  function handleCreate(values: CategoryFormValues) {
    createCategory(values, {
      onSuccess: () => { setShowForm(false); reset() },
    })
  }

  function handleUpdate(values: CategoryFormValues) {
    if (!editingCategory) return
    updateCategory(
      { id: editingCategory.id, data: values },
      { onSuccess: () => { setEditingCategory(null); reset() } }
    )
  }

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setShowForm(false)
    reset({ name: category.name })
  }

  function handleCancel() {
    setShowForm(false)
    setEditingCategory(null)
    reset()
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this category?')) return
    deleteCategory(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage project categories
          </p>
        </div>
        <div className="flex gap-2">
          {!isFormOpen && (
            <>
              <Button
                variant="outline"
                onClick={() => seedCategories()}
                disabled={isSeeding}
              >
                {isSeeding ? 'Seeding...' : 'Seed defaults'}
              </Button>
              <Button onClick={() => { setShowForm(true); reset({ name: '' }) }}>
                <Plus className="h-4 w-4 mr-2" />
                Add category
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-xl p-6 mb-8 bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {editingCategory ? 'Edit category' : 'New category'}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form
            onSubmit={handleSubmit(editingCategory ? handleUpdate : handleCreate)}
            className="flex flex-col gap-4 max-w-sm"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="e.g. Frontend"
                {...register('name')}
                className={cn(errors.name && 'border-destructive')}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Slug will be auto-generated from name
              </p>
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="border border-border/50 rounded-xl overflow-hidden">
          {categories?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No categories yet.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => seedCategories()}
              >
                Seed defaults
              </Button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Projects</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat, i) => (
                  <tr
                    key={cat.id}
                    className={cn(
                      'border-b border-border/30 hover:bg-muted/30 transition-colors',
                      i === (categories?.length ?? 0) - 1 && 'border-b-0'
                    )}
                  >
                    <td className="px-4 py-3 font-medium">{cat.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {cat.slug}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {cat._count?.projects ?? 0} projects
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(cat)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(cat.id)}
                          disabled={(cat._count?.projects ?? 0) > 0}
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