// Search bar component for Investments page

import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by vendor name, ID, or category...',
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-11 h-12 bg-card/60 backdrop-blur-xl border-border/60 shadow-md shadow-black/5 focus:shadow-lg focus:shadow-primary/10 focus:border-primary/60 transition-all"
      />
    </div>
  )
}
