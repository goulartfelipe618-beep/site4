import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Transfer" },
    { to: "/grupos", label: "Grupos" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-card border-b-2 border-primary" style={{ top: 0 }}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
              Corp<span className="text-primary">Transfer</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-colors ${
                  location.pathname === l.to
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block corp-btn-danger !py-2 !px-5 !text-[11px]"
          >
            ⚡ Solicitar Urgente
          </a>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-3 flex flex-col gap-1 border-t border-border mt-3">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xs font-semibold uppercase tracking-wider py-2 px-3 ${
                      location.pathname === l.to ? "text-primary bg-primary/5" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-btn-danger text-center !text-[11px] mt-2"
                >
                  ⚡ Solicitar Urgente
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
