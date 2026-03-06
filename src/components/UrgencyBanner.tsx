import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const UrgencyBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        exit={{ y: -60 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-accent text-accent-foreground"
      >
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle size={16} />
            <p className="text-xs font-semibold uppercase tracking-wider">
              Atenção: Solicite seu transfer com antecedência mínima de 2h para garantir disponibilidade.
            </p>
          </div>
          <button onClick={() => setVisible(false)} className="hover:opacity-70 transition-opacity">
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
