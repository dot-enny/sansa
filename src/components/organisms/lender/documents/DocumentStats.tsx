// Document Stats Component - Compact KPI cards

import { FileText, Archive, Clock, HardDrive } from 'lucide-react'
import { formatFileSize } from '@/utils/documentsUtils'

interface DocumentStatsProps {
  stats: {
    total: number
    active: number
    archived: number
    pending: number
    totalSize: number
  }
}

export default function DocumentStats({ stats }: DocumentStatsProps) {
  const cards = [
    {
      label: 'Total Documents',
      value: stats.total,
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: FileText,
      gradient: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/20',
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: Archive,
      gradient: 'from-gray-500 to-gray-600',
      shadow: 'shadow-gray-500/20',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      gradient: 'from-amber-500 to-amber-600',
      shadow: 'shadow-amber-500/20',
    },
    {
      label: 'Total Storage',
      value: formatFileSize(stats.totalSize),
      icon: HardDrive,
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="group relative bg-card/60 backdrop-blur-xl rounded-xl p-3 border border-white/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
            />

            <div className="relative">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-muted-foreground">{card.label}</span>
                <div
                  className={`w-7 h-7 rounded-lg bg-linear-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.shadow}`}
                >
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <p className="text-lg font-bold">{card.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
