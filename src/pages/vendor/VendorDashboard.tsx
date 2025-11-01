
import { TrendingUp, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDashboardStats } from '@/hooks/useDashboardStats'
import { vendorInfo } from '@/data/vendorData'
import { StatsGrid } from '@/components/organisms/vendor/dashboard/StatsGrid'
import { RecentOrdersAndReviews } from '@/components/organisms/vendor/dashboard/RecentOrdersAndReviews'

const VendorDashboard = () => {
    const { stats, recentOrders, reviews, isLoading } = useDashboardStats()
    const { trustScore } = vendorInfo

    if (isLoading) return <LoadingState />

    return (
        <div className="space-y-5">
            <StatsGrid stats={stats} />
            <CreditBanner trustScore={trustScore} />
            <RecentOrdersAndReviews recentOrders={recentOrders} recentReviews={reviews} />
            <QuickActions />
        </div>
    )
}

export default VendorDashboard

// CreditBanner Component
const CreditBanner = ({ trustScore }: { trustScore: number }) => {
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                        You're eligible for credit!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Your trust score of {trustScore} qualifies you for loans up to ₦5,000,000 at competitive rates.
                    </p>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Apply for Credit
                    </button>
                </div>
            </div>
        </div>
    )
}

const QuickActions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
                to="/dashboard/add-product"
                className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30 group"
            >
                <Package className="w-7 h-7 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">Add New Product</h3>
                <p className="text-sm text-muted-foreground mb-3">
                    List a new product in your store
                </p>
                <span className="text-xs text-primary font-medium group-hover:underline">
                    Get started →
                </span>
            </Link>

            <button className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30 group text-left">
                <TrendingUp className="w-7 h-7 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">Boost Trust Score</h3>
                <p className="text-sm text-muted-foreground mb-3">
                    Learn strategies to improve your seller rating
                </p>
                <span className="text-xs text-primary font-medium group-hover:underline">
                    Learn more →
                </span>
            </button>
        </div>
    )
}

const LoadingState = () => {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )
}

