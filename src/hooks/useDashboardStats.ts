import { useState, useEffect } from 'react'

export interface DashboardStat {
  label: string
  value: string | number
  change: string
  icon: string
  positive: boolean
}

export interface RecentOrder {
  id: string
  customer: string
  amount: string
  status: 'Pending' | 'Processing' | 'Completed' | 'Shipped' | 'Delivered'
  date: string
}

export interface Review {
  id: string
  customer: string
  rating: number
  comment: string
  date: string
  productName: string
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual API calls later
    const fetchDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // In real implementation, fetch from API
      const dashboardStats: DashboardStat[] = [
        {
          label: "Total Sales",
          value: "₦2,450,000",
          change: "+12.5%",
          icon: "DollarSign",
          positive: true
        },
        {
          label: "Orders",
          value: "156",
          change: "+8.2%",
          icon: "ShoppingBag",
          positive: true
        },
        {
          label: "Products",
          value: "48",
          change: "+3",
          icon: "Package",
          positive: true
        },
        {
          label: "Trust Score",
          value: 750,
          change: "+15 pts",
          icon: "TrendingUp",
          positive: true
        }
      ]

      const orders: RecentOrder[] = [
        { id: "ORD-001", customer: "Chioma Adebayo", amount: "₦45,000", status: "Pending", date: "2 hours ago" },
        { id: "ORD-002", customer: "Tunde Bakare", amount: "₦32,500", status: "Completed", date: "5 hours ago" },
        { id: "ORD-003", customer: "Amara Nwosu", amount: "₦68,000", status: "Processing", date: "1 day ago" }
      ]

      const customerReviews: Review[] = [
        {
          id: "REV-001",
          customer: "Ngozi Okonkwo",
          rating: 5,
          comment: "Excellent quality! Fast delivery and beautiful packaging.",
          date: "1 day ago",
          productName: "Ankara Print Dress"
        },
        {
          id: "REV-002",
          customer: "Ibrahim Yusuf",
          rating: 4,
          comment: "Good product, matches description. Will order again.",
          date: "2 days ago",
          productName: "Traditional Kaftan"
        },
        {
          id: "REV-003",
          customer: "Blessing Eze",
          rating: 5,
          comment: "Absolutely love it! The fabric is premium quality.",
          date: "3 days ago",
          productName: "Aso-Ebi Set"
        }
      ]

      setStats(dashboardStats)
      setRecentOrders(orders)
      setReviews(customerReviews)
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  return {
    stats,
    recentOrders,
    reviews,
    isLoading
  }
}
