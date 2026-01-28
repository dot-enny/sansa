// Opportunities Marketplace - Find vendors to back

import { Sparkles, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOpportunities } from '@/hooks/lender/useOpportunities'
import { mockOpportunities, mockAutoInvestRules, getMarketplaceStats } from '@/data/lender/mockOpportunities'
import { mockWalletBalance } from '@/data/lender/mockWalletData'
import MarketplaceStats from '@/components/organisms/lender/opportunities/MarketplaceStats'
import OpportunityFilters from '@/components/organisms/lender/opportunities/OpportunityFilters'
import OpportunityCard from '@/components/organisms/lender/opportunities/OpportunityCard'

export default function Opportunities() {
  const {
    opportunities,
    searchQuery,
    selectedTerms,
    selectedUseOfFunds,
    selectedCategories,
    viewMode,
    sortBy,
    hasActiveFilters,
    handleSearchChange,
    toggleTerm,
    toggleUseOfFunds,
    toggleCategory,
    toggleViewMode,
    handleSortChange,
    clearAllFilters,
    openDetails,
    openInvest,
    openAutoInvestDialog,
    activeRules,
  } = useOpportunities(mockOpportunities, mockAutoInvestRules)
  
  const marketplaceStats = getMarketplaceStats(opportunities, mockWalletBalance.available)
  const activeRulesCount = activeRules.filter(r => r.isActive).length

  return (
    <div className="relative min-h-screen bg-background pb-12">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        {/* Header - Scrolls naturally */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold">Marketplace</h1>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Discover vendors seeking funding and grow your portfolio
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openAutoInvestDialog}
              className="h-9 px-4 bg-card/60 backdrop-blur-xl border-border/60 hover:bg-card/80"
            >
              <Bot className="w-3.5 h-3.5 sm:mr-2" />
              <span className="hidden sm:inline">Auto-Invest</span>
              {activeRulesCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  {activeRulesCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 sm:px-6 pb-4">
          <MarketplaceStats stats={marketplaceStats} />
        </div>

        {/* Sticky Filters - Sticks to top after scrolling past header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 sm:px-6 py-3">
          <OpportunityFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedTerms={selectedTerms}
            onToggleTerm={toggleTerm}
            selectedUseOfFunds={selectedUseOfFunds}
            onToggleUseOfFunds={toggleUseOfFunds}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            viewMode={viewMode}
            onToggleViewMode={toggleViewMode}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAllFilters}
            resultCount={opportunities.length}
          />
        </div>

        {/* Opportunities Grid/List - Natural scrolling */}
        <div className="px-4 sm:px-6 py-6">
          {opportunities.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                  : 'space-y-3'
              }
            >
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onViewDetails={openDetails}
                  onInvest={openInvest}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {hasActiveFilters ? 'No opportunities match your filters' : 'No opportunities available'}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                {hasActiveFilters
                  ? 'Try adjusting your filters to see more opportunities.'
                  : 'Check back soon for new funding opportunities from vendors.'}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
