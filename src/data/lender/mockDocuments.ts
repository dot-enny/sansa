// Documents data structures and mock data for lender documents page

export type DocumentType = 
  | 'agreement'
  | 'invoice'
  | 'receipt'
  | 'contract'
  | 'statement'
  | 'report'
  | 'certificate'
  | 'other'

export type DocumentStatus = 'active' | 'archived' | 'expired' | 'pending'

export interface Document {
  id: string
  title: string
  type: DocumentType
  category: string
  vendorName: string
  investmentId: string
  date: string
  size: number // in bytes
  fileType: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg'
  status: DocumentStatus
  description?: string
  downloadUrl?: string
  tags?: string[]
}

// Mock documents data
export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    title: 'Investment Agreement - TechFlow Solutions',
    type: 'agreement',
    category: 'Legal',
    vendorName: 'TechFlow Solutions',
    investmentId: 'INV-001',
    date: '2025-03-15',
    size: 524288, // 512 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Primary investment agreement outlining terms and conditions',
    tags: ['legal', 'agreement', 'signed'],
  },
  {
    id: 'DOC-002',
    title: 'Monthly Returns Statement - March 2025',
    type: 'statement',
    category: 'Financial',
    vendorName: 'TechFlow Solutions',
    investmentId: 'INV-001',
    date: '2025-03-31',
    size: 245760, // 240 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Detailed breakdown of returns and payments for March',
    tags: ['financial', 'returns', 'march'],
  },
  {
    id: 'DOC-003',
    title: 'Payment Receipt #1234',
    type: 'receipt',
    category: 'Financial',
    vendorName: 'GreenHarvest Farms',
    investmentId: 'INV-002',
    date: '2025-04-01',
    size: 102400, // 100 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Receipt for payment received on April 1, 2025',
    tags: ['payment', 'receipt'],
  },
  {
    id: 'DOC-004',
    title: 'Q1 2025 Performance Report',
    type: 'report',
    category: 'Reports',
    vendorName: 'Multiple Vendors',
    investmentId: 'ALL',
    date: '2025-04-05',
    size: 1048576, // 1 MB
    fileType: 'pdf',
    status: 'active',
    description: 'Comprehensive quarterly performance report across all investments',
    tags: ['quarterly', 'performance', 'q1'],
  },
  {
    id: 'DOC-005',
    title: 'Tax Certificate 2024',
    type: 'certificate',
    category: 'Tax',
    vendorName: 'Platform',
    investmentId: 'ALL',
    date: '2025-01-15',
    size: 358400, // 350 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Annual tax certificate for investment income',
    tags: ['tax', '2024', 'certificate'],
  },
  {
    id: 'DOC-006',
    title: 'Investment Contract - Digital Retail Hub',
    type: 'contract',
    category: 'Legal',
    vendorName: 'Digital Retail Hub',
    investmentId: 'INV-003',
    date: '2025-02-20',
    size: 614400, // 600 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Legal contract for investment in e-commerce infrastructure',
    tags: ['contract', 'legal', 'signed'],
  },
  {
    id: 'DOC-007',
    title: 'Invoice #INV-2025-001',
    type: 'invoice',
    category: 'Financial',
    vendorName: 'Industrial Motors Ltd',
    investmentId: 'INV-004',
    date: '2025-03-10',
    size: 204800, // 200 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Invoice for manufacturing equipment investment',
    tags: ['invoice', 'payment-due'],
  },
  {
    id: 'DOC-008',
    title: 'Monthly Returns Statement - February 2025',
    type: 'statement',
    category: 'Financial',
    vendorName: 'TechFlow Solutions',
    investmentId: 'INV-001',
    date: '2025-02-28',
    size: 235520, // 230 KB
    fileType: 'pdf',
    status: 'archived',
    description: 'Returns statement for February',
    tags: ['financial', 'returns', 'february'],
  },
  {
    id: 'DOC-009',
    title: 'Due Diligence Report - LogiTech Systems',
    type: 'report',
    category: 'Reports',
    vendorName: 'LogiTech Systems',
    investmentId: 'INV-005',
    date: '2024-12-15',
    size: 2097152, // 2 MB
    fileType: 'pdf',
    status: 'archived',
    description: 'Comprehensive due diligence report conducted before investment',
    tags: ['due-diligence', 'research'],
  },
  {
    id: 'DOC-010',
    title: 'Amendment Agreement - TechFlow Solutions',
    type: 'agreement',
    category: 'Legal',
    vendorName: 'TechFlow Solutions',
    investmentId: 'INV-001',
    date: '2025-04-10',
    size: 419840, // 410 KB
    fileType: 'pdf',
    status: 'pending',
    description: 'Amendment to original agreement - pending signature',
    tags: ['amendment', 'pending', 'legal'],
  },
  {
    id: 'DOC-011',
    title: 'Payment Receipt #1156',
    type: 'receipt',
    category: 'Financial',
    vendorName: 'GreenHarvest Farms',
    investmentId: 'INV-002',
    date: '2025-03-01',
    size: 98304, // 96 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Receipt for March payment',
    tags: ['payment', 'receipt'],
  },
  {
    id: 'DOC-012',
    title: 'Annual Report 2024',
    type: 'report',
    category: 'Reports',
    vendorName: 'Platform',
    investmentId: 'ALL',
    date: '2025-01-20',
    size: 3145728, // 3 MB
    fileType: 'pdf',
    status: 'active',
    description: 'Complete annual report for 2024 investment performance',
    tags: ['annual', '2024', 'comprehensive'],
  },
  {
    id: 'DOC-013',
    title: 'Insurance Certificate',
    type: 'certificate',
    category: 'Insurance',
    vendorName: 'Platform',
    investmentId: 'ALL',
    date: '2025-01-01',
    size: 409600, // 400 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Investment insurance coverage certificate',
    tags: ['insurance', 'coverage'],
  },
  {
    id: 'DOC-014',
    title: 'Investment Agreement - GreenHarvest Farms',
    type: 'agreement',
    category: 'Legal',
    vendorName: 'GreenHarvest Farms',
    investmentId: 'INV-002',
    date: '2024-12-01',
    size: 538624, // 526 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Main investment agreement for agricultural expansion',
    tags: ['agriculture', 'agreement', 'signed'],
  },
  {
    id: 'DOC-015',
    title: 'Compliance Certificate 2025',
    type: 'certificate',
    category: 'Compliance',
    vendorName: 'Platform',
    investmentId: 'ALL',
    date: '2025-01-10',
    size: 327680, // 320 KB
    fileType: 'pdf',
    status: 'active',
    description: 'Regulatory compliance certification',
    tags: ['compliance', 'regulatory'],
  },
]

