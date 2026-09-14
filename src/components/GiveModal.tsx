import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface GiveModalProps {
  open: boolean;
  onClose: () => void;
}

export const GiveModal: React.FC<GiveModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0f172a] text-indigo-400 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-2xl font-serif text-[#0f172a]">
            Give Your Tithes & Offering
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            "Each of you should give what you have decided in your heart to give..."
            <span className="block mt-0.5 font-semibold text-slate-400">(2 Corinthians 9:7)</span>
          </p>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="font-bold text-[#0f172a]">GCash Account</div>
            <div className="text-black font-mono font-bold text-base tracking-wider">
              0912-345-6789
            </div>
            <div className="text-slate-500">
              Account Name: Gospel Fellowship Church / Pastor Zaldy B.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="font-bold text-[#0f172a]">Bank Transfer / BDO</div>
            <div className="text-black font-mono font-bold text-base tracking-wider">
              0012-3456-7890
            </div>
            <div className="text-slate-500">Gospel Fellowship Church Limay</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};