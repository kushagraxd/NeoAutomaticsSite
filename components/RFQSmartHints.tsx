import React, { useState } from 'react';
import { Sparkles, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../client/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../client/src/components/ui/card';
import { Badge } from '../client/src/components/ui/badge';
import { cn } from '../client/src/lib/utils';
import { useMutation } from '@tanstack/react-query';

interface RFQData {
  product: string;
  annualVolume?: string;
  material?: string;
  surfaceFinish?: string;
  message?: string;
}

interface RFQSuggestions {
  suggested: {
    annualVolume: string;
    material: string;
    finish: string;
    leadTimeWeeks: number;
  };
  checklist: string[];
  cautions: string[];
}

interface RFQSmartHintsProps {
  rfqData: RFQData;
  onApplySuggestions?: (suggestions: Partial<RFQData>) => void;
  className?: string;
}

export function RFQSmartHints({ rfqData, onApplySuggestions, className }: RFQSmartHintsProps) {
  const [suggestions, setSuggestions] = useState<RFQSuggestions | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  const validateMutation = useMutation({
    mutationFn: async (data: RFQData) => {
      const response = await fetch('/api/ai/rfq-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: data.product,
          annualVolume: data.annualVolume,
          material: data.material,
          finish: data.surfaceFinish,
          notes: data.message,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get suggestions');
      }
      
      return response.json() as Promise<RFQSuggestions>;
    },
    onSuccess: (data) => {
      setSuggestions(data);
    },
    onError: (error) => {
      console.error('RFQ validation error:', error);
    }
  });

  const handleValidate = () => {
    if (!rfqData.product.trim()) {
      return;
    }
    validateMutation.mutate(rfqData);
  };

  const handleApplySuggestion = (field: string, value: string) => {
    if (onApplySuggestions) {
      const updates: Partial<RFQData> = {};
      
      switch (field) {
        case 'annualVolume':
          updates.annualVolume = value;
          break;
        case 'material':
          updates.material = value;
          break;
        case 'finish':
          updates.surfaceFinish = value;
          break;
      }
      
      onApplySuggestions(updates);
      setAppliedSuggestions(prev => new Set(Array.from(prev).concat([field])));
    }
  };

  const handleApplyAll = () => {
    if (suggestions && onApplySuggestions) {
      onApplySuggestions({
        annualVolume: suggestions.suggested.annualVolume,
        material: suggestions.suggested.material,
        surfaceFinish: suggestions.suggested.finish,
      });
      setAppliedSuggestions(new Set(['annualVolume', 'material', 'finish'] as string[]));
    }
  };

  return (
    <Card className={cn("bg-bg-elevated border-border", className)} data-testid="rfq-smart-hints">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <CardTitle className="text-lg font-semibold text-text-primary">AI Suggestions</CardTitle>
            <Badge variant="secondary" className="bg-accent-primary/10 text-accent-primary">
              AI
            </Badge>
          </div>
          <Button
            onClick={handleValidate}
            disabled={!rfqData.product.trim() || validateMutation.isPending}
            variant="outline"
            size="sm"
            className="border-accent-primary text-accent-primary hover:bg-accent-primary/10"
            data-testid="button-validate-rfq"
          >
            {validateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Validate with AI
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!suggestions && !validateMutation.isPending && (
          <div className="text-center py-6 text-text-muted">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent-primary/50" />
            <p className="text-sm">
              Click "Validate with AI" to get intelligent suggestions for your RFQ
            </p>
          </div>
        )}

        {validateMutation.isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <XCircle className="w-4 h-4" />
              <span className="text-sm">Failed to get suggestions. Please try again.</span>
            </div>
          </div>
        )}

        {suggestions && (
          <>
            {/* Suggestions */}
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Recommended Values</h4>
              
              <div className="space-y-2">
                <SuggestionItem
                  label="Annual Volume"
                  value={suggestions.suggested.annualVolume}
                  field="annualVolume"
                  applied={appliedSuggestions.has('annualVolume')}
                  onApply={handleApplySuggestion}
                />
                
                <SuggestionItem
                  label="Material Grade"
                  value={suggestions.suggested.material}
                  field="material"
                  applied={appliedSuggestions.has('material')}
                  onApply={handleApplySuggestion}
                />
                
                <SuggestionItem
                  label="Surface Finish"
                  value={suggestions.suggested.finish}
                  field="finish"
                  applied={appliedSuggestions.has('finish')}
                  onApply={handleApplySuggestion}
                />

                <div className="flex items-center justify-between p-2 bg-bg-base rounded border border-border">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-text-primary">Estimated Lead Time</span>
                    <p className="text-sm text-text-muted">{suggestions.suggested.leadTimeWeeks} weeks</p>
                  </div>
                  <Badge variant="outline" className="bg-accent-primary/10 text-accent-primary border-accent-primary/20">
                    {suggestions.suggested.leadTimeWeeks}w
                  </Badge>
                </div>
              </div>

              <Button
                onClick={handleApplyAll}
                variant="outline"
                size="sm"
                className="w-full border-accent-primary text-accent-primary hover:bg-accent-primary/10"
                data-testid="button-apply-all-suggestions"
              >
                Apply All Suggestions
              </Button>
            </div>

            {/* Checklist */}
            {suggestions.checklist.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-text-primary">Requirements Checklist</h4>
                <div className="space-y-1">
                  {suggestions.checklist.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cautions */}
            {suggestions.cautions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-text-primary">Important Notes</h4>
                <div className="space-y-1">
                  {suggestions.cautions.map((caution, index) => (
                    <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                      ⚠️ {caution}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface SuggestionItemProps {
  label: string;
  value: string;
  field: string;
  applied: boolean;
  onApply: (field: string, value: string) => void;
}

function SuggestionItem({ label, value, field, applied, onApply }: SuggestionItemProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-bg-base rounded border border-border">
      <div className="flex-1">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <p className="text-sm text-text-muted">{value}</p>
      </div>
      <Button
        onClick={() => onApply(field, value)}
        disabled={applied}
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3",
          applied
            ? "text-green-600 hover:text-green-600"
            : "text-accent-primary hover:bg-accent-primary/10"
        )}
        data-testid={`button-apply-${field}`}
      >
        {applied ? (
          <>
            <CheckCircle className="w-4 h-4 mr-1" />
            Applied
          </>
        ) : (
          'Apply'
        )}
      </Button>
    </div>
  );
}