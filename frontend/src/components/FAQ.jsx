import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "How quickly can you schedule an appointment?",
      answer:
        "We offer same-day and next-day appointments in most areas. Emergency repairs are available 24/7 for critical appliances like refrigerators."
    },
    {
      question: "Do you charge for estimates?",
      answer:
        "No! Our initial consultation and diagnostic is completely free. We'll assess your appliance issue and provide an upfront estimate before starting any work."
    },
    {
      question: "What's included in your warranty?",
      answer:
        "All repairs come with a comprehensive 2-year warranty on parts and labor. If the same issue occurs again, we'll fix it free of charge."
    },
    {
      question: "Do you service all appliance brands?",
      answer:
        "Yes, we service all major brands including Samsung, LG, Whirlpool, GE, Bosch, KitchenAid, Maytag, and more. Our technicians are trained on all modern appliances."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, all major credit cards, and offer financing options for larger repairs. Payment is due upon completion of the work."
    },
    {
      question: "Are your technicians licensed and insured?",
      answer:
        "Absolutely! All our technicians are licensed, bonded, and fully insured. We carry comprehensive liability insurance for your peace of mind."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 md:py-12 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about our services
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
              >
                <span className="text-base font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full border-2 border-orange-600 flex items-center justify-center transition-transform duration-200 ${openIndex === index ? 'rotate-180 bg-orange-600' : 'bg-white'}`}>
                    <span className={`text-sm font-bold transition-colors duration-200 ${openIndex === index ? 'text-white' : 'text-orange-600'}`}>
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="pt-3 text-gray-700 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Our team is here to help with any other questions.
            </p>
            <a
              href="tel:+14804579660"
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <span className="mr-2">📞</span>
              Call (480) 457-9660
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;