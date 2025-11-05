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
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative h-full flex flex-col max-w-[1600px] mx-auto">
        {/* Compact Header */}
        <div className="shrink-0 px-4 sm:px-6 py-4 pb-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your investment agreements, receipts, and reports
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="shrink-0 px-4 sm:px-6 py-4">
          <DocumentStats stats={stats} />
        </div>

        {/* Filters */}
        <div className="shrink-0 px-4 sm:px-6 pb-4">
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

        {/* Scrollable Documents Grid/List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 custom-scrollbar">
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
