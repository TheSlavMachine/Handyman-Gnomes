// src/components/steps/Step2_Service.jsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const COMMON_BRANDS = ["Samsung", "LG", "Whirlpool", "GE", "Maytag", "Kenmore", "Bosch", "Other"];

export default function Step2_Service({ formData, setFormData, applianceOptions, problemOptions, nextStep, prevStep, validationSchema }) {
  const [errors, setErrors] = useState({});

  const handleFieldChange = (name, value) => {
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      // When the appliance card is clicked, ensure the value is an array
      if (name === 'appliances') {
        newState.appliances = [value];
        newState.problem = ''; // Also reset the problem
      }
      return newState;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNextClick = () => {
    const result = validationSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors = {};
      for (const error of result.error.errors) {
        fieldErrors[error.path[0]] = error.message;
      }
      setErrors(fieldErrors);
      return;
    }
    
    // Additional business logic check for warranty
    if (formData.isUnderWarranty === 'yes') {
      setErrors({ isUnderWarranty: "We only service appliances not under warranty." });
      return;
    }
    
    setErrors({});
    nextStep();
  };

  return (
    <div className="grid gap-6 py-0">
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">Step 2: Service Details</h3>
        <p className="text-sm text-gray-600">Tell us about the appliance that needs service.</p>
      </div>

      {/* Appliance Selector */}
      <div className="space-y-2">
        <Label>Appliance Type</Label>
        <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
          {applianceOptions.map((app) => {
            const isSelected = formData.appliances.includes(app.name);
            return (
              <button key={app.name} type="button" onClick={() => handleFieldChange('appliances', app.name)}
                className={cn('flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition-colors', isSelected ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground')}>
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <span className="font-medium">{app.name}</span>
              </button>
            );
          })}
        </div>
        {errors.appliances && <p className="text-sm font-medium text-destructive mt-1">{errors.appliances}</p>}
      </div>

      {/* Brand Dropdown */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <Select onValueChange={(value) => handleFieldChange('brand', value)} defaultValue={formData.brand}>
          <SelectTrigger><SelectValue placeholder="Select a brand" /></SelectTrigger>
          <SelectContent>{COMMON_BRANDS.map((brand) => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}</SelectContent>
        </Select>
        {errors.brand && <p className="text-sm font-medium text-destructive mt-1">{errors.brand}</p>}
      </div>
      
      {/* Problem Dropdown */}
      <div className="space-y-2">
        <Label>Problem</Label>
        <Select onValueChange={(value) => handleFieldChange('problem', value)} value={formData.problem} disabled={formData.appliances.length === 0}>
          <SelectTrigger><SelectValue placeholder="Select a problem" /></SelectTrigger>
          <SelectContent>{problemOptions.map((prob) => <SelectItem key={prob.name} value={prob.name}>{prob.name}</SelectItem>)}</SelectContent>
        </Select>
        {errors.problem && <p className="text-sm font-medium text-destructive mt-1">{errors.problem}</p>}
      </div>

      {/* Warranty Question */}
      <div className="space-y-2">
        <Label>Is your appliance covered under a manufacturer warranty?</Label>
        <RadioGroup onValueChange={(value) => handleFieldChange('isUnderWarranty', value)} defaultValue={formData.isUnderWarranty} className="flex items-center gap-4">
          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="r-no" /><Label htmlFor="r-no">No</Label></div>
          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="r-yes" /><Label htmlFor="r-yes">Yes</Label></div>
        </RadioGroup>
        {errors.isUnderWarranty && <p className="text-sm font-medium text-destructive mt-1">{errors.isUnderWarranty}</p>}
      </div>

      {/* Serial Number (Optional) */}
      <div className="space-y-2">
        <Label>Serial Number (Optional)</Label>
        <Input placeholder="Located on a sticker on your appliance" value={formData.serialNumber} onChange={(e) => handleFieldChange('serialNumber', e.target.value)} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={prevStep}>Back</Button>
        <Button type="button" onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}