"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onConfirm: () => void;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  startTime,
  endTime,
  onStartDateChange,
  onEndDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onConfirm,
}: DatePickerModalProps) {
  const t = useTranslations("booking");
  
  if (!isOpen) return null;

  // Obtenir la date minimale (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-montserrat font-bold text-black mb-6">{t("selectDates")}</h2>

        <div className="space-y-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-montserrat font-semibold">
              {t("startDate")}
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 focus-within:border-[#003CF0] transition-colors">
              <Image src="/calendar.png" alt="Calendar" width={20} height={20} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  const newStartDate = e.target.value;
                  onStartDateChange(newStartDate);
                  // Si la date de fin est antérieure à la nouvelle date de début, mettre à jour la date de fin
                  if (endDate && newStartDate > endDate) {
                    onEndDateChange(newStartDate);
                  }
                }}
                min={today}
                className="flex-1 outline-none text-black font-montserrat"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-500 mb-1 font-montserrat">{t("time")}</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-[#003CF0] transition-colors text-black font-montserrat"
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-montserrat font-semibold">
              {t("endDate")}
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 focus-within:border-[#003CF0] transition-colors">
              <Image src="/calendar.png" alt="Calendar" width={20} height={20} />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  // Si la date sélectionnée est antérieure à la date de début, utiliser la date de début
                  if (startDate && selectedDate < startDate) {
                    onEndDateChange(startDate);
                  } else {
                    onEndDateChange(selectedDate);
                  }
                }}
                min={startDate || today}
                className="flex-1 outline-none text-black font-montserrat"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-500 mb-1 font-montserrat">{t("time")}</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => onEndTimeChange(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-[#003CF0] transition-colors text-black font-montserrat"
              />
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="w-full bg-[#003CF0] hover:bg-[#0034D0] text-white py-3 rounded-lg transition-colors font-montserrat font-semibold mt-6"
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  );
}

