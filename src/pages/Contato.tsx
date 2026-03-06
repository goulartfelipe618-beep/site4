import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Contato = () => {
  const info = [
    { icon: Mail, label: "E-mail Comercial", value: "comercial@corptransfer.com.br", href: "mailto:comercial@corptransfer.com.br" },
    { icon: Phone, label: "Central de Operações", value: "(11) 99999-9999", href: "tel:+5511999999999" },
    { icon: MessageCircle, label: "WhatsApp Urgente", value: "(11) 99999-9999", href: "https://wa.me/5511999999999" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-20 bg-foreground text-background">
        <div className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] uppercase tracking-widest text-background/40 font-semibold mb-4">Canais de Contato</p>
            <h1 className="text-3xl md:text-4xl leading-tight text-background mb-4">Contato</h1>
            <p className="text-sm text-background/50 max-w-md">
              Central de operações disponível 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="grid grid-cols-1 gap-0 border border-border">
            {info.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex items-center justify-between border-b border-border last:border-b-0 bg-card hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="text-primary" size={20} strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{item.label}</p>
                    <p className="text-sm text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors font-bold">→</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-danger block text-center w-full"
            >
              ⚡ Contato Urgente via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
