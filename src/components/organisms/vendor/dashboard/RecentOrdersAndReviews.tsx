import type { RecentOrder, Review } from "@/hooks/useDashboardStats"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

interface RecentsProps {
    recentOrders: RecentOrder[],
    recentReviews: Review[],
}

export const RecentOrdersAndReviews = ({ recentReviews, recentOrders }: RecentsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent Orders - Compact */}
            <div className="bg-card rounded-lg border border-border shadow-sm">
                <div className="px-5 py-3 border-b border-border">
                    <h2 className="text-base font-semibold text-foreground">Recent Orders</h2>
                </div>
                <div className="divide-y divide-border">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="px-5 py-3 hover:bg-accent/50 transition-colors">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm font-semibold text-foreground">{order.id}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${order.status === 'Completed'
                                            ? 'bg-green-100 text-green-700'
                                            : order.status === 'Processing'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {order.customer} · {order.date}
                                    </div>
                                </div>
                                <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                                    {order.amount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-5 py-2.5 border-t border-border text-center">
                    <Link to="/dashboard/orders" className="text-xs text-primary font-medium hover:underline">
                        View all orders →
                    </Link>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-card rounded-lg border border-border shadow-sm">
                <div className="px-5 py-3 border-b border-border">
                    <h2 className="text-base font-semibold text-foreground">Recent Reviews</h2>
                </div>
                <div className="divide-y divide-border">
                    {recentReviews.map((review) => (
                        <div key={review.id} className="px-5 py-3 hover:bg-accent/50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-primary font-semibold text-xs">
                                        {review.customer.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-foreground">{review.customer}</span>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                        {review.comment}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="truncate">{review.productName}</span>
                                        <span>·</span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-5 py-2.5 border-t border-border text-center">
                    <button className="text-xs text-primary font-medium hover:underline">
                        View all reviews →
                    </button>
                </div>
            </div>
        </div>
    )
}