// Document categories
export const documentCategories = [
  'All',
  'Legal',
  'Financial',
  'Reports',
  'Tax',
  'Insurance',
  'Compliance',
] as const

// Get documents by type
export const getDocumentsByType = (type: DocumentType): Document[] => {
  return mockDocuments.filter((doc) => doc.type === type)
}

// Get documents by status
export const getDocumentsByStatus = (status: DocumentStatus): Document[] => {
  return mockDocuments.filter((doc) => doc.status === status)
}

// Get documents by vendor
export const getDocumentsByVendor = (vendorName: string): Document[] => {
  return mockDocuments.filter((doc) => doc.vendorName === vendorName)
}

// Get documents by category
export const getDocumentsByCategory = (category: string): Document[] => {
  if (category === 'All') return mockDocuments
  return mockDocuments.filter((doc) => doc.category === category)
}

// Get unique vendors
export const getUniqueVendors = (): string[] => {
  const vendors = mockDocuments.map((doc) => doc.vendorName)
  return Array.from(new Set(vendors)).sort()
}

// Calculate total storage
export const calculateTotalStorage = (): number => {
  return mockDocuments.reduce((total, doc) => total + doc.size, 0)
}

// Get document statistics
export const getDocumentStats = () => {
  const total = mockDocuments.length
  const active = mockDocuments.filter((doc) => doc.status === 'active').length
  const archived = mockDocuments.filter((doc) => doc.status === 'archived').length
  const pending = mockDocuments.filter((doc) => doc.status === 'pending').length
  const totalSize = calculateTotalStorage()

  return {
    total,
    active,
    archived,
    pending,
    totalSize,
    averageSize: total > 0 ? totalSize / total : 0,
  }
}
