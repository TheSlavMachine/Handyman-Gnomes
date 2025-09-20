// src/components/steps/Step1_ZipCode.jsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';

const SERVICE_AREA_ZIPS = ["85281", "85282", "85283", "85008", "85034", "85288"];

export default function Step1_ZipCode({ formData, setFormData, nextStep, validationSchema }) {
  const [error, setError] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) throw new Error('Failed to fetch address');
          const data = await response.json();
          if (data && data.address) {
            const { road, city, state, postcode } = data.address;
            setFormData(prev => ({
              ...prev,
              zipCode: postcode || '',
              address: `${road || ''}, ${city || ''}, ${state || ''}`
            }));
          } else {
            setError("Could not determine address from your location.");
          }
        } catch (err) {
          setError("Failed to fetch address data.");
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        setError("Could not get your location. Please enable location services.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleNextClick = () => {
    const result = validationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      if (fieldErrors.zipCode) {
        setError(fieldErrors.zipCode[0]);
      }
      return;
    }

    if (SERVICE_AREA_ZIPS.includes(formData.zipCode)) {
      setError('');
      nextStep();
    } else {
      setError("Sorry, we do not currently service that area.");
    }
  };

  return (
    <div className="grid gap-4 py-0">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Step 1: Verify Service Area</h3>
          <p className="text-sm text-gray-600">Enter your ZIP code or use your current location.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">Your 5-Digit ZIP Code</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="zipCode" 
              placeholder="e.g., 85281"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({...prev, zipCode: e.target.value}))}
              maxLength={5}
            />
            <Button type="button" variant="outline" size="icon" onClick={handleDetectLocation} disabled={isDetecting}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-5">
            {isDetecting && <p className="text-sm text-blue-600">Detecting your location...</p>}
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNextClick} disabled={formData.zipCode.length < 5}>
          Next
        </Button>
      </div>
    </div>
  );
}