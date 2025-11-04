import type { DashboardStat } from '@/hooks/useDashboardStats'
import { ShoppingBag, TrendingUp, DollarSign, Package } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const StatsGrid = ({ stats }: { stats: DashboardStat[] }) => {
    return (
        <div className="relative">
            {/* Background gradient layer for depth */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-secondary/3 rounded-2xl blur-3xl -z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} index={index} />
                ))}
            </div>
        </div>
    )
}

const iconMap = {
    DollarSign: DollarSign,
    ShoppingBag: ShoppingBag,
    Package: Package,
    TrendingUp: TrendingUp,
}

const StatCard = ({ stat, index }: { stat: DashboardStat; index: number }) => {
    const IconComponent = iconMap[stat.icon as keyof typeof iconMap]
    const cardRef = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!cardRef.current) return
            
            const scrollProgress = window.scrollY
            
            // Different parallax speeds for each card creating depth
            const parallaxSpeed = 0.1 + (index * 0.05)
            const newOffset = scrollProgress * parallaxSpeed
            
            setOffset(newOffset)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [index])

    return (
        <div
            ref={cardRef}
            className="group relative"
            style={{
                transform: `translateY(-${offset}px)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* Floating glassmorphism card */}
            <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl p-6 
                          shadow-lg shadow-primary/5
                          hover:shadow-xl hover:shadow-primary/10
                          border border-white/20
                          transition-all duration-300
                          hover:-translate-y-1
                          overflow-hidden">
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        {/* Icon with floating effect */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md" />
                            <div className="relative p-3 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl text-primary
                                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                <IconComponent className="w-6 h-6" />
                            </div>
                        </div>
                        
                        {/* Change indicator */}
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm
                                       ${stat.positive
                                ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                                : 'bg-red-500/20 text-red-700 border border-red-500/30'
                            }`}>
                            {stat.change}
                        </span>
                    </div>
                    
                    {/* Value with gradient */}
                    <div className="text-3xl font-bold mb-1 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm font-medium text-muted-foreground/80">
                        {stat.label}
                    </div>
                </div>
            </div>
        </div>
    )
}
