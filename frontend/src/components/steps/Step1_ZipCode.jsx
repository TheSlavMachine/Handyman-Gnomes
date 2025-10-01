// src/components/steps/Step1_ZipCode.jsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';

const SERVICE_AREA_ZIPS = [
  "85003","85004","85006","85007","85008","85009","85012","85013","85014","85015","85016",
  "85017","85018","85019","85020","85021","85022","85023","85024","85027","85028","85029",
  "85031","85032","85033","85034","85035","85037","85040","85041","85042","85043","85044",
  "85045","85048","85050","85051","85053","85054","85083","85085",
  "85201","85202","85203","85204","85205","85206","85207","85208","85209","85210","85212","85213","85215",
  "85250","85251","85254","85255","85256","85257","85258","85259","85260","85262","85266",
  "85281","85282","85283","85284",
  "85301","85302","85303","85304","85305","85306","85307","85308","85310",
  "85345","85381","85382","85383","85385",
  "85288",
];

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