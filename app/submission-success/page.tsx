"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export default function SubmissionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "lost"
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Set up countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        // Only update the countdown
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          // Schedule navigation outside of the state update function
          setTimeout(() => {
            router.push("/")
          }, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [router])

  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Report Submitted!</h1>

      <p className="text-muted-foreground mb-8">
        {type === "lost"
          ? "Your lost item report has been submitted successfully. We'll notify you if someone finds it."
          : "Thank you for reporting a found item. The owner will be grateful for your help."}
      </p>

      <div className="space-y-4">
        <Link href="/">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground">Redirecting to home page in {countdown} seconds...</p>
      </div>
    </div>
  )
}

