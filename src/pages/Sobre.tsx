import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Clock, Radio, Lock, Award, Users } from "lucide-react";

const Sobre = () => {
  const diferenciais = [
    { icon: Shield, label: "Blindagem III-A" },
    { icon: Clock, label: "SLA 99.7%" },
    { icon: Radio, label: "GPS 24h" },
    { icon: Lock, label: "Segurança PF" },
    { icon: Award, label: "Certificação ABNT" },
    { icon: Users, label: "Motorista Bilíngue" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-20 bg-foreground text-background">
        <div className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] uppercase tracking-widest text-background/40 font-semibold mb-4">Institucional</p>
            <h1 className="text-3xl md:text-4xl leading-tight text-background mb-4">Sobre a CorpTransfer</h1>
            <p className="text-sm text-background/50 max-w-md">
              Conheça a operação por trás da pontualidade e segurança.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="text-2xl md:text-3xl text-foreground leading-tight">
                Mais de 15 anos de operação ininterrupta
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fundada por um profissional com mais de 15 anos de experiência em transporte executivo,
                a CorpTransfer opera com rigor militar: pontualidade contratual, veículos blindados
                e motoristas certificados pela PF.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atendemos mais de 500 empresas em todo o território nacional,
                com SLA de pontualidade de 99.7% e rastreamento GPS 24 horas.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nossa frota é composta por sedãs blindados, SUVs, vans executivas e ônibus,
                todos com manutenção preventiva quinzenal e seguro total incluso.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-0 border border-border"
            >
              {diferenciais.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 text-center border-r border-b border-border bg-card hover:bg-muted transition-colors"
                >
                  <d.icon className="mx-auto text-primary mb-2" size={24} strokeWidth={1.5} />
                  <p className="text-[10px] uppercase tracking-widest text-foreground font-semibold">{d.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
