import { useState, useMemo } from "react";

// Lista exata de convidados fornecida
const rawGuests = [
  "BRUNNA","LUIS FELIPE","ANTÔNIO","CRISTIANE","BIANCA","MARIA LUIZA","MARINA","IZABELLA",
  "ROSILDA","IROMAR","CORINA","THIAGO","ANA","JOÃO","ROSÂNGELA","FERNANDA","RODRIGO",
  "ANA LUIZA","ANA BEATRIZ","MARIA EDUARDA","CLAUDIA","ROLDÃO","LETÍCIA","HENRIQUE","MONALISA",
  "RODRIGO GERVASIO","LIVIA","GUSTAVO","ABIGAIL","ALEUDA","MARIANNA","GUILHERME","SOLANGE",
  "ILANA","GERALDO","LARA","MATHEUS","ANA LAURA","TÚLIO","GIOVANA","ZENA","GERALDO","JHONATA",
  "LUDIMILA","JÚLIA","JAYSIONE","CÉLIO","PEDRO","ANA JÚLIA","ELEUSA","ISABEL VERÔNICA","HELENA",
  "ISABEL GERVASIO","JÚLIO","MARIANA","FÁBIO","ADAUTO","ANDREA","GABRIEL","IZABEL","RONALDO",
  "RAPHAEL","CAROL","RAFAELA","LORENZO","IAGO","VINICIUS","RAMU","APARECIDA","PRISCILA",
  "ALESSANDRO","THEODORO","CATARINA","RODOLFO","VANESSA","MELINDA","MARIAH","MARCUS","SIMENE",
  "ANA","MARCELO","ALEXÂNIA","JHONATA","DANIELA","MIGUEL","DÉBORA","LUCAS","ANDRESSA","PABLO",
  "LETÍCIA","ANALU","RIBAS","ANTÔNIA","LUCIANA","MARCOS","DAVI","PAULA","RAPHAEL","LUIS",
  "YASMIM","CECÍLIA","RAFAELA","THEODORO"
];

// Formata os nomes (Deixa apenas a primeira letra maiúscula) e coloca em ordem alfabética
const guestsList = rawGuests
  .map((name, index) => ({
    id: `g${index}`,
    name: name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

export function RsvpSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<{id: string, name: string} | null>(null);
  
  // Estado temporário para simular as respostas na tela (depois o Supabase cuida disso)
  const [statuses, setStatuses] = useState<Record<string, 'yes' | 'no'>>({}); 

  // Filtra a lista de acordo com o que foi digitado (ignorando acentos)
  const filteredGuests = useMemo(() => {
    const normalizedSearch = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return guestsList.filter(g =>
      g.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm]);

  const handleConfirm = (status: 'yes' | 'no') => {
    if (selectedGuest) {
      setStatuses(prev => ({ ...prev, [selectedGuest.id]: status }));
      setSelectedGuest(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative font-serif">
      
      {/* CABEÇALHO FIXO (STICKY) - Fica travado no topo enquanto a lista rola */}
      <div className="sticky top-0 z-20 bg-[#F5EDDC]/95 backdrop-blur-md pt-8 pb-4 px-4 flex flex-col items-center border-b border-[#5C6A3E]/10 rounded-t-2xl shadow-sm">
        
        <h2 className="text-6xl md:text-7xl text-[#96691E] mb-2 drop-shadow-sm text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Confirme sua Presença
        </h2>
        
        <p className="text-[#7A6E58] text-center max-w-lg mb-6 text-sm md:text-base">
          Encontre seu nome na lista abaixo e nos informe se poderá celebrar este dia conosco.
        </p>

        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/70 border border-[#B8842E]/40 rounded-full py-3 px-6 text-center text-[#4A3E2E] focus:outline-none focus:border-[#96691E] focus:ring-1 focus:ring-[#96691E] transition-all placeholder:text-[#7A6E58]/60"
          />
        </div>
        
        <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#7A6E58] uppercase mt-4 font-semibold">
          {filteredGuests.length} {filteredGuests.length === 1 ? 'Convidado' : 'Convidados'}
        </p>
      </div>

      {/* LISTA MÓVEL SEM BARRA DE ROLAGEM */}
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

      {/* MODAL DE CONFIRMAÇÃO (Abre ao clicar no nome) */}
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