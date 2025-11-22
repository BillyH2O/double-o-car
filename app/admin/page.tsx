"use client"

import Footer from "@/components/layout/footer"
import { AdminHeader } from "@/components/admin/shared/AdminHeader"
import { AdminDashboard } from "@/components/admin/dashboard/AdminDashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#001141] via-[#001a5c] to-black flex flex-col">
      <AdminHeader title="Pannel Admin" backUrl="/" />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <AdminDashboard />
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

