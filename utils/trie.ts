import type { User } from "@/types/user"

export function filterUsers(users: User[], query: string): User[] {
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) return users

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery) ||
      user.company.name.toLowerCase().includes(normalizedQuery),
  )
}

