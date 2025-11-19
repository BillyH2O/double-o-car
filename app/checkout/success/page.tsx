"use client"

import { Suspense } from 'react'
import SuccessContent from './success-content'
import Loader from '@/components/ui/Loader'

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-linear-to-b from-[#001141] via-[#001a5c] to-black">
        <Loader />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

