import { Plus, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LenderInfo } from '@/data/lender/mockLenderData'

interface HeaderProps {
  lenderInfo: LenderInfo
}

export const Header = ({ lenderInfo }: HeaderProps) => {
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening'

  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {greeting}, {lenderInfo.name.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          Here's an overview of your investment portfolio
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
        <Button className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          New Investment
        </Button>
      </div>
    </div>
  )
}
