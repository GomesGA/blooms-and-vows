import { useState, useMemo, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const rawGuests = [
  "ABIGAIL DE JESUS", "ADAUTO GOMES", "ALESSANDRO MACHADO", "ALEUDA DE FATIMA",
  "ALEXÂNIA FABIANA", "ANA DALAGLIO", "ANA CAROLINA COSTA", "ANA BEATRIZ LOPES",
  "ANA JULIA GERVASIO", "ANA LAURA INÁCIO", "ANA LUIZA LOPES", "ANALU FERREIRA",
  "ANDREA KATO", "ANDRESSA GUERRA", "ANTÔNIA RODRIGUES", "ANTÔNIO GERVASIO",
  "APARECIDA ELAINE", "BIANCA GERVASIO", "BRUNNA GERVASIO", "ANNA CAROLINE FARIA",
  "CÉLIO GONÇALVES", "CLAUDIA RODRIGUES", "CORINA DO CARMO", "CRISTIANE GERVASIO",
  "DANIELA DOS SANTOS", "DAVI MOTA", "DÉBORAH SOUZA", "ELEUSA GERVASIO",
  "FÁBIO GERVASIO", "FERNANDA SOUZA", "FERNANDA LOPES", "FLÁVIA NOVAES",
  "GABRIEL KATO", "GERALDO FILHO", "GERALDO REZENDE", "GIOVANA TIZZO",
  "GUILHERME GOMES", "GUSTAVO GERVASIO", "MARIA HELENA GERVASIO", "HENRIQUE MAIA",
  "HIAGO SOUZA", "ILANA VASCONCELOS", "IROMAR COSMO", "IZABEL GERVASIO",
  "ISABEL VERÔNICA", "IZABEL CRISTINA", "IZABELLA COSTA", "JAYSIONE VAZ",
  "JHONATTA LUIGI", "JHONATA CARLOS", "JOÃO AFONSO", "JÚLIA GUIMARÃES",
  "JÚLIO CESAR", "LARA REZENDE", "LETÍCIA GERVASIO", "LETÍCIA FERREIRA",
  "LIVIA GERVASIO", "LORENZO GOMES", "LUCAS SIQUEIRA", "LUCIANA MOTA",
  "LUDIMILA SOUZA", "LUIZ LIMA", "LUIS FELIPE COSTA", "MARCELO DALAGLIO",
  "MARCUS SULLIVAN", "MARCUS DALAGLIO", "MARIA EDUARDA LOPES", "MARIA LUIZA LOPES",
  "MARIANA GERVASIO", "MARIANNA GOMES", "MARINA RODRIGUES", "MATHEUS REZENDE",
  "MIGUEL FARIA", "MONALISA VILELA", "PABLO ESTHEVAN", "PAULA NAVES",
  "PEDRO BEZERRA", "PRISCILA MARTINS", "RAFAELA GOMES", "RAMU NETO",
  "RAPHAEL OLIVEIRA", "RAPHAEL GOMES", "LUIS RIBAS", "RODOLFO MARTINS",
  "RODRIGO PEREIRA", "RODRIGO GERVASIO", "ROLDÃO MAIA", "RONALDO DA SILVA",
  "ROSÂNGELA COSTA", "ROSILDA DO CARMO", "SIMENE DALAGLIO", "SOLANGE GOMES",
  "THIAGO ALMEIDA", "TÚLIO RIBEIRO", "VANESSA BAHIA", "VINICIUS GOMES",
  "YASMIM VITÓRIA", "ZENA REZENDE", "BRUNO ALVES"
];

const guestsList = rawGuests
  .map((name, index) => ({
    id: `g${index}`,
    name: name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export function RsvpSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<{id: string, name: string} | null>(null);
  const [statuses, setStatuses] = useState<Record<string, 'yes' | 'no'>>({}); 

  // Sua URL oficial do Google Sheets (apenas para registro em background)
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPXeYG-M-N1lCrn8DDwYI1T7dxkQZf3hfNS-PK1hCwTMiwwWdHDg8hIfcW4VIxtCfH/exec";

  // LER DADOS DO SUPABASE (Muito mais rápido)
  useEffect(() => {
    const fetchSupabase = async () => {
      const { data, error } = await supabase.from('rsvps').select('*');
      
      if (!error && data) {
        const initialStatuses: Record<string, 'yes' | 'no'> = {};
        data.forEach(row => {
          initialStatuses[row.guest_id] = row.status as 'yes' | 'no';
        });
        setStatuses(initialStatuses);
      }
    };
    
    fetchSupabase();
  }, []);

  const filteredGuests = useMemo(() => {
    const normalizedSearch = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return guestsList.filter(g =>
      g.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm]);

  const handleConfirm = async (status: 'yes' | 'no') => {
    if (!selectedGuest) return;
    const currentGuest = selectedGuest;
    
    // 1. Muda na tela instantaneamente
    setStatuses(prev => ({ ...prev, [currentGuest.id]: status }));
    setSelectedGuest(null);

    // 2. Salva no Supabase (com aviso de erro caso falhe)
    const { error: supabaseError } = await supabase.from('rsvps').upsert({
      guest_id: currentGuest.id,
      name: currentGuest.name,
      status: status
    });

    if (supabaseError) {
      console.error("ERRO SUPABASE:", supabaseError.message);
    } else {
      console.log("Supabase: Salvo com sucesso!");
    }

    // 3. Envia para o Google Sheets em background
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", 
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        nome: currentGuest.name,
        status: status === 'yes' ? 'Confirmado' : 'Não vai'
      }),
    }).catch(() => {
      // Ignora erros de rede do Google no console para não sujar a tela
    });
  };

  return (
    <div className="flex flex-col h-full w-full relative font-serif">
      <div className="sticky top-0 z-20 pt-8 pb-4 px-4 flex flex-col items-center">
        <h2 className="text-6xl md:text-7xl text-[#96691E] mb-2 drop-shadow-sm text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Confirme sua Presença
        </h2>
        <p className="text-[#7A6E58] text-center max-w-lg mb-6 text-sm md:text-base drop-shadow-sm">
          Encontre seu nome na lista abaixo e nos informe se poderá celebrar este dia conosco.
        </p>
        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/70 border border-[#B8842E]/40 rounded-full py-3 px-6 text-center text-[#4A3E2E] focus:outline-none focus:border-[#96691E] focus:ring-1 focus:ring-[#96691E] transition-all placeholder:text-[#7A6E58]/60 shadow-sm"
          />
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#7A6E58] uppercase mt-4 font-semibold drop-shadow-sm">
          {filteredGuests.length} {filteredGuests.length === 1 ? 'Convidado' : 'Convidados'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredGuests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto pb-10">
            {filteredGuests.map(guest => (
              <button
                key={guest.id}
                onClick={() => setSelectedGuest(guest)}
                className={`p-4 border rounded-xl text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  statuses[guest.id] === 'yes'
                    ? 'bg-[#5C6A3E]/10 border-[#5C6A3E]/50'
                    : statuses[guest.id] === 'no'
                    ? 'bg-red-900/5 border-red-900/20'
                    : 'bg-white/50 border-[#B8842E]/20 hover:border-[#B8842E]/60 hover:bg-white/80'
                }`}
              >
                <span className="block text-xl text-[#4A3E2E]">{guest.name}</span>
                <span className={`text-[10px] tracking-widest uppercase mt-2 block font-medium ${
                  statuses[guest.id] === 'yes' ? 'text-[#47512F]'
                  : statuses[guest.id] === 'no' ? 'text-red-700/70'
                  : 'text-[#7A6E58]/60'
                }`}>
                  {statuses[guest.id] === 'yes' ? 'Presença Confirmada'
                   : statuses[guest.id] === 'no' ? 'Não comparecerá'
                   : 'Toque para responder'}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#7A6E58] mt-8 text-lg">Nenhum nome encontrado.</p>
        )}
      </div>

      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#F5EDDC] border border-[#B8842E]/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-5xl text-[#96691E] mb-2" style={{ fontFamily: "'Alex Brush', cursive" }}>
              {selectedGuest.name}
            </h3>
            <p className="text-[#4A3E2E] mb-8 text-lg">Você poderá comparecer ao nosso casamento?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleConfirm('yes')}
                className="bg-[#5C6A3E] hover:bg-[#47512F] text-white py-3 px-4 rounded-lg transition-colors text-xs tracking-widest uppercase font-semibold shadow-md"
              >
                Sim, estarei lá
              </button>
              <button
                onClick={() => handleConfirm('no')}
                className="bg-transparent border border-[#7A6E58]/40 hover:bg-[#7A6E58]/10 text-[#4A3E2E] py-3 px-4 rounded-lg transition-colors text-xs tracking-widest uppercase font-semibold"
              >
                Não poderei comparecer
              </button>
              <button
                onClick={() => setSelectedGuest(null)}
                className="mt-3 text-[#7A6E58] hover:text-[#4A3E2E] underline text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}