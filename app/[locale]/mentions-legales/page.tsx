"use client";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SectionTitle } from "@/components/ui/text/SectionTitle";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MentionsLegales() {
  const t = useTranslations("legal");
  
  return (
    <div className="relative min-h-screen w-full font-sans bg-linear-to-t from-black via-blue-950 to-black">
      <Navbar />

      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-16 mt-12">
        <div className="w-full flex flex-col items-center justify-center gap-16">
          <SectionTitle
            label={t("label")}
            title={t("title")}
            text={t("subtitle")}
            darkMode={true}
          />

          <div className="w-full prose prose-lg max-w-none space-y-6 text-white">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section1.title")}</h2>
              <p className="text-white/90">
                {t("section1.intro")}
              </p>
              <ul className="list-none ml-4 space-y-2 mt-2 text-white/90">
                <li><strong>{t("section1.companyName")}</strong> Double-O Car</li>
                <li><strong>{t("section1.email")}</strong> <a href="mailto:contact@double-o-car.fr" className="text-[#003CF0] underline hover:text-[#0034D0]">contact@double-o-car.fr</a></li>
                <li><strong>{t("section1.website")}</strong> www.double-o-car.fr</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section2.title")}</h2>
              <p className="text-white/90">
                {t("section2.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section3.title")}</h2>
              <p className="text-white/90">
                {t("section3.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section4.title")}</h2>
              <p className="text-white/90">
                {t("section4.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section5.title")}</h2>
              <p className="text-white/90">
                {t("section5.text")} <Link href="/politique-de-confidentialite" className="text-[#003CF0] underline hover:text-[#0034D0]">{t("section5.privacyLink")}</Link> {t("section5.text2")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section6.title")}</h2>
              <p className="text-white/90">
                {t("section6.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section7.title")}</h2>
              <p className="text-white/90">
                {t("section7.text1")}
              </p>
              <p className="mt-2 text-white/90">
                {t("section7.text2")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section8.title")}</h2>
              <p className="text-white/90">
                {t("section8.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section9.title")}</h2>
              <p className="text-white/90">
                {t("section9.text")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("section10.title")}</h2>
              <p className="text-white/90">
                {t("section10.text")}
              </p>
              <p className="mt-2 text-white/90">
                <strong>{t("section10.email")}</strong> <a href="mailto:contact@double-o-car.fr" className="text-[#003CF0] underline hover:text-[#0034D0]">contact@double-o-car.fr</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


