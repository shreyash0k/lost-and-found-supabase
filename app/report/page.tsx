"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addItem } from "@/store/items"

export default function ReportItem() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [itemType, setItemType] = useState<"lost" | "found">("lost")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
    contact: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Add the item to our store
    addItem({
      type: itemType,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      contact: formData.contact,
    })

    // Redirect after a short delay
    setTimeout(() => {
      router.push(`/submission-success?type=${itemType}`)
    }, 1000)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Report Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="item-type">Item Type</Label>
          <RadioGroup
            defaultValue="lost"
            className="flex gap-4"
            onValueChange={(value) => setItemType(value as "lost" | "found")}
            value={itemType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lost" id="lost" />
              <Label htmlFor="lost">Lost Item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="found" id="found" />
              <Label htmlFor="found">Found Item</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Item Name</Label>
          <Input
            id="title"
            placeholder={`e.g. ${itemType === "lost" ? "Blue Backpack" : "House Keys"}`}
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select required onValueChange={handleSelectChange} value={formData.category}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Documents">Documents</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">{itemType === "lost" ? "Date Lost" : "Date Found"}</Label>
          <Input id="date" type="date" required value={formData.date} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">{itemType === "lost" ? "Last Seen Location" : "Location Found"}</Label>
          <Input
            id="location"
            placeholder={`e.g. ${itemType === "lost" ? "Central Park" : "Main Street Cafe"}`}
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the item in detail including color, size, brand, etc."
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            type="number"
            placeholder="Your phone number"
            required
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </div>
  )
}

