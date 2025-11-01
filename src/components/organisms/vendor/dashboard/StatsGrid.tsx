import type { DashboardStat } from '@/hooks/useDashboardStats'
import { ShoppingBag, TrendingUp, DollarSign, Package, Star } from 'lucide-react'

export const StatsGrid = ({ stats }: { stats: DashboardStat[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
            {
                stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))
            }
        </div >
    )
}

const iconMap = {
    DollarSign: DollarSign,
    ShoppingBag: ShoppingBag,
    Package: Package,
    TrendingUp: TrendingUp,
}

const StatCard = ({ stat }: { stat: any }) => {
    const IconComponent = iconMap[stat.icon as keyof typeof iconMap]

    return (
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <IconComponent className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.positive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {stat.change}
                </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
                {stat.label}
            </div>
        </div>
    )
}
