'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProjectTable } from '@/components/projects/table'
import { ProjectForm } from '@/components/projects/form'
import { useProjects, useCreateProject, useUpdateProject } from '@/hooks/useProjects'
import type { Project } from '@portfolio/types'

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const { data: projects, isLoading } = useProjects()
  const { mutate: createProject, isPending: isCreating } = useCreateProject()
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject()

  const isFormOpen = showForm || !!editingProject

  function handleCreate(values: any) {
    const data = {
      ...values,
      techStack: values.techStack.split(',').map((t: string) => t.trim()).filter(Boolean),
    }
    createProject(data, {
      onSuccess: () => setShowForm(false),
    })
  }

  function handleUpdate(values: any) {
    if (!editingProject) return
    const data = {
      ...values,
      techStack: values.techStack.split(',').map((t: string) => t.trim()).filter(Boolean),
    }
    updateProject(
      { id: editingProject.id, data },
      { onSuccess: () => setEditingProject(null) }
    )
  }

  function handleEdit(project: Project) {
    setEditingProject(project)
    setShowForm(false)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingProject(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your portfolio projects
          </p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add project
          </Button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-xl p-6 mb-8 bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {editingProject ? 'Edit project' : 'New project'}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ProjectForm
            defaultValues={editingProject || undefined}
            onSubmit={editingProject ? handleUpdate : handleCreate}
            isPending={isCreating || isUpdating}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={projects || []}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
}