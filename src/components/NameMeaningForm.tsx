'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartIcon } from 'lucide-react'
import { generateMeaning } from '@/app/actions'

export default function NameMeaningForm() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [result, setResult] = useState<{ meaning: string; valentinePrediction: string } | null>(null)
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setIsGenerating(true)

    if (!name || !gender || !country) {
      setError('Please enter name, gender, and country.')
      setIsGenerating(false)
      return
    }

    try {
      const data = await generateMeaning(name, gender, country)
      if (data && data.meaning && data.valentinePrediction) {
        setResult(data)
      } else {
        throw new Error("Received incomplete data from the server.")
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Name Meaning & Valentine Predictor</CardTitle>
        <CardDescription className="text-center">Discover your name&apos;s essence and Valentine&apos;s fate!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate'} <HeartIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-center">{error}</p>
            <p className="text-center text-sm mt-2">Please try again with different inputs or contact support if the issue persists.</p>
          </div>
        )}
        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-2">Name Meaning:</h3>
            <p className="text-gray-700 mb-4">{result.meaning}</p>
            <h3 className="text-lg font-semibold mb-2">Valentins Day Prediction:</h3>
            <p className="text-gray-700">{result.valentinePrediction}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

