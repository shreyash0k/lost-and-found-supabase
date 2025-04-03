import { supabase } from "@/lib/supabase"

// Define the Item interface to match our Supabase schema
export interface Item {
  id: string
  created_at: string
  type: "lost" | "found"
  title: string
  location: string
  date: string
  category: string
  description: string
  contact: string
  user_id?: string
}

// Get all items
export async function getItems(): Promise<Item[]> {
  const { data, error } = await supabase.from("items").select("*")

  if (error) {
    console.error("Error fetching items:", error)
    return []
  }

  return data || []
}

// Add a new item
export async function addItem(item: Omit<Item, "id" | "created_at" | "user_id">): Promise<Item | null> {
  const { data, error } = await supabase.from("items").insert([item]).select().single()

  if (error) {
    console.error("Error adding item:", error)
    return null
  }

  return data
}

// Get a single item by ID
export async function getItemById(id: string): Promise<Item | null> {
  const { data, error } = await supabase.from("items").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching item:", error)
    return null
  }

  return data
}

// Sort items by date (newest first)
export async function getSortedItems(): Promise<Item[]> {
  const { data, error } = await supabase.from("items").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching sorted items:", error)
    return []
  }

  return data || []
}

