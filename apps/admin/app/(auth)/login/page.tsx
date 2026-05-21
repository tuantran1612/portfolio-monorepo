import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            tuan<span className="text-primary">.</span>admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>

        <div className="border border-border/50 rounded-xl p-6 shadow-sm bg-card">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Portfolio Admin Panel — restricted access
        </p>

      </div>
    </div>
  )
}