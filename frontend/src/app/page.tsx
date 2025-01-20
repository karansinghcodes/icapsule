import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon, CalendarIcon, FileIcon } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">iCapsule</Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-blue-400">Login</Link>
            <Link href="/signup" passHref>
              <Button variant="ghost" className="hover:text-blue-400">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Secure Your Memories with iCapsule</h1>
          <p className="text-xl mb-8">Create encrypted time capsules for your files and documents. Open them when the time is right.</p>
          <Link href="/signup" passHref>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-800">
            <CardHeader>
              <LockIcon className="w-12 h-12 mb-4 text-blue-400" />
              <CardTitle>Secure Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your files are encrypted and remain private until the date you specify.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardHeader>
              <CalendarIcon className="w-12 h-12 mb-4 text-blue-400" />
              <CardTitle>Choose Your Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Set a future date for your capsule to "open" and reveal its contents.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardHeader>
              <FileIcon className="w-12 h-12 mb-4 text-blue-400" />
              <CardTitle>Store Anything</CardTitle>
            </CardHeader>
            <CardContent>
              <p>From documents to photos, store any type of file in your time capsule.</p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-left max-w-2xl mx-auto">
            <li className="mb-4">Sign up for an iCapsule account</li>
            <li className="mb-4">Create a new capsule and set its "open" date</li>
            <li className="mb-4">Upload your files and documents to the capsule</li>
            <li className="mb-4">We encrypt and securely store your capsule</li>
            <li>When the date arrives, your capsule unlocks, and you can access your files</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Capsule?</h2>
          <Link href="/signup" passHref>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Sign Up Now</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 iCapsule. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-blue-400 hover:underline mr-4">Privacy Policy</Link>
            <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

