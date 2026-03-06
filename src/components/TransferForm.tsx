import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

type TripType = "ida" | "ida-volta" | "hora";

const step1Schema = z.object({
  passengers: z.number({ invalid_type_error: "Obrigatório" }).min(1, "Mínimo 1"),
  date: z.string().min(1, "Obrigatório"),
  time: z.string().min(1, "Obrigatório"),
  pickup: z.string().trim().min(5, "Mínimo 5 caracteres"),
  destination: z.string().trim().min(5, "Mínimo 5 caracteres"),
});

const step2Schema = z.object({
  name: z.string().trim().min(3, "Mínimo 3 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido"),
  whatsapp: z.string().trim().min(10, "Mínimo 10 dígitos"),
  company: z.string().trim().min(2, "Obrigatório"),
  department: z.string().trim().min(2, "Obrigatório"),
  costCenter: z.string().optional(),
});

type FieldErrors = Record<string, string>;

export const TransferForm = () => {
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState<TripType>("ida");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState({
    passengers: "",
    date: "",
    time: "",
    pickup: "",
    destination: "",
    returnDate: "",
    returnTime: "",
    hours: "",
    message: "",
    coupon: "",
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    department: "",
    costCenter: "",
    source: "",
    armored: false,
  });

  const update = (field: string, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });
  };

  const validateStep1 = () => {
    const result = step1Schema.safeParse({
      passengers: Number(form.passengers) || 0,
      date: form.date,
      time: form.time,
      pickup: form.pickup,
      destination: form.destination,
    });
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.errors.forEach((e) => { errs[e.path[0] as string] = e.message; });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const result = step2Schema.safeParse({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      company: form.company,
      department: form.department,
      costCenter: form.costCenter,
    });
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.errors.forEach((e) => { errs[e.path[0] as string] = e.message; });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    toast({ title: "✓ Solicitação registrada", description: "Protocolo enviado ao departamento responsável." });
    setStep(1);
    setForm({
      passengers: "", date: "", time: "", pickup: "", destination: "",
      returnDate: "", returnTime: "", hours: "", message: "", coupon: "",
      name: "", email: "", whatsapp: "", company: "", department: "",
      costCenter: "", source: "", armored: false,
    });
  };

  const labelClass = "text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block";

  return (
    <div className="corp-card p-6 md:p-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center justify-center w-7 h-7 text-xs font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
        <div className="h-[2px] flex-1 bg-border"><div className={`h-full transition-all ${step >= 2 ? "bg-primary w-full" : "w-0"}`} /></div>
        <div className={`flex items-center justify-center w-7 h-7 text-xs font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
      </div>

      {/* Trip type tabs */}
      <div className="flex gap-0 mb-6 border border-border overflow-hidden">
        {([["ida", "Somente Ida"], ["ida-volta", "Ida e Volta"], ["hora", "Por Hora"]] as const).map(
          ([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setTripType(val)}
              className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                tripType === val
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Passageiros *</label>
                <input type="number" min={1} value={form.passengers} onChange={(e) => update("passengers", e.target.value)} className={`corp-input ${errors.passengers ? "error" : ""}`} />
                {errors.passengers && <p className="field-error">{errors.passengers}</p>}
              </div>
              <div>
                <label className={labelClass}>Data *</label>
                <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={`corp-input ${errors.date ? "error" : ""}`} />
                {errors.date && <p className="field-error">{errors.date}</p>}
              </div>
              <div>
                <label className={labelClass}>Hora *</label>
                <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={`corp-input ${errors.time ? "error" : ""}`} />
                {errors.time && <p className="field-error">{errors.time}</p>}
              </div>
            </div>

            {tripType === "hora" && (
              <div>
                <label className={labelClass}>Horas de serviço *</label>
                <input type="number" min={1} value={form.hours} onChange={(e) => update("hours", e.target.value)} className="corp-input" />
              </div>
            )}

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

            {tripType === "ida-volta" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Data de Retorno</label>
                  <input type="date" value={form.returnDate} onChange={(e) => update("returnDate", e.target.value)} className="corp-input" />
                </div>
                <div>
                  <label className={labelClass}>Hora de Retorno</label>
                  <input type="time" value={form.returnTime} onChange={(e) => update("returnTime", e.target.value)} className="corp-input" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Mensagem</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Observações operacionais..." rows={2} className="corp-input resize-none" />
              </div>
              <div>
                <label className={labelClass}>Cupom Corporativo</label>
                <input value={form.coupon} onChange={(e) => update("coupon", e.target.value)} placeholder="Código" className="corp-input" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted border border-border">
              <input type="checkbox" id="armored" checked={form.armored} onChange={(e) => update("armored", e.target.checked)} className="w-4 h-4" />
              <label htmlFor="armored" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Veículo Blindado (NÍVEL III-A)
              </label>
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
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Nome do solicitante" className={`corp-input ${errors.name ? "error" : ""}`} />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>E-mail Corporativo *</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="nome@empresa.com" className={`corp-input ${errors.email ? "error" : ""}`} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>WhatsApp *</label>
                <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(00) 00000-0000" className={`corp-input ${errors.whatsapp ? "error" : ""}`} />
                {errors.whatsapp && <p className="field-error">{errors.whatsapp}</p>}
              </div>
              <div>
                <label className={labelClass}>Empresa *</label>
                <input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Razão Social" className={`corp-input ${errors.company ? "error" : ""}`} />
                {errors.company && <p className="field-error">{errors.company}</p>}
              </div>
              <div>
                <label className={labelClass}>Departamento *</label>
                <input value={form.department} onChange={(e) => update("department", e.target.value)} placeholder="Setor" className={`corp-input ${errors.department ? "error" : ""}`} />
                {errors.department && <p className="field-error">{errors.department}</p>}
              </div>
              <div>
                <label className={labelClass}>Centro de Custo</label>
                <input value={form.costCenter} onChange={(e) => update("costCenter", e.target.value)} placeholder="Código" className="corp-input" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Como nos encontrou?</label>
                <select value={form.source} onChange={(e) => update("source", e.target.value)} className="corp-input">
                  <option value="">Selecione</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="indicacao">Indicação</option>
                  <option value="contrato">Contrato Existente</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => { setStep(1); setErrors({}); }} className="corp-btn-outline flex-1">
                ← Voltar
              </button>
              <button type="submit" className="corp-btn flex-1">
                Registrar Solicitação
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
