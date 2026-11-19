import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] max-w-sm bg-[#2B070D] text-[#FAF7F2] border border-[#C59B51] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="w-7 h-7 rounded-full bg-[#58111A] text-[#E4C58B] flex items-center justify-center shrink-0">
        {toast.type === 'info' ? <Info className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-[#E4C58B]" />}
      </div>
      <p className="text-xs font-semibold leading-snug text-left">
        {toast.message}
      </p>
    </div>
  );
}

