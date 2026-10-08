import { useState } from "react";

// Lista de presentes com cotas de dinheiro primeiro, e itens físicos depois
const initialGifts = [
  // Cotas e Dinheiro (Sem limite de quem pode dar, abre apenas o PIX)
  { id: 21, name: "Mensalidade academia", price: "R$ 200", image: "/presentes/academia.jpg", pledged: false },
  { id: 22, name: "Condomínio do mês", price: "R$ 300", image: "/presentes/condominio.jpg", pledged: false },
  { id: 23, name: "Aluguel", price: "R$ 1500", image: "/presentes/aluguel.jpg", pledged: false },
  { id: 24, name: "Gasolina da semana", price: "R$ 200", image: "/presentes/gasolina.jpg", pledged: false },
  { id: 25, name: "Revisão do carro", price: "R$ 800", image: "/presentes/revisao.jpg", pledged: false },
  { id: 26, name: "Pneu pro carro", price: "R$ 100", image: "/presentes/pneu.jpg", pledged: false },
  { id: 27, name: "Ração pro cachorro", price: "R$ 150", image: "/presentes/racao.jpg", pledged: false },
  { id: 28, name: "Jantar para o casal", price: "R$ 200", image: "/presentes/jantar.jpg", pledged: false },
  { id: 29, name: "Corte de cabelo pra noiva", price: "R$ 90", image: "/presentes/cabelo-noiva.jpg", pledged: false },
  { id: 30, name: "Barbearia do noivo", price: "R$ 100", image: "/presentes/cabelo-noivo.jpg", pledged: false },
  { id: 31, name: "Lua de mel", price: "R$ 500", image: "/presentes/lua-de-mel.jpg", pledged: false },

  // Eletrodomésticos e Casa (Ficam reservados após alguém escolher)
  { id: 1, name: "Ar condicionado", price: null, image: "/presentes/ar-condicionado.jpg", pledged: false },
  { id: 2, name: "Liquidificador", price: null, image: "/presentes/liquidificador.jpg", pledged: false },
  { id: 3, name: "Batedeira planetária", price: null, image: "/presentes/batedeira.jpg", pledged: false },
  { id: 4, name: "Forno elétrico", price: null, image: "/presentes/forno.jpg", pledged: false },
  { id: 5, name: "Mixer 3 em 1", price: null, image: "/presentes/mixer.jpg", pledged: false },
  { id: 6, name: "Grill", price: null, image: "/presentes/grill.jpg", pledged: false },
  { id: 7, name: "Fogão", price: null, image: "/presentes/fogao.jpg", pledged: false },
  { id: 8, name: "Televisão até 65 polegadas", price: null, image: "/presentes/tv.jpg", pledged: false },
  { id: 9, name: "Sugar", price: null, image: "/presentes/sugar.jpg", pledged: false },
  { id: 10, name: "Ventilador", price: null, image: "/presentes/ventilador.jpg", pledged: false },
  
  // Utensílios
  { id: 11, name: "Bacias de inox", price: null, image: "/presentes/bacias.jpg", pledged: false },
  { id: 12, name: "Formas antiaderente", price: null, image: "/presentes/formas.jpg", pledged: false },
  { id: 13, name: "Panelas le gourmet pretas", price: null, image: "/presentes/panelas.jpg", pledged: false },
  { id: 14, name: "Taças", price: null, image: "/presentes/tacas.jpg", pledged: false },
  { id: 15, name: "Escorredor de alimentos", price: null, image: "/presentes/escorredor.jpg", pledged: false },
  { id: 16, name: "Faqueiro", price: null, image: "/presentes/faqueiro.jpg", pledged: false },
  { id: 17, name: "Pote de mantimentos", price: null, image: "/presentes/potes.jpg", pledged: false },
  { id: 18, name: "Travessas vidro", price: null, image: "/presentes/travessas.jpg", pledged: false },
  { id: 19, name: "Panela de pressão", price: null, image: "/presentes/panela-pressao.jpg", pledged: false },
  { id: 20, name: "Pipoqueira", price: null, image: "/presentes/pipoqueira.jpg", pledged: false },
];

