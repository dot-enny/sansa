// Custom hook for documents page state management

import { useState, useMemo } from 'react'
import {
  mockDocuments,
  documentCategories,
  getDocumentStats,
  type Document,
  type DocumentType,
  type DocumentStatus,
} from '@/data/lender/mockDocuments'
import {
  searchDocuments,
  filterDocumentsByType,
  filterDocumentsByStatus,
  sortDocuments,
} from '@/utils/documentsUtils'

export type ViewMode = 'grid' | 'list'
export type SortOption = 'date' | 'name' | 'size' | 'type'

export const useDocuments = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<DocumentType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<DocumentStatus[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Filter documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...mockDocuments]

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((doc) => doc.category === selectedCategory)
    }

    // Search
    filtered = searchDocuments(filtered, searchQuery)

    // Filter by type
    filtered = filterDocumentsByType(filtered, selectedTypes)

    // Filter by status
    filtered = filterDocumentsByStatus(filtered, selectedStatuses)

    // Sort
    filtered = sortDocuments(filtered, sortBy, sortOrder)

    return filtered
  }, [searchQuery, selectedCategory, selectedTypes, selectedStatuses, sortBy, sortOrder])

  // Get statistics
  const stats = useMemo(() => getDocumentStats(), [])

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const toggleType = (type: DocumentType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleStatus = (status: DocumentStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const handleSortChange = (sort: SortOption) => {
    if (sortBy === sort) {
      // Toggle order if same sort option
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(sort)
      setSortOrder('desc')
    }
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedTypes([])
    setSelectedStatuses([])
  }

  const openPreview = (document: Document) => {
    setSelectedDocument(document)
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
    setSelectedDocument(null)
  }

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedCategory !== 'All' ||
      selectedTypes.length > 0 ||
      selectedStatuses.length > 0
    )
  }, [searchQuery, selectedCategory, selectedTypes, selectedStatuses])

  return {
    // Data
    documents: filteredDocuments,
    allDocuments: mockDocuments,
    categories: documentCategories,
    stats,

    // State
    searchQuery,
    selectedCategory,
    selectedTypes,
    selectedStatuses,
    viewMode,
    sortBy,
    sortOrder,
    selectedDocument,
    isPreviewOpen,
    hasActiveFilters,

    // Handlers
    handleSearch,
    handleCategoryChange,
    toggleType,
    toggleStatus,
    handleSortChange,
    toggleViewMode,
    clearFilters,
    openPreview,
    closePreview,
  }
}
