// Documents Page - Compact, height-constrained design

import { FileText, FolderOpen } from 'lucide-react'
import { useDocuments } from '@/hooks/lender/useDocuments'
import DocumentStats from '@/components/organisms/lender/documents/DocumentStats'
import DocumentFilters from '@/components/organisms/lender/documents/DocumentFilters'
import DocumentCard from '@/components/organisms/lender/documents/DocumentCard'

export default function Documents() {
  const {
    documents,
    stats,
    searchQuery,
    selectedTypes,
    selectedStatuses,
    viewMode,
    sortBy,
    hasActiveFilters,
    handleSearch,
    toggleType,
    toggleStatus,
    toggleViewMode,
    handleSortChange,
    clearFilters,
    openPreview,
  } = useDocuments()

  return (
    <div className="relative min-h-screen bg-background pb-12">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        {/* Header with inline stats - Scrolls naturally */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage your investment agreements, receipts, and reports
              </p>
            </div>

            {/* Compact inline stats for large screens */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/40 backdrop-blur-xl border border-border/40">
                <FileText className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="text-sm font-semibold">{stats.total}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/40 backdrop-blur-xl border border-border/40">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Active</div>
                  <div className="text-sm font-semibold">{stats.active}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/40 backdrop-blur-xl border border-border/40">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                  <div className="text-sm font-semibold">{stats.pending}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full stats for mobile/tablet */}
          <div className="lg:hidden">
            <DocumentStats stats={stats} />
          </div>
        </div>

        {/* Sticky Filters - Sticks to top after scrolling past header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 sm:px-6 py-3">
          <DocumentFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            selectedStatuses={selectedStatuses}
            onToggleStatus={toggleStatus}
            viewMode={viewMode}
            onToggleViewMode={toggleViewMode}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            resultCount={documents.length}
          />
        </div>

        {/* Documents Grid/List - Natural scrolling */}
        <div className="px-4 sm:px-6 py-6">
          {documents.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                  : 'space-y-3'
              }
            >
              {documents.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onPreview={openPreview}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                {hasActiveFilters ? (
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                ) : (
                  <FileText className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {hasActiveFilters ? 'No documents found' : 'No documents yet'}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search query to find what you\'re looking for.'
                  : 'Your investment documents will appear here once they are generated.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
