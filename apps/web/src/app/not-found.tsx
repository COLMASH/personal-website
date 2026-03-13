import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background">
            <div className="space-y-4 text-center">
                <h1 className="text-6xl font-bold text-foreground">404</h1>
                <p className="text-lg text-muted-foreground">Page not found</p>
                <Button asChild>
                    <Link href={ROUTES.HOME}>Go home</Link>
                </Button>
            </div>
        </main>
    )
}
