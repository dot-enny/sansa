import type { RecentOrder, Review } from "@/hooks/useDashboardStats"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

interface RecentsProps {
    recentOrders: RecentOrder[],
    recentReviews: Review[],
}

export const RecentOrdersAndReviews = ({ recentReviews, recentOrders }: RecentsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            <RecentOrders recentOrders={recentOrders} />
            <RecentReviews recentReviews={recentReviews} />
        </div>
    )
}


const RecentOrders = ({ recentOrders }: { recentOrders: RecentOrder[] }) => {
    return (
        <div className="space-y-3">
            {/* Minimal header */}
            <div className="flex items-center justify-between px-1">
                <h4 className="font-semibold text-foreground/70">Recent Orders</h4>
                <Link to="/dashboard/orders" className="text-xs text-primary font-medium hover:underline">
                    View all →
                </Link>
            </div>

            {/* Clean list items */}
            <div className="space-y-2">
                {recentOrders.map((order) => (
                    <div
                        key={order.id}
                        className="group px-1 py-3.5 rounded-xl over:bg-card/60 over:backdrop-blur-sm transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-foreground">{order.id}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm ${order.status === 'Completed'
                                        ? 'bg-green-500/15 text-green-700 border border-green-500/20'
                                        : order.status === 'Processing'
                                            ? 'bg-blue-500/15 text-blue-700 border border-blue-500/20'
                                            : 'bg-amber-500/15 text-amber-700 border border-amber-500/20'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {order.customer} · {order.date}
                                </div>
                            </div>
                            <div className="text-sm font-bold text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                                {order.amount}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const RecentReviews = ({ recentReviews }: { recentReviews: Review[] }) => {
    return (
        <div className="space-y-3">
            {/* Minimal header */}
            <div className="flex items-center justify-between px-1">
                <h4 className="font-semibold text-foreground/70">Recent Reviews</h4>
                <button className="text-xs text-primary font-medium hover:underline">
                    View all →
                </button>
            </div>

            {/* Clean list items */}
            <div className="space-y-2">
                {recentReviews.map((review) => (
                    <div
                        key={review.id}
                        className="group px- py-3.5 rounded-xl over:bg-card/60 over:backdrop-blur-sm transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-start gap-3">
                            {/* Avatar with subtle glow */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative w-9 h-9 rounded-full bg-linear-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                                    <span className="text-primary font-bold text-xs">
                                        {review.customer.charAt(0)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-sm font-bold text-foreground">{review.customer}</span>
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-foreground/70 line-clamp-2 mb-1.5 leading-relaxed">
                                    "{review.comment}"
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="truncate font-medium">{review.productName}</span>
                                    <span>·</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}