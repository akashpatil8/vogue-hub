const faqData = [
  {
    id: 1,
    question: "Q. How long will it take to receive my refund?",
    answer:
      "Refunds are typically processed within 5-7 business days after your return is received and inspected.",
  },
  {
    id: 2,
    question: "How do I initiate a return or exchange?",
    answer:
      "To initiate a return or exchange, go to the “My Orders” section, select the item, and follow the instructions for return or exchange.",
  },
  {
    id: 3,
    question: "How long does it take to deliver my order?",
    answer:
      "Delivery times vary depending on your location. Standard delivery typically takes 5-7 business days, while express delivery may take 1-3 business days.",
  },
  {
    id: 4,
    question: "Do I need an account to place an order?",
    answer:
      "Yes, you need an account place an order as a guest. Creating an account allows you to track orders easily and save your details for faster checkout.",
  },
];

export default function FAQComponent() {
  return (
    <ul className="w-[60%]">
      {faqData.map((item) => (
        <li key={item.id} className="collapse collapse-plus mb-3 bg-slate-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-lg font-medium">
            {item.question}
          </div>
          <div className="collapse-content">
            <p className="text-sm">{item.answer}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
