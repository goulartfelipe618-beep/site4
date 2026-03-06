import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const step1Schema = z.object({
  vehicle: z.string().min(1, "Selecione o tipo"),
  passengers: z.number({ invalid_type_error: "Obrigatório" }).min(1, "Mínimo 1"),
  pickup: z.string().trim().min(5, "Mínimo 5 caracteres"),
  destination: z.string().trim().min(5, "Mínimo 5 caracteres"),
  departureDate: z.string().min(1, "Obrigatório"),
});

const step2Schema = z.object({
  name: z.string().trim().min(3, "Mínimo 3 caracteres"),
  email: z.string().trim().email("E-mail inválido"),
  whatsapp: z.string().trim().min(10, "Mínimo 10 dígitos"),
  company: z.string().trim().min(2, "Obrigatório"),
});

type FieldErrors = Record<string, string>;

export const GroupForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState({
    vehicle: "", passengers: "", pickup: "", destination: "",
    departureDate: "", returnDate: "", notes: "", coupon: "",
    name: "", email: "", whatsapp: "", company: "", source: "",
  });

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => { const c = { ...e }; delete c[field]; return c; });
  };

  const handleNext = () => {
    const result = step1Schema.safeParse({
      vehicle: form.vehicle,
      passengers: Number(form.passengers) || 0,
      pickup: form.pickup,
      destination: form.destination,
      departureDate: form.departureDate,
    });
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.errors.forEach((e) => { errs[e.path[0] as string] = e.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = step2Schema.safeParse({ name: form.name, email: form.email, whatsapp: form.whatsapp, company: form.company });
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.errors.forEach((err) => { errs[err.path[0] as string] = err.message; });
      setErrors(errs);
      return;
    }
    toast({ title: "✓ Solicitação de grupo registrada", description: "Protocolo enviado à equipe operacional." });
    setStep(1);
    setForm({ vehicle: "", passengers: "", pickup: "", destination: "", departureDate: "", returnDate: "", notes: "", coupon: "", name: "", email: "", whatsapp: "", company: "", source: "" });
  };

  const labelClass = "text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block";

  return (
    <div className="corp-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center justify-center w-7 h-7 text-xs font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
        <div className="h-[2px] flex-1 bg-border"><div className={`h-full transition-all ${step >= 2 ? "bg-primary w-full" : "w-0"}`} /></div>
        <div className={`flex items-center justify-center w-7 h-7 text-xs font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Tipo de Veículo *</label>
                <select value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} className={`corp-input ${errors.vehicle ? "error" : ""}`}>
                  <option value="">Selecione</option>
                  <option value="van">Van Executiva (até 18 pax)</option>
                  <option value="micro">Micro-ônibus (até 28 pax)</option>
                  <option value="onibus">Ônibus (até 50 pax)</option>
                </select>
                {errors.vehicle && <p className="field-error">{errors.vehicle}</p>}
              </div>
              <div>
                <label className={labelClass}>Nº de Passageiros *</label>
                <input type="number" min={1} value={form.passengers} onChange={(e) => update("passengers", e.target.value)} className={`corp-input ${errors.passengers ? "error" : ""}`} />
                {errors.passengers && <p className="field-error">{errors.passengers}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Embarque *</label>
                <input value={form.pickup} onChange={(e) => update("pickup", e.target.value)} placeholder="Endereço completo" className={`corp-input ${errors.pickup ? "error" : ""}`} />
                {errors.pickup && <p className="field-error">{errors.pickup}</p>}
              </div>
              <div>
                <label className={labelClass}>Destino *</label>
                <input value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="Endereço completo" className={`corp-input ${errors.destination ? "error" : ""}`} />
                {errors.destination && <p className="field-error">{errors.destination}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Data/Hora de Ida *</label>
                <input type="datetime-local" value={form.departureDate} onChange={(e) => update("departureDate", e.target.value)} className={`corp-input ${errors.departureDate ? "error" : ""}`} />
                {errors.departureDate && <p className="field-error">{errors.departureDate}</p>}
              </div>
              <div>
                <label className={labelClass}>Data/Hora de Retorno</label>
                <input type="datetime-local" value={form.returnDate} onChange={(e) => update("returnDate", e.target.value)} className="corp-input" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Observações</label>
                <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Detalhes operacionais..." rows={2} className="corp-input resize-none" />
              </div>
              <div>
                <label className={labelClass}>Cupom Corporativo</label>
                <input value={form.coupon} onChange={(e) => update("coupon", e.target.value)} placeholder="Código" className="corp-input" />
              </div>
            </div>
            <button type="button" onClick={handleNext} className="corp-btn w-full mt-2">
              Próximo: Dados Corporativos →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nome Completo *</label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} className={`corp-input ${errors.name ? "error" : ""}`} />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>E-mail Corporativo *</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={`corp-input ${errors.email ? "error" : ""}`} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>WhatsApp *</label>
                <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className={`corp-input ${errors.whatsapp ? "error" : ""}`} />
                {errors.whatsapp && <p className="field-error">{errors.whatsapp}</p>}
              </div>
              <div>
                <label className={labelClass}>Empresa *</label>
                <input value={form.company} onChange={(e) => update("company", e.target.value)} className={`corp-input ${errors.company ? "error" : ""}`} />
                {errors.company && <p className="field-error">{errors.company}</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => { setStep(1); setErrors({}); }} className="corp-btn-outline flex-1">← Voltar</button>
              <button type="submit" className="corp-btn flex-1">Registrar Solicitação</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
