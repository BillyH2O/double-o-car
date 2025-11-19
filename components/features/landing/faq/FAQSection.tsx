'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'clock',
            question: 'Dans quelle ville pouvez-vous me livrer la voiture ?',
            answer: 'Nous sommes spécialisés dans la livraison de voitures partout à Marrakech.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'Quels documents sont nécessaires pour louer une voiture ?',
            answer: 'Pour louer une voiture, vous devez être majeur, posséder une carte d\'identité valide et un permis de conduire valide.',
        },
        {
            id: 'item-3',
            icon: 'truck',
            question: 'Quels types de véhicules proposez-vous ?',
            answer: 'Nous proposons une gamme de véhicules citadines et familiales.',
        },
        {
            id: 'item-4',
            icon: 'globe',
            question: 'Quels moyens de paiement acceptez-vous ?',
            answer: 'Nous acceptons les paiements par carte bancaire, et par especes.',
        },
        {
            id: 'item-5',
            icon: 'package',
            question: 'Les voitures sont-elles assurées ?',
            answer: 'Oui, toutes les voitures sont assurées par notre assurance partenaire.',
        },
    ]

    return (
        <section className="py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold dark:text-white">Questions fréquentes</h2>
                            <p className="text-muted-foreground dark:text-white mt-4">
                               Vous ne trouvez pas ce que vous cherchez ? Contactez notre{' '}
                                <Link
                                    href="/contact"
                                    className="text-[#003CF0] font-medium hover:underline">
                                    service client
                                </Link>
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