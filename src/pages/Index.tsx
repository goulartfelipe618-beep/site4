import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TransferForm } from "@/components/TransferForm";
import { motion } from "framer-motion";
import { Shield, Clock, Radio, Lock } from "lucide-react";
import corpSedan from "@/assets/corp-sedan.jpg";

const Index = () => {
  const kpis = [
    { value: "99.7%", label: "Pontualidade" },
    { value: "24/7", label: "Operação" },
    { value: "500+", label: "Clientes Corporativos" },
    { value: "NÍVEL III-A", label: "Blindagem" },
  ];

  const features = [
    { icon: Shield, title: "Veículos Blindados", desc: "Nível III-A homologado pelo Exército Brasileiro." },
    { icon: Clock, title: "SLA de Pontualidade", desc: "99.7% de cumprimento de horário contratado." },
    { icon: Radio, title: "Rastreamento 24h", desc: "Monitoramento em tempo real via GPS dedicado." },
    { icon: Lock, title: "Motorista Certificado", desc: "Profissionais com verificação PF e treinamento ABNT." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Left */}
          <div className="flex items-center px-6 lg:px-16 py-24 bg-foreground text-background">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="status-dot active" />
                <span className="text-[10px] uppercase tracking-widest text-background/50 font-semibold">Sistema Operacional Ativo</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-background">
                Transporte Executivo Blindado e Pontual
              </h1>
              <p className="text-sm text-background/60 mb-8 leading-relaxed max-w-md">
                Pontualidade contratual. Veículos blindados. Rastreamento em tempo real.
                Operação 24/7 para empresas que não param.
              </p>
              <a href="#reserva" className="corp-btn-danger inline-block">
                ⚡ Solicitar Transfer Urgente
              </a>
            </motion.div>
          </div>
          {/* Right - image */}
          <div className="relative hidden lg:block">
            <img src={corpSedan} alt="Sedã blindado corporativo" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 text-center border-r border-border last:border-r-0"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{k.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{k.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid - rigid blocks */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border-r border-b border-border last:border-r-0 hover:bg-muted transition-colors"
              >
                <f.icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="reserva" className="py-20 bg-muted border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Formulário de Solicitação</p>
              <h2 className="text-2xl md:text-3xl text-foreground">Registre seu Transfer</h2>
            </motion.div>
            <TransferForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
