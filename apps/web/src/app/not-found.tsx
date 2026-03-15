import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'

export default function NotFound() {
    return (
        <main className="bg-background flex min-h-screen items-center justify-center">
            <div className="space-y-4 text-center">
                <h1 className="text-foreground text-6xl font-bold">404</h1>
                <p className="text-muted-foreground text-lg">Page not found</p>
                <Button asChild>
                    <Link href={ROUTES.HOME}>Go home</Link>
                </Button>
            </div>
        </main>
    )
}
