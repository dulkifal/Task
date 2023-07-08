import './globals.css'
import { Inter } from 'next/font/google'

// Load the Inter font with the "latin" subset.
const inter = Inter({ subsets: ['latin'] })

// Define an object called "metadata" that contains the title and description of the application.
export const metadata = {
    title: 'Task Management Application',
    description: 'Project Assignment: Building a Task Management Application',
}

// Define a component called "RootLayout" that takes in a prop called "children".
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* Render the children of the component. */}
            <body className={inter.className}>{children}</body>
        </html>
    )
}
