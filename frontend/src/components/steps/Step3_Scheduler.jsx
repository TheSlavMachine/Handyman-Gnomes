// src/components/steps/Step3_Scheduler.jsx

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { useEffect } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TIME_SLOTS = [
  { id: "Morning", label: "Morning", time: "8am - 12pm" },
  { id: "Afternoon", label: "Afternoon", time: "12pm - 5pm" },
];

export default function Step3_Scheduler({ formData, setFormData, nextStep, prevStep }) {
  const handleDateSelect = (date) => {
    if (!date || Number.isNaN(date.getTime())) return;
    setFormData(prev => ({ 
      ...prev, 
      appointmentDate: date,
      appointmentDateString: format(date, 'yyyy-MM-dd') 
    }));
  };

  useEffect(() => {
    if (!formData.appointmentDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < 60; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        if (!(d < new Date(new Date().setDate(new Date().getDate() - 1)))) {
          setFormData(prev => ({
            ...prev,
            appointmentDate: d,
            appointmentDateString: format(d, 'yyyy-MM-dd'),
          }));
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimeSelect = (timeWindow) => {
    setFormData(prev => ({ ...prev, timeWindow }));
  };
  
  const isNextDisabled = !formData.appointmentDate || !formData.timeWindow;

  return (
    <div className="grid gap-5 py-0">
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">Step 3: Schedule Your Appointment</h3>
        <p className="text-sm text-gray-600">Select an available date and a time window for your service.</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
         <div className="custom-calendar-container">
          <Calendar
            mode="single"
            selected={formData.appointmentDate}
            onSelect={handleDateSelect}
            required
            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            className="rounded-md border p-2 w-full" 
          />
        </div>
        
        {/* 2. Time Slot Container that fills remaining space */}
        <div className="flex-1 space-y-4">
          <h4 className="text-lg font-bold text-primary text-center md:text-left">
            {formData.appointmentDate ? format(formData.appointmentDate, 'cccc, LLLL d') : 'Please select a date'}
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = formData.timeWindow === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleTimeSelect(slot.id)}
                  disabled={!formData.appointmentDate}
                  className={cn(
                    'w-full rounded-md border p-4 text-left transition-colors',
                    !formData.appointmentDate ? 'cursor-not-allowed bg-gray-100 text-gray-400' : '',
                    isSelected ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent'
                  )}
                >
                  <p className="font-semibold">{slot.label}</p>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={isNextDisabled}>Next</Button>
      </div>
    </div>
  );
}