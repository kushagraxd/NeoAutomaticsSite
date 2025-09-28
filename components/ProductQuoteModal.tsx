import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Validation schema for the quote form
const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  product: z.string().min(1, 'Product selection is required'),
  annualVolume: z.string().min(1, 'Annual volume is required'),
  material: z.string().optional(),
  surfaceFinish: z.string().optional(),
  targetPrice: z.string().optional(),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface ProductQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    name: string;
    category: string;
    image?: string;
    description?: string;
  };
}

export default function ProductQuoteModal({
  isOpen,
  onClose,
  product,
}: ProductQuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      product: product?.name || '',
      name: '',
      company: '',
      email: '',
      phone: '',
      annualVolume: '',
      material: '',
      surfaceFinish: '',
      targetPrice: '',
      message: '',
    },
  });

  // Set product name when product prop changes
  useEffect(() => {
    if (product?.name) {
      setValue('product', product.name);
    }
  }, [product, setValue]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['.pdf', '.dwg', '.dxf', '.step', '.stp'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setErrorMessage('Please upload PDF, DWG, DXF, or STEP files only');
        return;
      }

      setUploadedFile(file);
      setErrorMessage('');
    }
  };

  // Handle form submission
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Add file if uploaded
      if (uploadedFile) {
        formData.append('drawing', uploadedFile);
      }

      // Add product details if available
      if (product) {
        formData.append('productCategory', product.category);
        if (product.description) {
          formData.append('productDescription', product.description);
        }
      }

      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        reset();
        setUploadedFile(null);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    reset();
    setUploadedFile(null);
    setSubmitStatus('idle');
    setErrorMessage('');
    onClose();
  };

  // Handle success actions
  const handleUploadMore = () => {
    setUploadedFile(null);
    setSubmitStatus('idle');
    // Keep form open for more uploads
  };

  const handleBackToProducts = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-elevated rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-white/10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              {product && (
                <div className="w-16 h-16 bg-gradient-to-br from-amber/20 to-red/20 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      data-testid="product-image"
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-amber" data-testid="product-icon" />
                  )}
                </div>
              )}
              <div>
                <h2 id="modal-title" className="text-2xl font-display font-bold text-primary">
                  Request Quote
                </h2>
                {product && (
                  <p className="text-muted" data-testid="product-info">
                    {product.name} • {product.category}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-muted hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Close modal"
              data-testid="modal-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitStatus === 'success' ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-amber mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold text-primary mb-2">
                  Quote Request Submitted!
                </h3>
                <p className="text-muted mb-6">
                  We've received your request and will contact you within 24 hours with a detailed quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleUploadMore}
                    variant="outline"
                    className="border-amber/30 text-amber hover:bg-amber/10"
                    data-testid="button-upload-more"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload More Drawings
                  </Button>
                  <Button
                    onClick={handleBackToProducts}
                    className="btn-primary"
                    data-testid="button-back-products"
                  >
                    Back to Products
                  </Button>
                </div>
              </motion.div>
            ) : (
              // Form State
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-red/10 border border-red/20 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red flex-shrink-0" />
                    <p className="text-red text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-display font-semibold text-primary">
                      Contact Information
                    </h3>
                    
                    <div>
                      <Label htmlFor="name" className="text-primary">
                        Full Name *
                      </Label>
                      <Input
                        {...register('name')}
                        id="name"
                        type="text"
                        className="mt-1"
                        placeholder="Enter your full name"
                        data-testid="input-name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-primary">
                        Company Name *
                      </Label>
                      <Input
                        {...register('company')}
                        id="company"
                        type="text"
                        className="mt-1"
                        placeholder="Your company name"
                        data-testid="input-company"
                        aria-invalid={errors.company ? 'true' : 'false'}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                      />
                      {errors.company && (
                        <p id="company-error" className="text-red text-sm mt-1">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-primary">
                        Work Email *
                      </Label>
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        className="mt-1"
                        placeholder="your.email@company.com"
                        data-testid="input-email"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-primary">
                        Phone Number *
                      </Label>
                      <Input
                        {...register('phone')}
                        id="phone"
                        type="tel"
                        className="mt-1"
                        placeholder="+91 98765 43210"
                        data-testid="input-phone"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-red text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-display font-semibold text-primary">
                      Product Requirements
                    </h3>

                    <div>
                      <Label htmlFor="product" className="text-primary">
                        Product *
                      </Label>
                      <Input
                        {...register('product')}
                        id="product"
                        type="text"
                        className="mt-1 bg-muted/20"
                        readOnly
                        data-testid="input-product"
                      />
                    </div>

                    <div>
                      <Label htmlFor="annualVolume" className="text-primary">
                        Annual Volume *
                      </Label>
                      <Input
                        {...register('annualVolume')}
                        id="annualVolume"
                        type="text"
                        className="mt-1"
                        placeholder="e.g., 10,000 units/year"
                        data-testid="input-annual-volume"
                        aria-invalid={errors.annualVolume ? 'true' : 'false'}
                        aria-describedby={errors.annualVolume ? 'volume-error' : undefined}
                      />
                      {errors.annualVolume && (
                        <p id="volume-error" className="text-red text-sm mt-1">
                          {errors.annualVolume.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="material" className="text-primary">
                        Material Specification
                      </Label>
                      <Input
                        {...register('material')}
                        id="material"
                        type="text"
                        className="mt-1"
                        placeholder="e.g., EN24, EN8, Stainless Steel"
                        data-testid="input-material"
                      />
                    </div>

                    <div>
                      <Label htmlFor="surfaceFinish" className="text-primary">
                        Surface Finish
                      </Label>
                      <Input
                        {...register('surfaceFinish')}
                        id="surfaceFinish"
                        type="text"
                        className="mt-1"
                        placeholder="e.g., Ra 1.6, Zinc plated"
                        data-testid="input-surface-finish"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetPrice" className="text-primary">
                        Target Price (Optional)
                      </Label>
                      <Input
                        {...register('targetPrice')}
                        id="targetPrice"
                        type="text"
                        className="mt-1"
                        placeholder="e.g., ₹50 per unit"
                        data-testid="input-target-price"
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-semibold text-primary">
                    Technical Drawings
                  </h3>
                  
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-amber/30 transition-colors">
                    <input
                      type="file"
                      id="drawing-upload"
                      className="hidden"
                      accept=".pdf,.dwg,.dxf,.step,.stp"
                      onChange={handleFileUpload}
                      data-testid="input-file-upload"
                    />
                    <label
                      htmlFor="drawing-upload"
                      className="cursor-pointer block"
                    >
                      <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
                      <p className="text-primary font-medium mb-2">
                        Upload Technical Drawings
                      </p>
                      <p className="text-muted text-sm">
                        PDF, DWG, DXF, or STEP files (max 10MB)
                      </p>
                    </label>
                    
                    {uploadedFile && (
                      <div className="mt-4 p-3 bg-amber/10 border border-amber/20 rounded-lg">
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="w-4 h-4 text-amber" />
                          <span className="text-amber font-medium">
                            {uploadedFile.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-primary">
                    Additional Requirements
                  </Label>
                  <Textarea
                    {...register('message')}
                    id="message"
                    className="mt-1"
                    placeholder="Any specific requirements, tolerances, or questions..."
                    rows={4}
                    data-testid="input-message"
                  />
                </div>

                {/* Optional Download Link */}
                <div className="text-center">
                  <p className="text-muted text-sm mb-2">
                    Need detailed specifications?
                  </p>
                  <button
                    type="button"
                    className="text-amber hover:text-amber/80 font-medium text-sm inline-flex items-center"
                    data-testid="link-spec-sheet"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download Product Spec Sheet (PDF)
                  </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary min-w-[150px]"
                    data-testid="button-submit-quote"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Quote Request'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}