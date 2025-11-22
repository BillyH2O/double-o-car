'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const t = useTranslations('faq')
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'clock',
            question: t('items.0.question'),
            answer: t('items.0.answer'),
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: t('items.1.question'),
            answer: t('items.1.answer'),
        },
        {
            id: 'item-3',
            icon: 'truck',
            question: t('items.2.question'),
            answer: t('items.2.answer'),
        },
        {
            id: 'item-4',
            icon: 'globe',
            question: t('items.3.question'),
            answer: t('items.3.answer'),
        },
        {
            id: 'item-5',
            icon: 'package',
            question: t('items.4.question'),
            answer: t('items.4.answer'),
        },
    ]

    return (
        <section className="py-12 sm:py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold dark:text-white">{t('title')}</h2>
                            <p className="text-muted-foreground dark:text-white mt-4">
                                {t('description')} <Link href="/contact" className="text-[#003CF0] font-medium hover:underline">{t('link')}</Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background/20 shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline dark:text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4 dark:text-white"
                                                />
                                            </div>
                                            <span className="text-base dark:text-white">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base dark:text-white">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}