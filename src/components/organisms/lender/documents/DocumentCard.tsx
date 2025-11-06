// Document Card Component - Compact design

import { Download, Eye, MoreVertical, FileText, FileSpreadsheet, Image, Award, Receipt, ScrollText, FileBarChart, FileLineChart, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Document } from '@/data/lender/mockDocuments'
import {
  formatFileSize,
  formatDate,
  getDocumentTypeColor,
  getDocumentStatusColor,
  getDocumentStatusLabel,
  downloadDocument,
} from '@/utils/documentsUtils'

interface DocumentCardProps {
  document: Document
  onPreview: (document: Document) => void
  viewMode?: 'grid' | 'list'
}

const iconMap = {
  FileText,
  FileSpreadsheet,
  Image,
  Award,
  Receipt,
  ScrollText,
  FileBarChart,
  FileLineChart,
  File,
}

const getIconComponent = (type: string) => {
  const iconName = type as keyof typeof iconMap
  return iconMap[iconName] || File
}

export default function DocumentCard({ document, onPreview, viewMode = 'grid' }: DocumentCardProps) {
  const IconComponent = getIconComponent(
    document.type === 'agreement' ? 'FileText' :
    document.type === 'invoice' ? 'FileSpreadsheet' :
    document.type === 'receipt' ? 'Receipt' :
    document.type === 'contract' ? 'ScrollText' :
    document.type === 'statement' ? 'FileBarChart' :
    document.type === 'report' ? 'FileLineChart' :
    document.type === 'certificate' ? 'Award' :
    'File'
  )

  const gradientColor = getDocumentTypeColor(document.type)

  if (viewMode === 'list') {
    return (
      <div className="group p-3 rounded-lg bg-card/40 border border-white/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${gradientColor} flex items-center justify-center shrink-0 shadow-lg`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{document.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{document.vendorName}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className={`text-xs px-2 py-0 ${getDocumentStatusColor(document.status)}`}>
                  {getDocumentStatusLabel(document.status)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onPreview(document)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadDocument(document)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span>{formatDate(document.date)}</span>
              <span>•</span>
              <span>{formatFileSize(document.size)}</span>
              <span>•</span>
              <span className="uppercase">{document.fileType}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group p-4 rounded-xl bg-card/60 backdrop-blur-xl border border-white/60 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${gradientColor} flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onPreview(document)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadDocument(document)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-10">{document.title}</h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground truncate">{document.vendorName}</span>
          <Badge variant="outline" className={`text-xs px-2 py-0 shrink-0 ${getDocumentStatusColor(document.status)}`}>
            {getDocumentStatusLabel(document.status)}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
          <span>{formatDate(document.date)}</span>
          <span>•</span>
          <span>{formatFileSize(document.size)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-border/40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(document)}
          className="flex-1 h-8 text-xs"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Preview
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => downloadDocument(document)}
          className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Download
        </Button>
      </div>
    </div>
  )
}
