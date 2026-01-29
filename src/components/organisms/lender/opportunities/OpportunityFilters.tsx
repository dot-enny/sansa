// OpportunityFilters - Comprehensive filtering interface for marketplace

import { Search, X, SlidersHorizontal, Grid3x3, List, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UseOfFunds, VendorCategory } from '@/data/lender/mockOpportunities'
import { getSortLabel, type SortOption, getUseOfFundsLabel, getCategoryLabel } from '@/utils/lender/opportunitiesUtils'

interface OpportunityFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTerms: number[]
  onToggleTerm: (term: number) => void
  selectedUseOfFunds: UseOfFunds[]
  onToggleUseOfFunds: (use: UseOfFunds) => void
  selectedCategories: VendorCategory[]
  onToggleCategory: (category: VendorCategory) => void
  viewMode: 'grid' | 'list'
  onToggleViewMode: () => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
  resultCount: number
}

export default function OpportunityFilters({
  searchQuery,
  onSearchChange,
  selectedTerms,
  onToggleTerm,
  selectedUseOfFunds,
  onToggleUseOfFunds,
  selectedCategories,
  onToggleCategory,
  viewMode,
  onToggleViewMode,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  resultCount,
}: OpportunityFiltersProps) {
  const availableTerms = [3, 6, 9, 12]
  
  const availableUseOfFunds: UseOfFunds[] = [
    'inventory',
    'marketing',
    'equipment',
    'expansion',
    'working-capital',
    'technology',
  ]
  
  const availableCategories: VendorCategory[] = [
    'fashion',
    'electronics',
    'home-garden',
    'beauty-health',
    'food-beverage',
    'sports-outdoors',
  ]
  
  const sortOptions: SortOption[] = [
    'score-desc',
    'score-asc',
    'amount-desc',
    'amount-asc',
    'apr-desc',
    'apr-asc',
    'term-asc',
    'expiry-asc',
    'newest',
    'popular',
  ]

  return (
    <div className="space-y-3">
      {/* Top Row - Search, View, Sort */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search vendors, categories, or use of funds..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-10 bg-card/40 backdrop-blur-xl border-border/60"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* View Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleViewMode}
          className="h-10 px-3 bg-card/40 backdrop-blur-xl border-border/60"
        >
          {viewMode === 'grid' ? (
            <>
              <List className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">List</span>
            </>
          ) : (
            <>
              <Grid3x3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Grid</span>
            </>
          )}
        </Button>
        
        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-xl border-border/60">
            <TrendingDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {getSortLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Filter Pills Row */}
      <div className="space-y-2">
        {/* Loan Terms */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Loan Term:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTerms.map((term) => (
              <Badge
                key={term}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  selectedTerms.includes(term)
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                }`}
                onClick={() => onToggleTerm(term)}
              >
                {term} {term === 1 ? 'month' : 'months'}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Use of Funds */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Use of Funds:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableUseOfFunds.map((use) => (
              <Badge
                key={use}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  selectedUseOfFunds.includes(use)
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                }`}
                onClick={() => onToggleUseOfFunds(use)}
              >
                {getUseOfFundsLabel(use)}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                }`}
                onClick={() => onToggleCategory(category)}
              >
                {getCategoryLabel(category)}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Results and Clear Filters */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultCount}</span> {resultCount === 1 ? 'opportunity' : 'opportunities'} found
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs hover:text-primary"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
