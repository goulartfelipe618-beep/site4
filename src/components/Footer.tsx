import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer = () => (
  <footer className="bg-foreground text-background py-14">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} />
            <span className="text-sm font-bold uppercase tracking-[0.15em]">
              Corp<span className="text-primary-foreground/70">Transfer</span>
            </span>
          </div>
          <p className="text-xs text-background/50 leading-relaxed">
            Transporte executivo corporativo.<br />
            Pontualidade. Blindagem. Confiança.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-background/40 mb-3 font-semibold">Navegação</p>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Transfer" },
              { to: "/grupos", label: "Grupos" },
              { to: "/sobre", label: "Sobre" },
              { to: "/contato", label: "Contato" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-background/50 hover:text-background transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-background/40 mb-3 font-semibold">Operação</p>
          <div className="flex flex-col gap-2 text-xs text-background/50">
            <span>24h / 7 dias por semana</span>
            <span>Cobertura Nacional</span>
            <span>SLA garantido</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-background/40 mb-3 font-semibold">Contato</p>
          <div className="flex flex-col gap-2 text-xs text-background/50">
            <span>contato@corptransfer.com.br</span>
            <span>(11) 99999-9999</span>
            <span>CNPJ: 00.000.000/0001-00</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-10 pt-6 text-center text-[10px] text-background/30 uppercase tracking-wider">
        © {new Date().getFullYear()} CorpTransfer — Todos os direitos reservados
      </div>
    </div>
  </footer>
);
