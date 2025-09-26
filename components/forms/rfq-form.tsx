'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Send, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const rfqSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  component: z.string().min(2, 'Component/Part description is required'),
  annualVolume: z.string().min(1, 'Annual volume is required'),
  material: z.string().min(2, 'Material specification is required'),
  message: z.string().optional(),
});

type RFQFormData = z.infer<typeof rfqSchema>;

export default function RFQForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
          variant: 'destructive',
        });
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
        'application/dwg',
        'application/dxf',
      ];
      
      if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.dwg') && !file.name.toLowerCase().endsWith('.dxf')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload PDF, Excel, Image, DWG, or DXF files only',
          variant: 'destructive',
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      if (selectedFile) {
        formData.append('drawing', selectedFile);
      }

      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setSelectedFile(null);
        toast({
          title: 'Quote request submitted successfully!',
          description: 'We will get back to you within 24 hours.',
        });
      } else {
        throw new Error(result.message || 'Failed to submit request');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-display font-bold text-center">
          Request for Quote
        </CardTitle>
        <p className="text-slate-600 text-center">
          Get a custom quote for your precision machining requirements
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                {...register('company')}
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="component">Component/Part Description *</Label>
            <Input
              id="component"
              {...register('component')}
              placeholder="e.g., Engine Bushes, Collars, Rocker Arms"
              className={errors.component ? 'border-red-500' : ''}
            />
            {errors.component && (
              <p className="text-red-500 text-sm mt-1">{errors.component.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="annualVolume">Annual Volume *</Label>
              <Input
                id="annualVolume"
                {...register('annualVolume')}
                placeholder="e.g., 10,000 pieces/year"
                className={errors.annualVolume ? 'border-red-500' : ''}
              />
              {errors.annualVolume && (
                <p className="text-red-500 text-sm mt-1">{errors.annualVolume.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="material">Material Specification *</Label>
              <Input
                id="material"
                {...register('material')}
                placeholder="e.g., EN8, EN19, Stainless Steel"
                className={errors.material ? 'border-red-500' : ''}
              />
              {errors.material && (
                <p className="text-red-500 text-sm mt-1">{errors.material.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="drawing">Technical Drawing (PDF/DWG)</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-sky-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="drawing"
                    className="relative cursor-pointer rounded-md font-medium text-sky-600 hover:text-sky-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="drawing"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DWG, DXF, Images up to 10MB
                </p>
                {selectedFile && (
                  <p className="text-sm text-green-600 font-medium">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              {...register('message')}
              rows={4}
              placeholder="Any additional requirements or specifications..."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="submit"
              className="w-full magnetic-btn bg-sky-500 hover:bg-sky-600 text-white py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Quote Request
                </div>
              )}
            </Button>
          </motion.div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center text-green-600 bg-green-50 p-4 rounded-lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Quote request submitted successfully! We'll get back to you within 24 hours.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center text-red-600 bg-red-50 p-4 rounded-lg"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Failed to submit request. Please try again or contact us directly.
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
