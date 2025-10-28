// src/components/ProgressIndicator.jsx

// Helper function to combine Tailwind CSS classes
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProgressIndicator({ steps, currentStep }) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex flex-nowrap items-center gap-1 sm:gap-2 md:gap-4 w-full">
        {steps.map((stepName, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <li key={stepName} className="relative flex-1">
              {/* Connector Line - Placed first to be in the background (z-index 0) */}
              {index < steps.length - 1 ? (
                <div
                  className={cn(
                    'absolute left-3 top-3 md:left-4 md:top-4 -ml-px h-0.5 w-full',
                    isCompleted ? 'bg-primary' : 'bg-gray-300'
                  )}
                  aria-hidden="true"
                />
              ) : null}

              {/* Step Content - This group has a higher z-index to appear on top */}
              <div className="relative z-10 flex items-center">
                {/* The "Mask" - This has a white background to create the gap */}
                <div className="bg-white px-2">
                  <span
                    className={cn(
                      'flex h-5 w-5 md:h-8 md:w-8 items-center justify-center rounded-full border-2',
                      isActive ? 'border-primary' : 'border-gray-300',
                      isCompleted ? 'border-primary bg-primary text-primary-foreground' : ''
                    )}
                  >
                    {isCompleted ? (
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" /></svg>
                    ) : (
                      <span className={cn(isActive ? 'text-primary' : 'text-gray-500')}>
                        {stepNumber}
                      </span>
                    )}
                  </span>
                </div>

                {/* Step Name - Also has a white background for masking */}
                <div className="bg-white pr-1 sm:pr-4 hidden sm:block">
                   <span
                    className={cn(
                      'text-xs md:text-sm font-medium',
                      isActive ? 'text-primary' : 'text-gray-500'
                    )}
                  >
                    {stepName}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}