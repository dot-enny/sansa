import React, { useState } from 'react'
import { ArrowLeft, Upload, X, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: '',
    stock: '',
    sku: '',
    brand: '',
    weight: '',
  })

  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Beauty & Health',
    'Books',
    'Toys & Games',
    'Automotive',
    'Food & Grocery',
    'Office Supplies',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for image upload logic
    // In production, this would upload to a storage service
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - send to API
    console.log('Form submitted:', { ...formData, images, tags })
    // Show success message and redirect
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add New Product
        </h1>
        <p className="text-muted-foreground">
          Fill in the details below to list a new product in your store
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Premium Wireless Headphones"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product, its features, and benefits..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Apple, Samsung, Nike"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₦) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="comparePrice">Compare at Price (₦)</Label>
              <Input
                id="comparePrice"
                name="comparePrice"
                type="number"
                value={formData.comparePrice}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Show a discount by setting a higher compare price
              </p>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Inventory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="e.g., WH-1000XM5"
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="0.0"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Product Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-accent transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-muted-foreground">
            Upload up to 10 images. First image will be the main product image.
          </p>
        </div>

        {/* Tags */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tags</h2>

          <div className="flex gap-2 mb-3">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag (e.g., wireless, bluetooth)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-primary/70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" asChild>
            <Link to="/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" className="min-w-32">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
