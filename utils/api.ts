import type { User } from "@/types/user"

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

