// Lender Investments page - view and manage all investments

import React from 'react'
import { useInvestments } from '@/hooks/lender/useInvestments'
import { mockInvestments } from '@/data/lender/mockInvestments'
import { Header } from '@/components/organisms/lender/investments/Header'
import { SearchBar } from '@/components/organisms/lender/investments/SearchBar'
import { FiltersBar } from '@/components/organisms/lender/investments/FiltersBar'
import { InvestmentsTable } from '@/components/organisms/lender/investments/InvestmentsTable'
import { InvestmentDetailsDialog } from '@/components/organisms/lender/investments/InvestmentDetailsDialog'
import { EmptyState } from '@/components/organisms/lender/investments/EmptyState'

const Investments: React.FC = () => {
  const {
    filteredInvestments,
    summaryStats,
    searchQuery,
    setSearchQuery,
    statusFilters,
    toggleStatusFilter,
    riskFilters,
    toggleRiskFilter,
    sortBy,
    handleSortChange,
    clearAllFilters,
    hasActiveFilters,
    selectedInvestment,
    isDetailsDialogOpen,
    handleViewDetails,
    handleCloseDetails,
  } = useInvestments(mockInvestments)

  return (
    <div className="relative max-w-7xl mx-auto pb-12">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-linear-to-br from-blue-500/8 to-transparent rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-linear-to-tr from-green-500/6 to-transparent rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: '9s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-linear-to-bl from-purple-500/4 to-transparent rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '15s', animationDelay: '5s' }}
        />
      </div>

      {/* Header with summary stats */}
      <Header
        totalInvested={summaryStats.totalInvested}
        totalReturns={summaryStats.totalReturns}
        activeCount={summaryStats.activeCount}
      />

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FiltersBar
          statusFilters={statusFilters}
          riskFilters={riskFilters}
          onToggleStatus={toggleStatusFilter}
          onToggleRisk={toggleRiskFilter}
          onClearAll={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredInvestments.length}
        />
      </div>

      {/* Investments table or empty state */}
      {filteredInvestments.length > 0 ? (
        <InvestmentsTable
          investments={filteredInvestments}
          onViewDetails={handleViewDetails}
          sortBy={sortBy}
          onSort={handleSortChange}
        />
      ) : (
        <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearAllFilters} />
      )}

      {/* Investment details dialog */}
      <InvestmentDetailsDialog
        investment={selectedInvestment}
        isOpen={isDetailsDialogOpen}
        onClose={handleCloseDetails}
      />
    </div>
  )
}

export default Investments
