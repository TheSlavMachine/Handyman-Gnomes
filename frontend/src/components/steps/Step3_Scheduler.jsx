// src/components/steps/Step3_Scheduler.jsx

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TIME_SLOTS = [
  { id: "Morning", label: "Morning", time: "8am - 12pm" },
  { id: "Afternoon", label: "Afternoon", time: "12pm - 5pm" },
];

// --- CALENDAR SIZE & STYLE CONTROLS ---
const calendarStyles = {
  // We keep our previous width/height controls
  day: {
    width: 'auto',
    height: '2.25rem',
  },
  // --- NEW: Make the day numbers larger ---
  // We reduce the padding, which gives more room for the font.
  day_button: {
    padding: '0.25rem', // You can adjust this value
  },
};
// --- END OF CONTROLS ---

export default function Step3_Scheduler({ formData, setFormData, nextStep, prevStep }) {
  const handleDateSelect = (date) => {
    setFormData(prev => ({ 
      ...prev, 
      appointmentDate: date,
      appointmentDateString: format(date, 'yyyy-MM-dd') 
    }));
  };

  const handleTimeSelect = (timeWindow) => {
    setFormData(prev => ({ ...prev, timeWindow }));
  };
  
  const isNextDisabled = !formData.appointmentDate || !formData.timeWindow;

  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Step 3: Schedule Your Appointment</h3>
        <p className="text-sm text-gray-600">Select an available date and a time window for your service.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Calendar
            mode="single"
            selected={formData.appointmentDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            styles={calendarStyles}
            className="rounded-md border p-0 w-full"
          />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          {/* --- NEW: Updated styling for the date header --- */}
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