"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getItemById, type Item } from "@/store/items"

export default function ItemDetailPage() {
  const { id } = useParams()
  const [contactVisible, setContactVisible] = useState(false)
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    if (id) {
      const foundItem = getItemById(Number(id))
      setItem(foundItem || null)
    }
  }, [id])

  if (!item) {
    return (
      <div className="container max-w-md mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Item Not Found</h1>
        </div>
        <p className="text-center py-8 text-muted-foreground">
          The item you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Item Details</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs px-2 py-1 rounded-full ${item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {item.type === "lost" ? "Lost" : "Found"}
            </span>
            <span className="text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString()}</span>
          </div>

          <h2 className="text-xl font-bold mb-2">{item.title}</h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {item.location}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(item.date).toLocaleDateString()}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <p className="text-muted-foreground">{item.category}</p>
          </div>

          {contactVisible ? (
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Contact Number</h3>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                {item.contact}
              </div>
            </div>
          ) : null}

          <Button
            variant={contactVisible ? "outline" : "default"}
            className="w-full"
            onClick={() => setContactVisible(!contactVisible)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {contactVisible ? "Hide Contact Info" : "Show Contact Info"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

