import { LoginForm } from '@/features/auth/components/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CiTestBanner } from '@/features/ci-test/components/ci-test-banner'

export default function LoginPage() {
    return (
        <main className="bg-background flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">personal-website</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
            <CiTestBanner />
        </main>
    )
}
