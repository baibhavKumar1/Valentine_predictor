import NameMeaningForm from '@/components/NameMeaningForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <h1 className="text-4xl font-bold text-white mb-8">Name Meaning Generator</h1>
      <NameMeaningForm />
    </main>
  )
}

