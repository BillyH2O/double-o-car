'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { SectionTitle } from '@/components/ui/text/SectionTitle'
import type { LegalDoc } from '@/lib/legal/copy'
import { COMPANY } from '@/lib/legal/company'

export function LegalDocPage({ doc, locale }: { doc: LegalDoc; locale: string }) {
  return (
    <div className="relative min-h-screen w-full font-sans bg-linear-to-t from-black via-blue-950 to-black">
      <Navbar />

      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-16 mt-12">
        <div className="w-full flex flex-col items-center justify-center gap-16">
          <SectionTitle label={doc.label} title={doc.title} text={doc.subtitle} darkMode={true} />

          <div className="w-full space-y-8 text-white">
            {doc.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-semibold mb-4 text-white">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-white/90 mb-3 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.list ? (
                  <ul className="list-disc list-inside ml-2 space-y-2 text-white/90">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <p className="text-white/70 text-sm pt-4 border-t border-white/10">
              {COMPANY.email} · {COMPANY.phoneDisplay} · {COMPANY.siteUrl}/{locale}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export function LegalInlineLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link href={href} className="text-[#003CF0] underline hover:text-[#0034D0]">
      {children}
    </Link>
  )
}
