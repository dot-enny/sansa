// Authentication Context - Manages user authentication state and role-based access

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type UserRole = 'customer' | 'vendor' | 'lender' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  // Vendor-specific fields
  vendorId?: string
  storeName?: string
  // Lender-specific fields
  lenderId?: string
  availableCapital?: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database (in production, this would be API calls)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'customer@sansa.com': {
    id: 'cust_001',
    email: 'customer@sansa.com',
    password: 'Demo@Pass123!',
    name: 'Jane Customer',
    role: 'customer',
  },
  'vendor@sansa.com': {
    id: 'vend_001',
    email: 'vendor@sansa.com',
    password: 'Demo@Pass123!',
    name: 'Fashion Hub',
    role: 'vendor',
    vendorId: 'vendor_001',
    storeName: 'Fashion Hub Store',
  },
  'lender@sansa.com': {
    id: 'lend_001',
    email: 'lender@sansa.com',
    password: 'Demo@Pass123!',
    name: 'Capital Partners',
    role: 'lender',
    lenderId: 'lender_001',
    availableCapital: 15500000,
  },
  'admin@sansa.com': {
    id: 'admin_001',
    email: 'admin@sansa.com',
    password: 'Demo@Pass123!',
    name: 'Admin User',
    role: 'admin',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sansa_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('sansa_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('sansa_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('sansa_user')
    }
  }, [user])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser = MOCK_USERS[email.toLowerCase()]
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = mockUser
    setUser(userWithoutPassword)
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    if (MOCK_USERS[email.toLowerCase()]) {
      throw new Error('User already exists')
    }

    // Create new user
    const newUser: User = {
      id: `${role}_${Date.now()}`,
      email,
      name,
      role,
    }

    // Add role-specific fields
    if (role === 'vendor') {
      newUser.vendorId = `vendor_${Date.now()}`
      newUser.storeName = `${name}'s Store`
    } else if (role === 'lender') {
      newUser.lenderId = `lender_${Date.now()}`
      newUser.availableCapital = 0
    }

    // In production, this would save to database
    MOCK_USERS[email.toLowerCase()] = { ...newUser, password }

    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sansa_user')
  }

  const switchRole = (role: UserRole) => {
    if (!user) return

    // In production, check if user has permission for this role
    const updatedUser = { ...user, role }
    setUser(updatedUser)
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    setUser({ ...user, ...updates })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(redirectTo, { replace: true })
    } else if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      const roleDashboards: Record<UserRole, string> = {
        customer: '/',
        vendor: '/vendor-dashboard',
        lender: '/lender-dashboard',
        admin: '/admin',
      }
      navigate(roleDashboards[user.role], { replace: true })
    }
  }, [user, isLoading, allowedRoles, navigate, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
