'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '@/app/styles/Home.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Poser une question pertinente?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "Poser une question pertinente?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "Poser une question pertinente?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Poser une question pertinente?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className={styles.faq}>
      <h2 className={styles.faq__title}>FAQ</h2>
      {faqItems.map((item, index) => (
        <div key={index} className={styles.faq__item}>
          <button
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            className={styles.faq__question}
          >
            <span>{item.question}</span>
            {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
          </button>
          <div 
            className={`${styles.faq__answer} ${openFAQ === index ? styles.faq__answer_open : ''}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
}