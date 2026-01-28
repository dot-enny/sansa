import { Link, useLocation } from 'react-router-dom'
import { TrendingUp, type LucideIcon } from 'lucide-react'

export interface NavigationLink {
  name: string
  to: string
  icon: React.ReactNode
}

export interface UserInfo {
  name: string
  avatar?: string
  subtitle?: string
}

export interface MetricInfo {
  label: string
  value: number
  maxValue: number
  description: string
  icon?: LucideIcon
}

interface DashboardSidebarProps {
  userInfo: UserInfo
  navigationLinks: NavigationLink[]
  metric?: MetricInfo
  userType?: 'vendor' | 'lender' | 'admin'
}

/**
 * Generic Dashboard Sidebar Component
 * Reusable sidebar for Vendor, Lender, and Admin dashboards
 */
export default function DashboardSidebar({
  userInfo,
  navigationLinks,
  metric,
  userType = 'vendor',
}: DashboardSidebarProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <SansaBranding />
      <UserBranding userInfo={userInfo} userType={userType} />
      <Navigation links={navigationLinks} />
      {metric && <MetricDisplay metric={metric} />}
    </div>
  )
}

const SansaBranding = () => {
  return (
    <div className="px-6 py-2 border-b border-border">
      <Link to="/shop" className="flex items-center justify-center hover:opacity-80 transition-opacity">
        <h2 className="text-sm font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent three-d-text-shadow">
          sansa
        </h2>
      </Link>
    </div>
  )
}

interface UserBrandingProps {
  userInfo: UserInfo
  userType: 'vendor' | 'lender' | 'admin'
}

const UserBranding = ({ userInfo }: UserBrandingProps) => {
  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="px-6 pt-8 pb-6">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
          {userInfo.avatar ? (
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-primary-foreground">
              {getInitials(userInfo.name)}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">{userInfo.name}</h2>
          {userInfo.subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{userInfo.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface NavigationProps {
  links: NavigationLink[]
}

const Navigation = ({ links }: NavigationProps) => {
  const location = useLocation()

  return (
    <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar-minimal">
      <ul className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium w-full group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground hover:shadow-sm'
                }`}
              >
                <span
                  className={
                    isActive ? '' : 'group-hover:scale-110 transition-transform'
                  }
                >
                  {link.icon}
                </span>
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      
      {/* Quick Access - Link back to marketplace */}
      <div className="mt-4 px-4 pb-4 border-t border-border pt-4">
        <Link
          to="/shop"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Browse Marketplace</span>
        </Link>
      </div>
    </nav>
  )
}

interface MetricDisplayProps {
  metric: MetricInfo
}

const MetricDisplay = ({ metric }: MetricDisplayProps) => {
  const percentage = (metric.value / metric.maxValue) * 100
  const Icon = metric.icon || TrendingUp

  return (
    <div className="px-6 py-5 bg-linear-to-br from-primary/5 to-primary/10 border-t border-border/50 mt-auto">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <div className="text-xs font-semibold text-foreground/80">
          {metric.label}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{metric.value}</span>
          <span className="text-xs text-muted-foreground">
            of {metric.maxValue}
          </span>
        </div>
        <div className="shadow-sm relative h-2.5 bg-background/50 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {metric.description}
        </p>
      </div>
    </div>
  )
}
