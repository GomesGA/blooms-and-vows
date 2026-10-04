import { useState } from "react";

// Lista de presentes com valores e imagens de demonstração
const initialGifts = [
  { id: 1, name: "Ar condicionado", price: null, image: "https://picsum.photos/seed/ar/400/300", pledged: false },
  { id: 2, name: "Liquidificador", price: null, image: "https://picsum.photos/seed/liq/400/300", pledged: false },
  { id: 3, name: "Batedeira planetária", price: null, image: "https://picsum.photos/seed/bat/400/300", pledged: false },
  { id: 4, name: "Televisão até 65 polegadas", price: null, image: "https://picsum.photos/seed/tv/400/300", pledged: true }, // Exemplo de já comprado
  { id: 5, name: "Mensalidade academia", price: "R$ 200", image: "https://picsum.photos/seed/gym/400/300", pledged: false },
  { id: 6, name: "Lua de mel", price: "R$ 500", image: "https://picsum.photos/seed/lua/400/300", pledged: false },
  { id: 7, name: "Jantar para o casal", price: "R$ 200", image: "https://picsum.photos/seed/jantar/400/300", pledged: false },
  { id: 8, name: "Revisão do carro", price: "R$ 800", image: "https://picsum.photos/seed/carro/400/300", pledged: false },
];

export function GiftsSection() {
  const [gifts, setGifts] = useState(initialGifts);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [guestName, setGuestName] = useState("");
  const [showPix, setShowPix] = useState(false);

  const handleConfirmGift = () => {
    if (!guestName.trim()) return;
    
    // Atualiza visualmente para "comprado" (Mais tarde ligaremos ao Supabase aqui)
    setGifts(gifts.map(g => g.id === selectedGift ? { ...g, pledged: true } : g));
    setSelectedGift(null);
    setGuestName("");
    alert("Presente reservado com sucesso! Muito obrigado!");
  };

  return (
    <section className="min-h-screen w-full bg-[#FAF5EC] py-20 px-4 flex flex-col items-center">
      <h2 className="text-5xl md:text-6xl text-[#96691E] mb-4 text-center drop-shadow-sm" style={{ fontFamily: "'Alex Brush', cursive" }}>
        Lista de Presentes
      </h2>
      <p className="text-[#4A5543] text-lg md:text-xl font-serif text-center max-w-2xl mb-12">
        Ajude a construir nossa vida de casados
      </p>

      {/* Botão de PIX em Destaque */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-[#E5D5B8] flex flex-col items-center mb-16">
        <h3 className="text-2xl font-serif text-[#2C3E2D] mb-4">Prefere contribuir em dinheiro?</h3>
        <p className="text-center text-gray-600 mb-6 max-w-lg">
          Qualquer valor é bem-vindo para nos ajudar a iniciar esta nova etapa.
        </p>
        <button 
          onClick={() => setShowPix(true)}
          className="bg-[#96691E] text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-[#7A5515] transition-colors"
        >
          Contribuir com PIX
        </button>

        {showPix && (
          <div className="mt-6 p-6 bg-[#FAF5EC] rounded-xl w-full max-w-md flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <p className="text-sm uppercase tracking-widest text-[#7A6E58] mb-2">Chave PIX</p>
            <p className="text-xl font-mono text-[#2C3E2D] font-bold mb-4">[SUA CHAVE PIX AQUI]</p>
            <p className="text-xs text-center text-gray-500">Obrigado pela sua contribuição!</p>
          </div>
        )}
      </div>

      {/* Grelha de Presentes */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gifts.map((gift) => (
          <div key={gift.id} className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all ${gift.pledged ? 'opacity-60 grayscale' : 'hover:shadow-md'}`}>
            <div className="h-48 w-full overflow-hidden">
              <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col items-center h-[180px] justify-between">
              <div className="text-center">
                <h4 className="font-serif text-[#2C3E2D] text-lg mb-1">{gift.name}</h4>
                {gift.price && <p className="text-[#96691E] font-semibold">{gift.price}</p>}
              </div>
              
              {gift.pledged ? (
                <div className="w-full py-2 bg-gray-100 text-gray-500 text-center rounded-lg text-sm uppercase tracking-wider font-semibold">
                  Já Presenteado
                </div>
              ) : (
                <button 
                  onClick={() => setSelectedGift(gift.id)}
                  className="w-full py-2 bg-[#4A5543] text-white rounded-lg text-sm uppercase tracking-wider hover:bg-[#2C3E2D] transition-colors"
                >
                  Presentear
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé da Secção */}
      <div className="mt-20 max-w-3xl text-center">
        <p className="text-xl md:text-2xl text-[#96691E] font-serif italic">
          “Mais do que presentes, vocês estarão fazendo parte do começo da nossa história. Obrigado por celebrar esse momento com a gente! ❤️”
        </p>
      </div>

      {/* Modal para colocar o nome */}
      {selectedGift && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif text-[#2C3E2D] mb-2 text-center">Confirmar Presente</h3>
            <p className="text-gray-600 text-center mb-6">
              Para reservar o item <strong>{gifts.find(g => g.id === selectedGift)?.name}</strong>, por favor, insira o seu nome completo. O seu nome não ficará visível publicamente.
            </p>
            <input 
              type="text" 
              placeholder="O seu nome completo" 
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96691E] mb-6"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedGift(null)}
                className="w-full py-3 text-gray-500 uppercase tracking-widest text-sm hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmGift}
                disabled={!guestName.trim()}
                className="w-full py-3 bg-[#96691E] text-white uppercase tracking-widest text-sm rounded-lg hover:bg-[#7A5515] disabled:opacity-50 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}