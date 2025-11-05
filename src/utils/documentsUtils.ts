// Utility functions for documents management

import type { Document, DocumentType, DocumentStatus } from '@/data/lender/mockDocuments'

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`
}

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Format date - relative
export const formatDateRelative = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Get document type label
export const getDocumentTypeLabel = (type: DocumentType): string => {
  const labels: Record<DocumentType, string> = {
    agreement: 'Agreement',
    invoice: 'Invoice',
    receipt: 'Receipt',
    contract: 'Contract',
    statement: 'Statement',
    report: 'Report',
    certificate: 'Certificate',
    other: 'Other',
  }
  return labels[type]
}

// Get document type icon name (Lucide icon names)
export const getDocumentTypeIcon = (type: DocumentType): string => {
  const icons: Record<DocumentType, string> = {
    agreement: 'FileText',
    invoice: 'FileSpreadsheet',
    receipt: 'Receipt',
    contract: 'ScrollText',
    statement: 'FileBarChart',
    report: 'FileLineChart',
    certificate: 'Award',
    other: 'File',
  }
  return icons[type]
}

// Get document type color
export const getDocumentTypeColor = (type: DocumentType): string => {
  const colors: Record<DocumentType, string> = {
    agreement: 'from-blue-500 to-blue-600',
    invoice: 'from-green-500 to-green-600',
    receipt: 'from-emerald-500 to-emerald-600',
    contract: 'from-purple-500 to-purple-600',
    statement: 'from-indigo-500 to-indigo-600',
    report: 'from-amber-500 to-amber-600',
    certificate: 'from-teal-500 to-teal-600',
    other: 'from-gray-500 to-gray-600',
  }
  return colors[type]
}

// Get document status label
export const getDocumentStatusLabel = (status: DocumentStatus): string => {
  const labels: Record<DocumentStatus, string> = {
    active: 'Active',
    archived: 'Archived',
    expired: 'Expired',
    pending: 'Pending',
  }
  return labels[status]
}

// Get document status color
export const getDocumentStatusColor = (status: DocumentStatus): string => {
  const colors: Record<DocumentStatus, string> = {
    active: 'bg-green-100 text-green-700 border-green-200',
    archived: 'bg-gray-100 text-gray-700 border-gray-200',
    expired: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
  }
  return colors[status]
}

// Get file type icon
export const getFileTypeIcon = (fileType: string): string => {
  const icons: Record<string, string> = {
    pdf: 'FileText',
    docx: 'FileText',
    xlsx: 'FileSpreadsheet',
    png: 'Image',
    jpg: 'Image',
    jpeg: 'Image',
  }
  return icons[fileType.toLowerCase()] || 'File'
}

// Get file type color
export const getFileTypeColor = (fileType: string): string => {
  const colors: Record<string, string> = {
    pdf: 'text-red-600',
    docx: 'text-blue-600',
    xlsx: 'text-green-600',
    png: 'text-purple-600',
    jpg: 'text-purple-600',
    jpeg: 'text-purple-600',
  }
  return colors[fileType.toLowerCase()] || 'text-gray-600'
}

// Search documents
export const searchDocuments = (documents: Document[], query: string): Document[] => {
  if (!query.trim()) return documents

  const lowerQuery = query.toLowerCase()
  return documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.vendorName.toLowerCase().includes(lowerQuery) ||
      doc.description?.toLowerCase().includes(lowerQuery) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      doc.id.toLowerCase().includes(lowerQuery)
  )
}

// Filter documents by type
export const filterDocumentsByType = (
  documents: Document[],
  types: DocumentType[]
): Document[] => {
  if (types.length === 0) return documents
  return documents.filter((doc) => types.includes(doc.type))
}

// Filter documents by status
export const filterDocumentsByStatus = (
  documents: Document[],
  statuses: DocumentStatus[]
): Document[] => {
  if (statuses.length === 0) return documents
  return documents.filter((doc) => statuses.includes(doc.status))
}

// Filter documents by date range
export const filterDocumentsByDateRange = (
  documents: Document[],
  startDate?: string,
  endDate?: string
): Document[] => {
  if (!startDate && !endDate) return documents

  return documents.filter((doc) => {
    const docDate = new Date(doc.date)
    if (startDate && docDate < new Date(startDate)) return false
    if (endDate && docDate > new Date(endDate)) return false
    return true
  })
}

// Sort documents
export const sortDocuments = (
  documents: Document[],
  sortBy: 'date' | 'name' | 'size' | 'type',
  order: 'asc' | 'desc' = 'desc'
): Document[] => {
  const sorted = [...documents].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'name':
        comparison = a.title.localeCompare(b.title)
        break
      case 'size':
        comparison = a.size - b.size
        break
      case 'type':
        comparison = a.type.localeCompare(b.type)
        break
    }

    return order === 'asc' ? comparison : -comparison
  })

  return sorted
}

// Group documents by month
export const groupDocumentsByMonth = (documents: Document[]): Record<string, Document[]> => {
  const grouped: Record<string, Document[]> = {}

  documents.forEach((doc) => {
    const date = new Date(doc.date)
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }
    grouped[monthKey].push(doc)
  })

  return grouped
}

// Group documents by vendor
export const groupDocumentsByVendor = (documents: Document[]): Record<string, Document[]> => {
  const grouped: Record<string, Document[]> = {}

  documents.forEach((doc) => {
    if (!grouped[doc.vendorName]) {
      grouped[doc.vendorName] = []
    }
    grouped[doc.vendorName].push(doc)
  })

  return grouped
}

// Download document (mock)
export const downloadDocument = (document: Document): void => {
  console.log(`Downloading document: ${document.title}`)
  // In a real app, this would trigger actual download
  // For now, just log to console
  alert(`Downloading: ${document.title}\nSize: ${formatFileSize(document.size)}`)
}

// Preview document (mock)
export const previewDocument = (document: Document): void => {
  console.log(`Previewing document: ${document.title}`)
  // In a real app, this would open document preview
}

// Share document (mock)
export const shareDocument = (document: Document): void => {
  console.log(`Sharing document: ${document.title}`)
  alert(`Share link copied for: ${document.title}`)
}

// Delete document (mock)
export const deleteDocument = (documentId: string): void => {
  console.log(`Deleting document: ${documentId}`)
  alert(`Document ${documentId} deleted`)
}
