"use client";
import { useLocale } from "next-intl";
import { LegalDocPage } from "@/components/legal/LegalDocPage";
import { getLegalCopy } from "@/lib/legal/copy";

export default function PolitiqueCookies() {
  const locale = useLocale();
  return <LegalDocPage locale={locale} doc={getLegalCopy(locale).cookies} />;
}
