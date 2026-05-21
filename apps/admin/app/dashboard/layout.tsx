import { Sidebar } from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}