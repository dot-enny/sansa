// Document Filters Component - Compact design

import { Search, X, Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { DocumentType, DocumentStatus } from '@/data/lender/mockDocuments'
import type { ViewMode, SortOption } from '@/hooks/lender/useDocuments'
import {
  getDocumentTypeLabel,
  getDocumentStatusLabel,
} from '@/utils/documentsUtils'

interface DocumentFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTypes: DocumentType[]
  onToggleType: (type: DocumentType) => void
  selectedStatuses: DocumentStatus[]
  onToggleStatus: (status: DocumentStatus) => void
  viewMode: ViewMode
  onToggleViewMode: () => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
  resultCount: number
}

const documentTypes: DocumentType[] = [
  'agreement',
  'contract',
  'invoice',
  'receipt',
  'statement',
  'report',
  'certificate',
]

const documentStatuses: DocumentStatus[] = ['active', 'archived', 'pending', 'expired']

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'name', label: 'Name' },
  { value: 'size', label: 'Size' },
  { value: 'type', label: 'Type' },
]

export default function DocumentFilters({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onToggleType,
  selectedStatuses,
  onToggleStatus,
  viewMode,
  onToggleViewMode,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  resultCount,
}: DocumentFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-9 pr-9 bg-card/60 backdrop-blur-xl border-white/60"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleViewMode}
            className="h-10 px-3 bg-card/60 backdrop-blur-xl border-white/60"
          >
            {viewMode === 'grid' ? (
              <>
                <List className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">List</span>
              </>
            ) : (
              <>
                <Grid3x3 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Grid</span>
              </>
            )}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-1 bg-card/60 backdrop-blur-xl rounded-lg p-1 border border-white/60">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className="h-8 px-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Type Filters */}
      <div className="bg-card/40 backdrop-blur-xl rounded-lg p-3 border border-white/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Document Type</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {documentTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/20 transition-colors text-xs px-2 py-0.5"
              onClick={() => onToggleType(type)}
            >
              {getDocumentTypeLabel(type)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="bg-card/40 backdrop-blur-xl rounded-lg p-3 border border-white/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Status</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {documentStatuses.map((status) => (
            <Badge
              key={status}
              variant={selectedStatuses.includes(status) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/20 transition-colors text-xs px-2 py-0.5"
              onClick={() => onToggleStatus(status)}
            >
              {getDocumentStatusLabel(status)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results count and Clear filters */}
      {(hasActiveFilters || resultCount > 0) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {resultCount} document{resultCount !== 1 ? 's' : ''} found
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-7 px-2 text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
