// Vendor Dashboard Data
// This file contains mock data for vendor dashboard components
// Replace with actual API calls in production

export const vendorInfo = {
  storeName: "Afro Vibes",
  vendorName: "Afro Vibes",
  trustScore: 750,
  maxTrustScore: 1000
}

export const dashboardStats = [
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

export const recentOrders = [
  { id: "ORD-001", customer: "Chioma Adebayo", amount: "₦45,000", status: "Pending" as const, date: "2 hours ago" },
  { id: "ORD-002", customer: "Tunde Bakare", amount: "₦32,500", status: "Completed" as const, date: "5 hours ago" },
  { id: "ORD-003", customer: "Amara Nwosu", amount: "₦68,000", status: "Processing" as const, date: "1 day ago" }
]

export const customerReviews = [
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
