export interface FAQItem {
	question: string;
	answer: string[];
}

// This data structure mirrors the translation keys
export const getFAQData = (t: (key: string) => string): FAQItem[] => [
	{
		question: t("faq.q1.question"),
		answer: [t("faq.q1.answer")],
	},
	{
		question: t("faq.q2.question"),
		answer: [t("faq.q2.answer")],
	},
	{
		question: t("faq.q3.question"),
		answer: [t("faq.q3.answer")],
	},
	{
		question: t("faq.q4.question"),
		answer: [t("faq.q4.answer")],
	},
	{
		question: t("faq.q5.question"),
		answer: [t("faq.q5.answer")],
	},
];
