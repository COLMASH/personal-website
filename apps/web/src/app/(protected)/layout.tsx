export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="hidden w-64 border-r border-border bg-sidebar p-4 lg:block">
                <nav className="space-y-2" aria-label="Main navigation">
                    {/* Add navigation links here */}
                </nav>
            </aside>
            <div className="flex flex-1 flex-col">
                <header className="flex h-14 items-center border-b border-border px-6">
                    {/* Add header content: breadcrumbs, user menu, theme toggle */}
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}
