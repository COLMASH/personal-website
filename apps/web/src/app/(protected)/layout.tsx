export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background flex min-h-screen">
            <aside className="border-border bg-sidebar hidden w-64 border-r p-4 lg:block">
                <nav className="space-y-2" aria-label="Main navigation">
                    {/* Add navigation links here */}
                </nav>
            </aside>
            <div className="flex flex-1 flex-col">
                <header className="border-border flex h-14 items-center border-b px-6">
                    {/* Add header content: breadcrumbs, user menu, theme toggle */}
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}
