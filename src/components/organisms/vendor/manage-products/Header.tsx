import { Link } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="group-hover:underline underline-offset-4">Back to Dashboard</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Manage Products</h1>
        <p className="text-muted-foreground text-sm">
          View and manage your product inventory
        </p>
      </div>
      <Button
        asChild
        className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
      >
        <Link to="/dashboard/add-product">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </Button>
    </div>
  )
}
