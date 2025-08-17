import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        style={{ background: "var(--foreground)", color: "var(--background)", minHeight: "60px" }}>
                <p className="text-sm">© 2025 Finance & Co.</p>
        </footer>
      </body>
    </html>
  )
}
