import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { FloralDivider } from "./FloralDivider";
import { supabase } from "@/integrations/supabase/client";

// Lista de presentes com cotas de dinheiro primeiro, e itens físicos depois
const initialGifts = [
  // Cotas e Dinheiro (Sem limite de quem pode dar, abre apenas o PIX)
  { id: 21, name: "Mensalidade academia", price: "R$ 200", image: "/presentes/academia.jpg", pledged: false },
  { id: 22, name: "Condomínio do mês", price: "R$ 300", image: "/presentes/condominio.jpg", pledged: false },
  { id: 23, name: "Aluguel", price: "R$ 1500", image: "/presentes/aluguel.jpg", pledged: false },
  { id: 24, name: "Gasolina da semana", price: "R$ 200", image: "/presentes/gasolina.jpg", pledged: false },
  { id: 25, name: "Revisão do carro", price: "R$ 800", image: "/presentes/revisao.jpg", pledged: false },
  { id: 26, name: "Pneu pro carro", price: "R$ 100", image: "/presentes/pneu.jpg", pledged: false },
  { id: 28, name: "Jantar para o casal", price: "R$ 200", image: "/presentes/jantar.jpg", pledged: false },
  { id: 29, name: "Corte de cabelo pra noiva", price: "R$ 120", image: "/presentes/cabelo-noiva.jpg", pledged: false },
  { id: 30, name: "Barbearia do noivo", price: "R$ 120", image: "/presentes/cabelo-noivo.jpg", pledged: false },
  { id: 31, name: "Lua de mel", price: "R$ 500", image: "/presentes/lua-de-mel.jpg", pledged: false },

  // Eletrodomésticos e Casa (Ficam reservados após alguém escolher)
  { id: 1, name: "Ar condicionado", price: null, image: "/presentes/ar-condicionado.jpg", pledged: false },
  { id: 2, name: "Liquidificador", price: null, image: "/presentes/liquidificador.jpg", pledged: false },
  { id: 3, name: "Batedeira planetária", price: null, image: "/presentes/batedeira.jpg", pledged: false },
  { id: 4, name: "Forno elétrico", price: null, image: "/presentes/forno.jpg", pledged: false },
  { id: 5, name: "Mixer 3 em 1", price: null, image: "/presentes/mixer.jpg", pledged: false },
  { id: 6, name: "Grill", price: null, image: "/presentes/grill.jpg", pledged: false },
  { id: 7, name: "Fogão", price: null, image: "/presentes/fogao.jpg", pledged: false },
  { id: 8, name: "Televisão até 65 polegadas", price: null, image: "/presentes/televisao.jpg", pledged: false },
  { id: 9, name: "Sugar", price: null, image: "/presentes/suggar.jpg", pledged: false },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Novo estado apenas para exibir o PIX sem pedir nome ou bloquear o item
  const [selectedPixGift, setSelectedPixGift] = useState<{name: string, price: string} | null>(null);
  
  const [guestName, setGuestName] = useState("");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPXeYG-M-N1lCrn8DDwYI1T7dxkQZf3hfNS-PK1hCwTMiwwWdHDg8hIfcW4VIxtCfH/exec";

  // LER DADOS DO SUPABASE (para sincronizar os presentes já escolhidos)
  useEffect(() => {
    const fetchSupabase = async () => {
      const { data, error } = await supabase.from('gift_reservations').select('gift_id');
      
      if (!error && data) {
        const reservedGiftIds = new Set(data.map(row => row.gift_id));
        setGifts(prevGifts => 
          prevGifts.map(g => reservedGiftIds.has(g.id) ? { ...g, pledged: true } : g)
        );
      }
    };
    
    fetchSupabase();
  }, []);

  const handleConfirmGift = async () => {
    if (!guestName.trim() || selectedGift === null) return;
    
    setIsSubmitting(true);
    const giftToReserve = gifts.find(g => g.id === selectedGift);
    
    // 1. Salva no Supabase
    const { error: supabaseError } = await supabase.from('gift_reservations').insert({
      gift_id: selectedGift,
      guest_name: guestName
    });

    if (supabaseError) {
      console.error("ERRO SUPABASE:", supabaseError.message);
      // Se houver erro de UNIQUE constraint (alguém já pegou), talvez mostrar um alerta.
    }

    // 2. Muda na tela instantaneamente
    setGifts(gifts.map(g => g.id === selectedGift ? { ...g, pledged: true } : g));

    // 3. Envia para o Google Sheets em background
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", 
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        tipo: 'presente',
        nome: guestName,
        status: `Presenteou: ${giftToReserve?.name}`
      }),
    }).catch(() => {});

    setIsSubmitting(false);
    setSelectedGift(null);
    setGuestName("");
    alert("Presente reservado com sucesso! Muito obrigado!");
  };

  return (
    <section 
      id="presentes"
      // Fundo floral espelhado (continua as flores da tela anterior).
      // A seção fica fixa e só o conteúdo de dentro rola, assim as flores não "fogem".
      className="h-[100dvh] w-full snap-start floral-page floral-page-flip"
    >
      {/* Container do conteúdo que permite a rolagem */}
      <div className="relative h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="w-full flex flex-col items-center py-20 px-4 min-h-max">
        
        <Reveal>
          <h2 className="text-6xl md:text-7xl text-[#96691E] mb-2 text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
            Lista de Presentes
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <FloralDivider className="mb-4" />
        </Reveal>
        <Reveal delay={250}>
          <p className="text-[#7A6E58] text-center max-w-lg mb-12 text-sm md:text-base">
            Seu maior presente é a sua presença! Mas se desejar nos presentear, escolha uma das opções abaixo. As opções em dinheiro (cotas) mostrarão a chave PIX, e os itens físicos poderão ser reservados aqui mesmo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-2">
          {gifts.map((gift, index) => (
            <Reveal key={gift.id} delay={100 * (index % 4)}>
              <div 
                className={`bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full
                  ${gift.pledged ? 'opacity-60 grayscale-[50%] border-gray-300' : 'border-[#E5D5B8] hover:-translate-y-1 hover:border-[#B8842E]'}`}
              >
                <div className="relative h-48 w-full bg-[#FAF5EC]">
                  <img 
                    src={gift.image} 
                    alt={gift.name}
                    className="w-full h-full object-cover"
                  />
                  {gift.pledged && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white/90 text-[#5C6A3E] px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg transform -rotate-12">
                        Já Presenteado
                      </span>
                    </div>
                  )}
                  {gift.price && !gift.pledged && (
                    <div className="absolute top-3 right-3 bg-[#96691E] text-white px-3 py-1 rounded-full font-semibold text-sm shadow-md">
                      {gift.price}
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl text-[#2C3E2D] font-medium mb-4 flex-grow text-center">{gift.name}</h3>
                  <button
                    onClick={() => gift.price ? setSelectedPixGift({name: gift.name, price: gift.price}) : setSelectedGift(gift.id)}
                    disabled={gift.pledged}
                    className={`w-full py-3 rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors
                      ${gift.pledged 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-[#5C6A3E] text-white hover:bg-[#47512F] hover:shadow-md active:scale-[0.98]'}`}
                  >
                    {gift.pledged ? 'Indisponível' : (gift.price ? 'Contribuir via PIX' : 'Reservar Presente')}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rodapé da Secção */}
        <Reveal className="mt-20 max-w-3xl text-center pb-12">
          <p className="text-xl md:text-2xl text-[#5C6A3E] font-serif italic font-medium">
            “Mais do que presentes, vocês estarão fazendo parte do começo da nossa história. Obrigado por celebrar esse momento com a gente! ❤️”
          </p>
        </Reveal>

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
                  brunnagervasio08@gmail.com
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

        {/* Modal 2: Formulário de Reserva (Para Itens Físicos) */}
        {selectedGift && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
              <h3 className="text-3xl text-[#96691E] mb-2 text-center" style={{ fontFamily: "'Alex Brush', cursive" }}>
                Confirmar Reserva
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Você está reservando: <strong>{gifts.find(g => g.id === selectedGift)?.name}</strong>
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#7A6E58] mb-2 uppercase tracking-widest">Seu Nome Completo</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#FAF5EC] border border-[#E5D5B8] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#96691E]/50 focus:border-[#96691E] transition-all"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedGift(null)}
                  className="w-full py-3 bg-gray-100 text-gray-600 uppercase tracking-widest text-sm rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmGift}
                  disabled={!guestName.trim() || isSubmitting}
                  className="w-full py-3 bg-[#96691E] text-white uppercase tracking-widest text-sm rounded-lg hover:bg-[#7A5515] disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Confirmando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}