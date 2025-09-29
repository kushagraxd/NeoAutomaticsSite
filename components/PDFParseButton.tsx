import React, { useState, useRef } from 'react';
import { FileText, Upload, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '../client/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../client/src/components/ui/card';
import { Badge } from '../client/src/components/ui/badge';
import { cn } from '../client/src/lib/utils';
import { useMutation } from '@tanstack/react-query';

interface PDFParseResult {
  summary: string;
  fields: {
    material?: string;
    dimensions?: string;
    tolerance?: string;
    finish?: string;
    quantity?: string;
  };
}

interface PDFParseButtonProps {
  onFieldsExtracted?: (fields: Record<string, string>) => void;
  className?: string;
}

export function PDFParseButton({ onFieldsExtracted, className }: PDFParseButtonProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<PDFParseResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/ai/extract', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to parse PDF');
      }
      
      return response.json() as Promise<PDFParseResult>;
    },
    onSuccess: (data) => {
      setParseResult(data);
      setShowPreview(true);
    },
    onError: (error) => {
      console.error('PDF parse error:', error);
      setFile(null);
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    // Validate file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setParseResult(null);
    setShowPreview(false);
  };

  const handleParseClick = () => {
    if (!file) {
      fileInputRef.current?.click();
      return;
    }
    
    parseMutation.mutate(file);
  };

  const handleApplyFields = () => {
    if (parseResult && onFieldsExtracted) {
      const fieldsToApply: Record<string, string> = {};
      
      if (parseResult.fields.material) fieldsToApply.material = parseResult.fields.material;
      if (parseResult.fields.finish) fieldsToApply.surfaceFinish = parseResult.fields.finish;
      if (parseResult.fields.dimensions) fieldsToApply.message = 
        (fieldsToApply.message || '') + `\nDimensions: ${parseResult.fields.dimensions}`;
      if (parseResult.fields.tolerance) fieldsToApply.message = 
        (fieldsToApply.message || '') + `\nTolerance: ${parseResult.fields.tolerance}`;
      if (parseResult.fields.quantity) fieldsToApply.annualVolume = parseResult.fields.quantity;
      
      onFieldsExtracted(fieldsToApply);
      setShowPreview(false);
    }
  };

  const handleDismiss = () => {
    setShowPreview(false);
    setParseResult(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)} data-testid="pdf-parse-button">
      {/* File Upload Area */}
      <Card className="bg-bg-elevated border-border border-dashed">
        <CardContent className="p-6">
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              data-testid="input-pdf-file"
            />
            
            {!file ? (
              <div className="space-y-3">
                <Upload className="w-12 h-12 mx-auto text-accent-primary/50" />
                <div>
                  <h3 className="text-lg font-medium text-text-primary">Upload Technical Drawing</h3>
                  <p className="text-sm text-text-muted">PDF format, up to 10MB</p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary/10"
                  data-testid="button-select-pdf"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select PDF File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <FileText className="w-12 h-12 mx-auto text-accent-primary" />
                <div>
                  <h3 className="text-lg font-medium text-text-primary">{file.name}</h3>
                  <p className="text-sm text-text-muted">{formatFileSize(file.size)}</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    onClick={handleParseClick}
                    disabled={parseMutation.isPending}
                    className="bg-accent-primary hover:bg-accent-primary/80 text-bg-base"
                    data-testid="button-parse-pdf"
                  >
                    {parseMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Parsing...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        <span>Parse drawing with AI</span>
                        <Badge variant="secondary" className="ml-2 bg-accent-primary/20 text-accent-primary">
                          AI
                        </Badge>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    size="sm"
                    className="text-text-muted hover:text-text-primary"
                    data-testid="button-remove-pdf"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parse Error */}
      {parseMutation.isError && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <div>
                <h4 className="font-medium">Parsing Failed</h4>
                <p className="text-sm">{parseMutation.error?.message || 'Unable to parse PDF. Please try again.'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Parse Results Preview */}
      {showPreview && parseResult && (
        <Card className="bg-green-50 border-green-200" data-testid="pdf-parse-results">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg font-semibold text-green-800">PDF Parsed Successfully</CardTitle>
                <Badge variant="secondary" className="bg-accent-primary/10 text-accent-primary">
                  AI
                </Badge>
              </div>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700"
                data-testid="button-close-preview"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Summary */}
            <div>
              <h4 className="font-medium text-green-800 mb-2">Summary</h4>
              <p className="text-sm text-green-700 bg-white/50 p-3 rounded border">
                {parseResult.summary}
              </p>
            </div>

            {/* Extracted Fields */}
            {Object.keys(parseResult.fields).length > 0 && (
              <div>
                <h4 className="font-medium text-green-800 mb-2">Extracted Information</h4>
                <div className="space-y-2">
                  {Object.entries(parseResult.fields).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between items-start p-2 bg-white/50 rounded border">
                        <span className="text-sm font-medium text-green-800 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm text-green-700 text-right ml-2">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                onClick={handleApplyFields}
                className="bg-green-600 hover:bg-green-700 text-white"
                data-testid="button-apply-fields"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Apply to Form
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                data-testid="button-dismiss-results"
              >
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}