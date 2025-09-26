"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  component: z.string().min(2, "Component/Part description is required"),
  annualVolume: z.string().min(1, "Annual volume is required"),
  material: z.string().min(2, "Material specification is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RFQForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      component: "",
      annualVolume: "",
      material: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.autocad.dwg",
        "application/dwg",
        "image/vnd.dwg",
      ];
      if (!allowedTypes.includes(selectedFile.type) && 
          !selectedFile.name.toLowerCase().endsWith('.dwg') &&
          !selectedFile.name.toLowerCase().endsWith('.pdf')) {
        alert("Only PDF and DWG files are allowed");
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof FormData] || "");
      });
      
      if (file) {
        formData.append("drawing", file);
      }

      const response = await fetch("/api/rfq", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setFile(null);
      } else {
        throw new Error(result.error || "Failed to submit RFQ");
      }
    } catch (error) {
      console.error("RFQ submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-2xl" data-testid="form-rfq">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-primary mb-2">
          Request for Quotation
        </h3>
        <p className="text-muted">
          Send us your requirements and we'll get back to you within 24 hours.
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-amber/10 border border-amber/30 rounded-lg" data-testid="alert-success">
          <p className="text-amber">
            Thank you! Your RFQ has been submitted successfully. We'll contact you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red/10 border border-red/30 rounded-lg" data-testid="alert-error">
          <p className="text-red">
            There was an error submitting your RFQ. Please try again or contact us directly.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your full name" 
                      {...field} 
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Company name" 
                      {...field}
                      data-testid="input-company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your.email@company.com" 
                      {...field}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+91 98765 43210" 
                      {...field}
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="component"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Component/Part *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Describe the component you need manufactured" 
                    {...field}
                    data-testid="input-component"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="annualVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Volume *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-volume">
                        <SelectValue placeholder="Select expected volume" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1000-5000">1,000 - 5,000 units</SelectItem>
                      <SelectItem value="5000-10000">5,000 - 10,000 units</SelectItem>
                      <SelectItem value="10000-50000">10,000 - 50,000 units</SelectItem>
                      <SelectItem value="50000-100000">50,000 - 100,000 units</SelectItem>
                      <SelectItem value="100000+">100,000+ units</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., SS304, Mild Steel, Brass" 
                      {...field}
                      data-testid="input-material"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Drawing Upload (PDF/DWG, max 10MB)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-muted border-dashed rounded-lg hover:border-amber transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted" />
                <div className="flex text-sm text-muted">
                  <label
                    htmlFor="drawing-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-amber hover:text-amber/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber"
                  >
                    <span data-testid="text-upload">Upload a file</span>
                    <input
                      id="drawing-upload"
                      name="drawing-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.dwg"
                      onChange={handleFileChange}
                      data-testid="input-file"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted">PDF, DWG up to 10MB</p>
                {file && (
                  <p className="text-sm text-amber font-medium" data-testid="text-selected-file">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional specifications, timeline requirements, or questions..."
                    className="resize-none"
                    rows={4}
                    {...field}
                    data-testid="input-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-3 text-lg"
            data-testid="button-submit-rfq"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit RFQ"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
