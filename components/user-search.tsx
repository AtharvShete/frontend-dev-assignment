"use client"

import { Button } from "@/components/ui/button"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { fetchUsers } from "@/utils/api"
import type { User } from "@/types/user"
import { filterUsers } from "@/utils/trie"

export default function UserSearch() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true)
        const data = await fetchUsers()
        setUsers(data)
        setFilteredUsers(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch users. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getUsers()
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchResults = filterUsers(users, debouncedSearchTerm)
      setFilteredUsers(searchResults)
    } else {
      setFilteredUsers(users)
    }
  }, [debouncedSearchTerm, users])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search users..." className="pl-10" disabled />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search users..." value={searchTerm || ""} onChange={handleSearchChange} className="pl-10" />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No users found matching "{searchTerm}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm mt-2">{user.company.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