export function GiftsSection() {
  const [gifts, setGifts] = useState(initialGifts);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  
  // Novo estado apenas para exibir o PIX sem pedir nome ou bloquear o item
  const [selectedPixGift, setSelectedPixGift] = useState<{name: string, price: string} | null>(null);
  
  const [guestName, setGuestName] = useState("");

  const handleConfirmGift = () => {
    if (!guestName.trim()) return;
    setGifts(gifts.map(g => g.id === selectedGift ? { ...g, pledged: true } : g));
    setSelectedGift(null);
    setGuestName("");
    alert("Presente reservado com sucesso! Muito obrigado!");
  };

  return (
    <section 
      className="h-screen w-full snap-start overflow-y-auto relative bg-[#FAF5EC] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{
        backgroundImage: "url('/floral-gifts.jpg')", // Aponta para a imagem de alta qualidade
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed" 
      }}
    >
      {/* Filtro ultra-leve para garantir que as flores não atrapalhem a leitura */}
      <div className="absolute inset-0 bg-[#F5EDDC]/10 pointer-events-none"></div>

      {/* Container do conteúdo que permite a rolagem */}
      <div className="relative z-10 w-full flex flex-col items-center py-20 px-4 min-h-max">
        
        <h2 className="text-5xl md:text-6xl text-[#96691E] mb-4 text-center drop-shadow-md" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Lista de Presentes
        </h2>
        <p className="text-[#4A5543] text-lg md:text-xl font-serif text-center max-w-2xl mb-16 drop-shadow-sm font-medium">
          Ajude a construir nossa vida de casados
        </p>

        {/* Grelha de Presentes */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <div key={gift.id} className={`bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all ${gift.pledged ? 'opacity-60 grayscale' : 'hover:shadow-lg hover:-translate-y-1'}`}>
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col items-center h-[180px] justify-between">
                <div className="text-center w-full">
                  <h4 className="font-serif text-[#2C3E2D] text-lg mb-1 leading-tight">{gift.name}</h4>
                  {gift.price && <p className="text-[#96691E] font-semibold mt-2">Sugestão: {gift.price}</p>}
                </div>
                
                {gift.pledged && !gift.price ? (
                  <div className="w-full py-2 bg-gray-100 text-gray-500 text-center rounded-lg text-sm uppercase tracking-wider font-semibold border border-gray-200">
                    Já Presenteado
                  </div>
                ) : (
                  <button 
                    onClick={() => gift.price ? setSelectedPixGift({ name: gift.name, price: gift.price }) : setSelectedGift(gift.id)}
                    className="w-full py-2 bg-[#4A5543] text-white rounded-lg text-sm uppercase tracking-wider hover:bg-[#2C3E2D] transition-colors shadow-sm"
                  >
                    Presentear
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Secção */}
        <div className="mt-20 max-w-3xl text-center pb-12">
          <p className="text-xl md:text-2xl text-[#96691E] font-serif italic drop-shadow-sm font-medium">
            “Mais do que presentes, vocês estarão fazendo parte do começo da nossa história. Obrigado por celebrar esse momento com a gente! ❤️”
          </p>
        </div>

        {/* Modal 1: Informações do PIX (Para Cotas) */}
        {selectedPixGift && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-serif text-[#2C3E2D] mb-2 text-center">{selectedPixGift.name}</h3>
              <p className="text-gray-600 text-center mb-6">
                Muito obrigado por nos ajudar! Para contribuir (Sugestão: <strong>{selectedPixGift.price}</strong>), utilize a nossa chave PIX abaixo:
              </p>
              
              <div className="p-6 bg-[#FAF5EC] rounded-xl flex flex-col items-center mb-6 shadow-inner border border-[#E5D5B8]">
                <p className="text-sm uppercase tracking-widest text-[#7A6E58] mb-2">Chave PIX</p>
                <p className="text-lg md:text-xl font-mono text-[#2C3E2D] font-bold text-center break-all">
                  [COLOQUE SUA CHAVE AQUI]
                </p>
              </div>

              <button 
                onClick={() => setSelectedPixGift(null)}
                className="w-full py-3 bg-[#96691E] text-white uppercase tracking-widest text-sm rounded-lg hover:bg-[#7A5515] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Modal 2: Confirmar Presente Físico (Pede Nome e Reserva) */}
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
                  className="w-full py-3 text-gray-500 uppercase tracking-widest text-sm hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
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
      </div>
    </section>
  );
}