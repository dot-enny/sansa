import React from 'react'
import { LayoutDashboard, ShoppingBag, TrendingUp, DollarSign, Package, AlertCircle } from 'lucide-react'

const VendorDashboard: React.FC = () => {
  // This would come from your auth context or API
  const storeName = "StoreName"
  const creditScore = 750

  const stats = [
    {
      label: "Total Sales",
      value: "₦2,450,000",
      change: "+12.5%",
      icon: <DollarSign className="w-5 h-5" />,
      positive: true
    },
    {
      label: "Orders",
      value: "156",
      change: "+8.2%",
      icon: <ShoppingBag className="w-5 h-5" />,
      positive: true
    },
    {
      label: "Products",
      value: "48",
      change: "+3",
      icon: <Package className="w-5 h-5" />,
      positive: true
    },
    {
      label: "Credit Score",
      value: creditScore,
      change: "+15 pts",
      icon: <TrendingUp className="w-5 h-5" />,
      positive: true
    }
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "₦45,000", status: "Pending", date: "2 hours ago" },
    { id: "ORD-002", customer: "Jane Smith", amount: "₦32,500", status: "Completed", date: "5 hours ago" },
    { id: "ORD-003", customer: "Mike Johnson", amount: "₦68,000", status: "Processing", date: "1 day ago" }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Welcome back, {storeName}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your store today
            </p>
          </div>
          <LayoutDashboard className="w-12 h-12 text-primary/20" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {stat.icon}
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.positive 
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
        ))}
      </div>

      {/* Credit Eligibility Alert */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              You're eligible for credit!
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Your credit score of {creditScore} qualifies you for loans up to ₦5,000,000 at competitive rates.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Apply for Credit
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{order.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer} · {order.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{order.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border text-center">
          <button className="text-sm text-primary font-medium hover:underline">
            View all orders →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <Package className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-1">Add New Product</h3>
          <p className="text-sm text-muted-foreground mb-4">
            List a new product in your store
          </p>
          <button className="text-sm text-primary font-medium hover:underline">
            Get started →
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <AlertCircle className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-1">Improve Credit Score</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Learn how to boost your creditworthiness
          </p>
          <button className="text-sm text-primary font-medium hover:underline">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
