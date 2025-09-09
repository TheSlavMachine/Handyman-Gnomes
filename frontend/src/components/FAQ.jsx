import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "How long does it take to schedule?",
      answer:
        "We can usually schedule your appointment within 1-2 business days. Same-day service may be available depending on your location."
    },
    {
      question: "How much does a consultation cost?",
      answer:
        "Our initial consultation is free. We'll assess your appliance issue and provide an upfront estimate before starting any work."
    },
    {
      question: "How much do you charge for repairs?",
      answer:
        "Repair costs vary depending on the appliance and the parts needed. We provide transparent, upfront pricing so there are no surprises."
    },
    {
      question: "Do you service all appliance brands?",
      answer:
        "Yes, we service all major appliance brands including Samsung, LG, Whirlpool, GE, Bosch, and more."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium focus:outline-none"
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;