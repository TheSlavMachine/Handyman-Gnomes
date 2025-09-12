// src/pages/SchedulePage.jsx

import { useState, useEffect } from 'react';

import Step1_ZipCode from '../components/steps/Step1_ZipCode'; 
import Step2_Service from '../components/steps/Step2_Service'; 
import Step3_Scheduler from '../components/steps/Step3_Scheduler';
import Step4_Contact from '../components/steps/Step4_Contact';
import ProgressIndicator from '@/components/ProgressIndicator';

import { z } from 'zod';

const WIZARD_STEPS = ["ZIP Code", "Service", "Schedule", "Contact"];

export const validationSchemas = {
  step1: z.object({
    zipCode: z.string().regex(/^\d{5}$/, { message: "Must be a 5-digit ZIP code." }),
  }),
  step2: z.object({
    appliances: z.string().array().nonempty({ message: "Please select an appliance." }),
    brand: z.string().min(1, { message: "Please select a brand." }),
    problem: z.string().min(1, { message: "Please select a problem." }),
    isUnderWarranty: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Please answer the warranty question.' }) }),
    serialNumber: z.string().optional(),
  }),
  step4: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters." }),
    phone: z.string()
      .min(7, { message: "Please enter a valid phone number." })
      .regex(/^[0-9\s()+-]+$/, { message: "Phone number can only contain numbers." }),
    address: z.string().min(5, { message: "Address is required." }),
    notes: z.string().max(500, { message: "Notes cannot be longer than 500 characters." }).optional(),
  }),
  // We will add schemas for step 2 and 3 later.
};

export default function SchedulePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    appliances: [],
    brand: '',
    isUnderWarranty: null,
    problem: '',
    appointmentDate: null,
    appointmentDateString: '',
    timeWindow: '',
    name: '',
    phone: '',
    address: '',
    notes: '',
    serialNumber: '',
  });
  
  const [applianceOptions, setApplianceOptions] = useState([]);
  const [problemOptions, setProblemOptions] = useState([]);

  useEffect(() => {
    async function fetchAppliances() {
      try {
        const res = await fetch('/api/appliances');
        const data = await res.json();
        setApplianceOptions(data);
      } catch (error) {
        console.error("Failed to fetch appliances:", error);
      }
    }
    fetchAppliances();
  }, []);

  useEffect(() => {
    const selectedAppliance = formData.appliances[0];
    if (selectedAppliance) {
      async function fetchProblems() {
        try {
          const res = await fetch(`/api/problems?appliance=${encodeURIComponent(selectedAppliance)}`);
          const data = await res.json();
          setProblemOptions(data);
        } catch (error) {
          console.error("Failed to fetch problems:", error);
          setProblemOptions([]);
        }
      }
      fetchProblems();
    } else {
      setProblemOptions([]);
    }
  }, [formData.appliances]);
  

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting final data:", formData);
    // Final API call will go here
  };

  // The main render logic, now updated for the new step order
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1_ZipCode formData={formData} setFormData={setFormData} nextStep={nextStep} validationSchema={validationSchemas.step1} />;
      case 2:
        return (
          <Step2_Service
            formData={formData}
            setFormData={setFormData}
            applianceOptions={applianceOptions}
            problemOptions={problemOptions}
            nextStep={nextStep}
            prevStep={prevStep}
            validationSchema={validationSchemas.step2}
          />
        );
      case 3:
        return (
          <Step3_Scheduler
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
        case 4:
        return (
          <Step4_Contact
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit} 
            validationSchema={validationSchemas.step4}
          />
        );
      default:
        return <div>Review & Submit</div>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        
        <ProgressIndicator steps={WIZARD_STEPS} currentStep={step} />

        <div className="mt-8 border-t border-gray-200 pt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}