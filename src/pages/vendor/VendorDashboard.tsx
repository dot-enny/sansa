
import { TrendingUp, Package, ShoppingBag } from 'lucide-react'
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
        <div className="relative space-y-6">
            {/* Ambient background layers for depth */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>
            
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
        <div className="relative group">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Glassmorphism card */}
            <div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-transparent 
                          backdrop-blur-sm rounded-2xl p-6 
                          border border-primary/20 
                          shadow-lg shadow-primary/10
                          hover:shadow-xl hover:shadow-primary/20
                          transition-all duration-300
                          overflow-hidden">
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                <div className="relative flex items-start gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md" />
                        <div className="relative p-3 bg-primary/20 rounded-xl backdrop-blur-sm">
                            <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                            You're eligible for credit!
                        </h3>
                        <p className="text-sm text-foreground/70 mb-4">
                            Your trust score of <span className="font-bold text-primary">{trustScore}</span> qualifies you for loans up to <span className="font-bold text-foreground">₦5,000,000</span> at competitive rates.
                        </p>
                        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold 
                                         hover:bg-primary/90 hover:scale-105 
                                         shadow-lg shadow-primary/25
                                         transition-all duration-200 cursor-pointer">
                            Apply for Credit →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const QuickActions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Browse Marketplace - Featured prominently */}
            <Link
                to="/shop"
                className="group relative overflow-hidden"
            >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Card */}
                <div className="relative bg-card/60 backdrop-blur-sm rounded-2xl p-6 
                              border border-white/20
                              shadow-lg shadow-secondary/5
                              hover:shadow-xl hover:shadow-secondary/10
                              hover:-translate-y-1
                              transition-all duration-300">
                    
                    {/* Icon */}
                    <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 bg-secondary/20 rounded-xl blur-md" />
                        <div className="relative p-3 bg-linear-to-br from-secondary/10 to-secondary/5 rounded-xl text-secondary
                                      group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                            <ShoppingBag className="w-7 h-7" />
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">Browse Marketplace</h3>
                    <p className="text-sm text-muted-foreground/80 mb-4">
                        Shop products from other vendors
                    </p>
                    <span className="text-sm text-secondary font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Start shopping 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </div>
            </Link>

            <Link
                to="/dashboard/add-product"
                className="group relative overflow-hidden"
            >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Card */}
                <div className="relative bg-card/60 backdrop-blur-sm rounded-2xl p-6 
                              border border-white/20
                              shadow-lg shadow-primary/5
                              hover:shadow-xl hover:shadow-primary/10
                              hover:-translate-y-1
                              transition-all duration-300">
                    
                    {/* Icon */}
                    <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md" />
                        <div className="relative p-3 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl text-primary
                                      group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <Package className="w-7 h-7" />
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">Add New Product</h3>
                    <p className="text-sm text-muted-foreground/80 mb-4">
                        List a new product in your store
                    </p>
                    <span className="text-sm text-primary font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Get started 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </div>
            </Link>

            <button className="group relative overflow-hidden text-left cursor-pointer">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Card */}
                <div className="relative bg-card/60 backdrop-blur-sm rounded-2xl p-6 
                              border border-white/20
                              shadow-lg shadow-primary/5
                              hover:shadow-xl hover:shadow-primary/10
                              hover:-translate-y-1
                              transition-all duration-300">
                    
                    {/* Icon */}
                    <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md" />
                        <div className="relative p-3 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl text-primary
                                      group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">Boost Trust Score</h3>
                    <p className="text-sm text-muted-foreground/80 mb-4">
                        Learn strategies to improve your seller rating
                    </p>
                    <span className="text-sm text-primary font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Learn more 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </div>
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

