import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GroupForm } from "@/components/GroupForm";
import { motion } from "framer-motion";
import corpFleet from "@/assets/corp-fleet.jpg";

const Grupos = () => {
  const capacityData = [
    { vehicle: "Sedã Executivo", pax: "1–3", luggage: "3 malas", armored: "Sim", ac: "Sim", wifi: "Sim" },
    { vehicle: "SUV Blindada", pax: "1–5", luggage: "5 malas", armored: "Sim", ac: "Sim", wifi: "Sim" },
    { vehicle: "Van Executiva", pax: "6–18", luggage: "18 malas", armored: "Não", ac: "Sim", wifi: "Sim" },
    { vehicle: "Micro-ônibus", pax: "19–28", luggage: "28 volumes", armored: "Não", ac: "Sim", wifi: "Sim" },
    { vehicle: "Ônibus Executivo", pax: "29–50", luggage: "50 volumes", armored: "Não", ac: "Sim", wifi: "Sim" },
  ];

  const specs = [
    { label: "Tempo Mín. de Reserva", value: "2 horas" },
    { label: "Cancelamento Gratuito", value: "Até 6h antes" },
    { label: "Cobertura", value: "Nacional + 3 países" },
    { label: "Suporte", value: "24/7 dedicado" },
    { label: "SLA Pontualidade", value: "99.7%" },
    { label: "Seguro", value: "Total incluso" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]">
          <div className="flex items-center px-6 lg:px-16 py-20 bg-foreground text-background">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[10px] uppercase tracking-widest text-background/40 font-semibold mb-4">Divisão Grupos & Frotas</p>
              <h1 className="text-3xl md:text-4xl leading-tight mb-4 text-background">
                Capacidade Técnica para Qualquer Operação
              </h1>
              <p className="text-sm text-background/50 max-w-md">
                Tabelas claras. SLA garantido. Cobertura nacional e internacional.
              </p>
            </motion.div>
          </div>
          <div className="relative hidden lg:block">
            <img src={corpFleet} alt="Frota corporativa" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Capacity Table */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Dados Operacionais</p>
            <h2 className="text-2xl md:text-3xl text-foreground">Tabela de Capacidade Técnica</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="corp-card overflow-hidden overflow-x-auto"
          >
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Veículo</th>
                  <th>Passageiros</th>
                  <th>Bagagem</th>
                  <th>Blindagem</th>
                  <th>A/C</th>
                  <th>Wi-Fi</th>
                </tr>
              </thead>
              <tbody>
                {capacityData.map((row) => (
                  <tr key={row.vehicle}>
                    <td className="font-semibold text-foreground">{row.vehicle}</td>
                    <td>{row.pax}</td>
                    <td>{row.luggage}</td>
                    <td>
                      <span className={`status-dot ${row.armored === "Sim" ? "active" : "warning"}`} />
                      <span className="ml-2">{row.armored}</span>
                    </td>
                    <td><span className="status-dot active" /> <span className="ml-2">{row.ac}</span></td>
                    <td><span className="status-dot active" /> <span className="ml-2">{row.wifi}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Specs grid */}
      <section className="py-20 bg-muted border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">Especificações</p>
            <h2 className="text-2xl md:text-3xl text-foreground">Parâmetros Operacionais</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-border bg-card">
            {specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 border-r border-b border-border"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Formulário de Grupo</p>
              <h2 className="text-2xl md:text-3xl text-foreground">Solicite seu Orçamento</h2>
            </motion.div>
            <GroupForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Grupos;
