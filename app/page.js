import { createClient } from '../utils/supabase/server'

export default async function FeedPage() {
  const supabase = await createClient()
  
  // Traemos las lecciones ordenadas de la más nueva a la más antigua
  const { data: lecciones, error } = await supabase
    .from('micro_lecciones')
    .select('*')
    .order('fecha_creacion', { ascending: false })

  if (error) {
    return (
      <div className="p-6 text-red-500 font-bold max-w-md mx-auto mt-10 bg-red-50 rounded-xl border border-red-200">
        ❌ Error al cargar el feed: {error.message}
      </div>
    )
  }

  return (
    <main className="max-w-md mx-auto p-4 min-h-screen bg-slate-50">
      <header className="py-6">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          ⚡ Aguirre English Studio
        </h1>
        <p className="text-sm text-slate-500 mt-1">Aprende inglés real con cultura pop y slang latino</p>
      </header>
      
      <div className="space-y-4">
        {lecciones?.map((leccion) => (
          <article 
            key={leccion.id} 
            className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 transition hover:shadow-md"
          >
            {/* Badge de Categoría */}
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-max ${
              leccion.tipo === 'slang_latino' ? 'bg-amber-100 text-amber-800' :
              leccion.tipo === 'pop_culture' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {leccion.tipo.replace('_', ' ')}
            </span>

            {/* Contenido Principal */}
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              "{leccion.input_original}"
            </h2>
            <p className="text-lg font-medium text-indigo-600">
              👉 {leccion.equivalente_ingles}
            </p>
            
            {/* Explicación / Hack */}
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2 leading-relaxed">
              <strong>Hack:</strong> {leccion.explicacion_hack}
            </p>

            {/* Ejemplo de uso */}
            <div className="text-xs text-slate-400 mt-1 italic bg-slate-100/50 p-2 rounded-lg">
              <strong>Ejemplo:</strong> {leccion.ejemplo_uso}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}