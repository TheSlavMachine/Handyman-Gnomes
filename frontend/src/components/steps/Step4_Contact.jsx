// src/components/steps/Step4_Contact.jsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const DISCLAIMERS = [
  "A service fee will be applied to all appointments.",
  "Cancellation within 24 hours may incur a fee.",
  "An exact arrival time will be confirmed via email.",
];

export default function Step4_Contact({ formData, setFormData, prevStep, handleSubmit, validationSchema, isSubmitting, submitError }) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const result = validationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    handleSubmit(); 
  };

   const isSubmitDisabled = !formData.name || !formData.phone || !formData.address || !agreedToTerms || isSubmitting;

  return (
    <form onSubmit={handleFinalSubmit}>
      <div className="grid gap-4 py-0 md:grid-cols-2">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">Step 4: Contact & Details</h3>
            <p className="text-sm text-gray-600">Please confirm your details to finish scheduling.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
            {errors.name && <p className="text-sm font-medium text-destructive">{errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
            {errors.email && <p className="text-sm font-medium text-destructive">{errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(123) 456-7890" value={formData.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} />
            {errors.phone && <p className="text-sm font-medium text-destructive">{errors.phone[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Service Address</Label>
            <Input id="address" value={formData.address} onChange={(e) => handleFieldChange('address', e.target.value)} />
            {errors.address && <p className="text-sm font-medium text-destructive">{errors.address[0]}</p>}
            <p className="text-xs text-gray-500">Auto-filled. Please confirm it is correct.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" placeholder="e.g., The house is gated, please call upon arrival." value={formData.notes} onChange={(e) => handleFieldChange('notes', e.target.value)} />
            {errors.notes && <p className="text-sm font-medium text-destructive">{errors.notes[0]}</p>}
          </div>
        </div>
        
        <div className="row-start-1 md:col-start-2">
          <Card className="h-full flex flex-col">
            <CardHeader><CardTitle>Review Your Request</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm flex-grow">
              <div className="flex justify-between"><span className="text-gray-600">Appliance:</span><span className="font-medium">{formData.appliances.join(', ')}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Brand:</span><span className="font-medium">{formData.brand}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Problem:</span><span className="font-medium">{formData.problem}</span></div>
              <div className="flex justify-between border-t pt-2 mt-2"><span className="text-gray-600">Date:</span><span className="font-medium">{formData.appointmentDate ? format(formData.appointmentDate, 'EEE, LLL d') : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="font-medium">{formData.timeWindow}</span></div>
              <div className="flex justify-between border-t pt-2 mt-2"><span className="text-gray-600">Email:</span><span className="font-medium">{formData.email}</span></div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <ul className="text-xs text-gray-500 space-y-1">
                {DISCLAIMERS.map((text, index) => (
                  <li key={index} className="flex items-start gap-2"><span>•</span><span>{text}</span></li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-6">
        <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            I agree to the <Link to="/terms" target="_blank" className="underline text-primary hover:text-primary/80"> Terms & Services</Link>.
          </label>
          <p className="text-sm text-muted-foreground">You agree to our policies regarding service fees and cancellations.</p>
        </div>
      </div>


      {submitError && <p className="text-sm font-medium text-destructive mt-4 text-center">{submitError}</p>}
      
      <div className="flex justify-between pt-8 border-t mt-6">
        <Button variant="outline" type="button" onClick={prevStep}>Back</Button>

        <Button type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}