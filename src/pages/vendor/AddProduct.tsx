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
  // State for images
  const [images, setImages] = useState<string[]>([]);
  // State for tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Dummy categories for select
  const categories = [
    'Electronics',
    'Fashion',
    'Home',
    'Beauty',
    'Sports',
    'Other',
  ];

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 10 - images.length);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  };
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

  return (
    <div className="relative max-w-6xl mx-auto pb-12">
      {/* Enhanced ambient background layers for more depth */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Multiple layered gradients for depth */}
        <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-secondary/6 to-transparent rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-gradient-to-bl from-primary/4 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '5s' }} />
      </div>

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg px-2 py-1"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:underline underline-offset-4">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground text-sm">
            Create a new product listing for your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Main grid: 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-16 gap-y-12">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <h2 className="text-sm font-medium text-foreground/70 uppercase tracking-widest">Basic Information</h2>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground/90">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Premium Wireless Headphones"
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-foreground/90">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your product, its features, and benefits..."
                    rows={4}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary focus-visible:outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/40"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-foreground/90">Category</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus:outline-none focus-visible:border-primary transition-all duration-300">
                        <SelectValue placeholder="Select category" />
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
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="brand" className="text-sm font-medium text-foreground/90">Brand</Label>
                      <span className="text-xs text-muted-foreground/60 italic">optional</span>
                    </div>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Apple, Samsung..."
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <h2 className="text-sm font-medium text-foreground/70 uppercase tracking-widest">Pricing</h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-foreground/90">Price (₦)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="comparePrice" className="text-sm font-medium text-foreground/90">Compare Price (₦)</Label>
                      <span className="text-xs text-muted-foreground/60 italic">optional</span>
                    </div>
                    <Input
                      id="comparePrice"
                      name="comparePrice"
                      type="number"
                      value={formData.comparePrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground/60 italic pl-1">
                  Set a compare price to display discounts
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Inventory */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <h2 className="text-sm font-medium text-foreground/70 uppercase tracking-widest">Inventory</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sku" className="text-sm font-medium text-foreground/90">SKU</Label>
                    <span className="text-xs text-muted-foreground/60 italic">optional</span>
                  </div>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="ABC-123"
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm font-medium text-foreground/90">Stock Qty</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="weight" className="text-sm font-medium text-foreground/90">Weight</Label>
                    <span className="text-xs text-muted-foreground/60 italic">optional</span>
                  </div>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.0 kg"
                    min="0"
                    step="0.01"
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <h2 className="text-sm font-medium text-foreground/70 uppercase tracking-widest">Product Images</h2>
                <span className="text-xs text-muted-foreground/60 italic">optional</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="relative w-full aspect-square object-cover rounded-xl border border-white/10 shadow-lg shadow-black/10 transition-all duration-300 group-hover:scale-[1.02]"
                    />
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 p-2 bg-destructive/95 backdrop-blur-md text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                
                {images.length < 10 && (
                  <label className="relative flex flex-col items-center justify-center w-full aspect-square border border-dashed border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 group overflow-hidden">
                    {/* Subtle gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <Upload className="relative w-7 h-7 text-muted-foreground/50 mb-2 group-hover:text-primary/80 group-hover:scale-110 transition-all duration-300" />
                    <span className="relative text-xs text-muted-foreground/60 group-hover:text-primary/90 transition-colors duration-300">
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
                )}
              </div>
              
              <p className="text-xs text-muted-foreground/60 italic pl-1">
                Upload up to 10 images. First image will be the main display.
              </p>
            </div>
          </div>
        </div>

        {/* Tags Section - Full width */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-white/5">
            <h2 className="text-sm font-medium text-foreground/70 uppercase tracking-widest">Product Tags</h2>
            <span className="text-xs text-muted-foreground/60 italic">optional</span>
          </div>
          
          <div className="flex gap-3">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="wireless, bluetooth, premium..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
            />
            <Button 
              type="button" 
              onClick={handleAddTag} 
              size="sm"
              className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary border-0 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2.5 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary/15 to-primary/5 text-primary rounded-full text-sm border border-primary/20 hover:border-primary/40 hover:from-primary/20 hover:to-primary/10 transition-all duration-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary/70 transition-colors duration-200 hover:rotate-90 transition-transform"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-12 mt-8 border-t border-white/5">
          <Button 
            type="button" 
            variant="ghost" 
            asChild 
            className="min-w-28 hover:bg-white/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Link to="/dashboard">Cancel</Link>
          </Button>
          <Button 
            type="submit" 
            className="relative min-w-36 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 overflow-hidden group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="relative z-10">Add Product</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct
