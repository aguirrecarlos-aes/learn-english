"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// TIPOS — imitan exactamente la estructura de Supabase
// ─────────────────────────────────────────────
type Lesson = {
  id: number;
  tipo: "modismo_latino" | "cultura_pop" | "slang_ingles" | "frase_hecha";
  input_original: string;
  equivalente_ingles: string;
  explicacion_hack: string;
  ejemplo_uso_en: string;
  ejemplo_uso_es: string;
  quiz_pregunta: string;
  quiz_opciones: string[];
  respuesta_correcta_index: number;
};

// ─────────────────────────────────────────────
// MOCK DATA — estructurado como vendrá de Supabase
// ─────────────────────────────────────────────
const MOCK_LESSONS: Lesson[] = [
  {
    id: 1,
    tipo: "modismo_latino",
    input_original: "Andar pato",
    equivalente_ingles: "To be broke / strapped for cash",
    explicacion_hack:
      "En inglés no dices 'walking duck'. Dices 'I'm broke' para algo general, o 'strapped for cash' si es momentáneo. Tip pro: la 'o' en 'broke' suena como una 'ou' suave, no es una 'o' seca española.",
    ejemplo_uso_en: "I can't go to the mall today, I'm totally broke.",
    ejemplo_uso_es: "No puedo ir al mall hoy, ando totalmente pato.",
    quiz_pregunta: "¿Cómo le dirías a un amigo que 'andas pato' de manera natural?",
    quiz_opciones: ["I am walking duck", "I'm strapped for cash", "I don't have ducks"],
    respuesta_correcta_index: 1,
  },
  {
    id: 2,
    tipo: "cultura_pop",
    input_original: "No te hagas el leso",
    equivalente_ingles: "Don't play dumb",
    explicacion_hack:
      "'Play dumb' es la frase perfecta: usas el verbo 'play' porque es una actuación, no ignorancia real. También sirve 'Stop acting clueless'. Evita 'don't be stupid' — suena agresivo, no sarcástico.",
    ejemplo_uso_en: "Don't play dumb, you knew about the party the whole time.",
    ejemplo_uso_es: "No te hagas el leso, sabías del carrete todo el rato.",
    quiz_pregunta: "Tu amigo dice que no sabe nada del chisme. ¿Qué le dices?",
    quiz_opciones: ["Don't be a leso", "Don't play dumb", "Stop being less"],
    respuesta_correcta_index: 1,
  },
  {
    id: 3,
    tipo: "slang_ingles",
    input_original: "It's giving…",
    equivalente_ingles: "Da vibras de… / Se siente como…",
    explicacion_hack:
      "'It's giving' es el modismo viral de Gen Z para describir la energía de algo. Se dice sin terminar la frase o completándola: 'It's giving main character energy'. No tiene traducción directa — es puro contexto cultural.",
    ejemplo_uso_en: "That outfit? It's giving royal vibes, honestly.",
    ejemplo_uso_es: "¿Ese look? Da vibras de realeza, en serio.",
    quiz_pregunta: "Alguien llega con un look increíble. ¿Qué le dices en Gen Z English?",
    quiz_opciones: ["It's giving me life!", "It's giving main character", "You give vibes"],
    respuesta_correcta_index: 1,
  },
  {
    id: 4,
    tipo: "frase_hecha",
    input_original: "Echar la foca",
    equivalente_ingles: "To go off on someone / to let someone have it",
    explicacion_hack:
      "'Go off on someone' captura el caos de echar la foca: explotar verbalmente sobre alguien. 'Let someone have it' es más coloquial. Ambas funcionan. Nunca traduzcas con 'throw the seal' — no existe.",
    ejemplo_uso_en: "She went off on her manager in front of everyone.",
    ejemplo_uso_es: "Le echó la foca a su jefe frente a todos.",
    quiz_pregunta: "Tu colega le gritó a su jefe en la reunión. ¿Qué le cuentas a tu amigo?",
    quiz_opciones: ["She threw the seal at him", "She let her boss have it", "She sealed the deal"],
    respuesta_correcta_index: 1,
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const TIPO_META: Record<
  Lesson["tipo"],
  { emoji: string; label: string; color: string }
> = {
  modismo_latino: { emoji: "🇨🇱", label: "Modismo Chileno", color: "from-violet-600 to-purple-700" },
  cultura_pop: { emoji: "🎬", label: "Cultura Pop", color: "from-pink-600 to-fuchsia-700" },
  slang_ingles: { emoji: "🔥", label: "Slang Gen Z", color: "from-orange-500 to-red-600" },
  frase_hecha: { emoji: "💬", label: "Frase Hecha", color: "from-teal-500 to-cyan-600" },
};

// ─────────────────────────────────────────────
// COMPONENTE: Tarjeta individual
// ─────────────────────────────────────────────
function LessonCard({ lesson }: { lesson: Lesson }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const meta = TIPO_META[lesson.tipo];

  const handleOption = (index: number) => {
    if (selected !== null) return; // No permite cambiar la respuesta
    setSelected(index);
    if (index === lesson.respuesta_correcta_index) {
      setTimeout(() => setShowCredits(true), 300);
    }
  };

  const getOptionStyle = (index: number): string => {
    const base =
      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ";

    if (selected === null) {
      return base + "border-white/10 bg-white/5 text-white/80 hover:border-fuchsia-500/60 hover:bg-fuchsia-500/10 hover:text-white active:scale-[0.98]";
    }
    if (index === lesson.respuesta_correcta_index) {
      return base + "border-emerald-400 bg-emerald-400/20 text-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.25)]";
    }
    if (index === selected) {
      return base + "border-red-400/60 bg-red-400/10 text-red-300";
    }
    return base + "border-white/5 bg-white/5 text-white/30";
  };

  return (
    <section className="snap-start h-svh w-full flex flex-col relative overflow-hidden bg-[#0A0A0F]">
      {/* Glow de fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-700/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-fuchsia-700/15 rounded-full blur-[60px]" />
      </div>

      {/* Contenido principal — scrollable interno si el contenido es largo */}
      <div className="relative flex flex-col flex-1 min-h-0 px-4 pt-5 pb-2 gap-3 overflow-y-auto">

        {/* Badge de tipo */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${meta.color} text-white shadow-md`}
          >
            <span>{meta.emoji}</span>
            {meta.label}
          </span>
          <span className="text-white/20 text-xs font-mono">{lesson.id} / {MOCK_LESSONS.length}</span>
        </div>

        {/* Término principal */}
        <div className="mt-1">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-medium">
            Se dice en Chile
          </p>
          <h2
            className="text-4xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {lesson.input_original}
          </h2>
        </div>

        {/* Flecha + traducción */}
        <div className="flex items-start gap-3 bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-3">
          <span className="text-fuchsia-400 text-2xl mt-0.5 shrink-0">→</span>
          <div>
            <p className="text-[10px] text-fuchsia-400 uppercase tracking-widest font-semibold mb-0.5">
              En inglés real
            </p>
            <p
              className="text-fuchsia-200 text-xl font-bold leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {lesson.equivalente_ingles}
            </p>
          </div>
        </div>

        {/* Hack de Profe Carlos */}
        <div className="bg-[#1A1A2E] border border-violet-500/20 rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎓</span>
            <p className="text-violet-300 text-xs font-bold uppercase tracking-widest">
              Hack de Profe Carlos
            </p>
          </div>
          <p className="text-white/75 text-sm leading-relaxed">
            {lesson.explicacion_hack}
          </p>
        </div>

        {/* Ejemplos */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl px-3 py-2.5">
            <span className="text-lg shrink-0 mt-0.5">🇺🇸</span>
            <p className="text-white/85 text-sm leading-relaxed italic">
              &ldquo;{lesson.ejemplo_uso_en}&rdquo;
            </p>
          </div>
          <div className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl px-3 py-2.5">
            <span className="text-lg shrink-0 mt-0.5">🇨🇱</span>
            <p className="text-white/55 text-sm leading-relaxed">
              &ldquo;{lesson.ejemplo_uso_es}&rdquo;
            </p>
          </div>
        </div>

        {/* Quiz */}
        <div className="bg-[#12121A] border border-white/8 rounded-2xl px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">⚡</span>
            <p className="text-white text-sm font-semibold leading-snug">
              {lesson.quiz_pregunta}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {lesson.quiz_opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => handleOption(idx)}
                className={getOptionStyle(idx)}
              >
                <span className="opacity-40 mr-2 font-mono text-xs">
                  {["A", "B", "C"][idx]}.
                </span>
                {opcion}
              </button>
            ))}
          </div>

          {/* Feedback de acierto */}
          {showCredits && (
            <div className="flex items-center justify-center gap-2 py-1 animate-bounce-once">
              <span className="text-emerald-400 font-bold text-sm">✓ ¡Correcto!</span>
              <span className="bg-emerald-400/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                +5 Créditos Pop 🎯
              </span>
            </div>
          )}
          {selected !== null && selected !== lesson.respuesta_correcta_index && (
            <p className="text-red-400/80 text-xs text-center">
              Casi… intenta de nuevo — esa no es la natural.
            </p>
          )}
        </div>

        {/* Espaciado para el CTA fijo */}
        <div className="h-20 shrink-0" />
      </div>

      {/* CTA Fijo pegado al fondo */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/95 to-transparent pt-6">
        <a
          href="https://wa.me/56912345678?text=Hola%20Profe%20Carlos%2C%20quiero%20hablar%20sin%20verg%C3%BCenza%20en%20ingl%C3%A9s%20%F0%9F%9A%80"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 active:scale-[0.97] transition-all shadow-[0_4px_24px_rgba(124,58,237,0.45)]"
        >
          ¿Quieres hablar sin vergüenza? Agenda una clase 🚀
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: Header fijo
// ─────────────────────────────────────────────
function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-lg">🧪</span>
        <span
          className="text-white font-extrabold text-base tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          The English Lab
        </span>
      </div>
      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
        <span className="text-emerald-400 text-xs font-bold">🏆</span>
        <span className="text-white/70 text-xs font-medium">0 Créditos</span>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────
// PAGE — punto de entrada
// ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-[#0A0A0F] max-w-md mx-auto relative">
      {/* Fonts via Next.js — añade en layout.tsx si no las tienes:
          import { Space_Grotesk, Inter } from "next/font/google" */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <AppHeader />

      {/* Feed vertical con snap scroll — el pt-[52px] evita que el header tape la primera tarjeta */}
      <div
className="snap-y snap-mandatory overflow-y-scroll h-screen pt-[52px] scroll-smooth hide-scrollbar"
      >
        {MOCK_LESSONS.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}

        {/* Final del feed */}
        <div className="snap-start h-svh w-full flex flex-col items-center justify-center gap-4 bg-[#0A0A0F] px-6 text-center">
          <span className="text-5xl">🎉</span>
          <h3
            className="text-white text-2xl font-extrabold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ¡Terminaste el lab de hoy!
          </h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Vuelve mañana para más modismos. O mejor aún — practica con el Profe Carlos en vivo.
          </p>
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_4px_24px_rgba(124,58,237,0.45)]"
          >
            Agendar clase ahora 🚀
          </a>
        </div>
      </div>
    </main>
  );
}
