# Our Wedding Bells

Atue como um desenvolvedor front-end e web designer experiente. Preciso que você crie um site de confirmação de presença (RSVP) para um casamento. O site deve ser uma "Single Page Application" (página única) com rolagem suave (smooth scroll), onde cada seção aparece com animações de "fade-in" e "slide-up" conforme o usuário desce a página.

Vou anexar três arquivos de referência:

1. `image_8246e3.jpg`: Use como base para o fundo (background) de todo o site. O site deve ter esse tom creme/bege claro com os elementos florais (folhagens verdes, flores rosas e amarelas) decorando as bordas/cantos das seções, criando uma estética romântica e rústica.

2. `image_824a49.png`: Use como referência visual estrita para a seção do cronômetro (fundo mostarda/dourado com os números em caixas brancas).

3. `confirmacao-presenca.html`: Use como base para a lógica de busca e estrutura, mas modernize o design e aplique as integrações que vou pedir abaixo.

A página deve ser responsiva (mobile-first) e dividida nas seguintes seções:

**SEÇÃO 1: Apresentação (Hero Section)**

- Deve ocupar a altura total da tela inicial (100vh).

- No topo, o versículo bíblico em uma fonte com serifa, elegante e um pouco menor: 

  "Para que todos vejam e saibam e considerem e juntamente entendam que a mão do Senhor fez isto…"

  Isaías 41:20

- No centro, os nomes dos noivos em grande destaque com uma fonte cursiva/manuscrita elegante (ex: 'Alex Brush' ou 'Great Vibes'): "Brunna e Luis Felipe"

- Abaixo dos nomes, o texto: "Junto com a benção de Deus e seus pais"

- Lista dos pais (em duas colunas no desktop, uma no mobile):

  (Lado 1) Cristiane Lopes de Jesus Gervásio e Antônio Gervásio Arantes Neto

  (Lado 2) Rosilda do Carmo Costa Silva e Iromar Cosmo da Silva

- O texto final da seção: "Convidam para o seu casamento"

**SEÇÃO 2: Contagem Regressiva**

- O design deve ser exatamente inspirado na imagem `image_824a49.png`.

- Fundo em tom mostarda/dourado escuro cobrindo a largura total da tela.

- Título em fonte cursiva: "Contagem Regressiva" (em branco).

- Um cronômetro funcional contando os Dias, Horas, Minutos e Segundos até a data: 16 de Janeiro de 2027 às 16:00.

- Os números devem ficar dentro de caixas brancas arredondadas, com o texto (Dias, Horas, etc.) embaixo do número, na cor mostarda.

**SEÇÃO 3: Confirmação de Presença (RSVP)**

- Título: "Confirme sua Presença"

- Subtítulo: "Encontre seu nome na lista abaixo e nos informe se poderá celebrar este dia conosco."

- Lógica rigorosa de convidados: Apenas pessoas desta lista exata podem confirmar. Não deve haver opção de "adicionar convidado".

- Lista de convidados (array):

  ["BRUNNA","LUIS FELIPE","ANTÔNIO","CRISTIANE","BIANCA","MARIA LUIZA","MARINA","IZABELLA","ROSILDA","IROMAR","CORINA","THIAGO","ANA","JOÃO","ROSÂNGELA","FERNANDA","RODRIGO","ANA LUIZA","ANA BEATRIZ","MARIA EDUARDA","CLAUDIA","ROLDÃO","LETÍCIA","HENRIQUE","MONALISA","RODRIGO GERVASIO","LIVIA","GUSTAVO","ABIGAIL","ALEUDA","MARIANNA","GUILHERME","SOLANGE","ILANA","GERALDO","LARA","MATHEUS","ANA LAURA","TÚLIO","GIOVANA","ZENA","GERALDO","JHONATA","LUDIMILA","JÚLIA","JAYSIONE","CÉLIO","PEDRO","ANA JÚLIA","ELEUSA","ISABEL VERÔNICA","HELENA","ISABEL GERVASIO","JÚLIO","MARIANA","FÁBIO","ADAUTO","ANDREA","GABRIEL","IZABEL","RONALDO","RAPHAEL","CAROL","RAFAELA","LORENZO","IAGO","VINICIUS","RAMU","APARECIDA","PRISCILA","ALESSANDRO","THEODORO","CATARINA","RODOLFO","VANESSA","MELINDA","MARIAH","MARCUS","SIMENE","ANA","MARCELO","ALEXÂNIA","JHONATA","DANIELA","MIGUEL","DÉBORA","LUCAS","ANDRESSA","PABLO","LETÍCIA","ANALU","RIBAS","ANTÔNIA","LUCIANA","MARCOS","DAVI","PAULA","RAPHAEL","LUIS","YASMIM","CECÍLIA","RAFAELA","THEODORO"]

- Interface: Um campo de busca ("Digite seu nome..."). Ao digitar, filtra a lista e exibe os cards com os nomes encontrados (baseado no código HTML fornecido).

- Ao clicar no nome, abre um Modal bonito perguntando: "Você poderá comparecer ao nosso casamento?" com botões "Sim, estarei lá" (verde/oliva) e "Não poderei comparecer" (cinza/discreto).

- **Backend/Integração:** Configure a submissão do formulário de forma que eu possa facilmente conectar a um Webhook (para integrar via Zapier/Make com o Google Sheets) ou utilize o banco de dados nativo do Lovable/Supabase de uma forma que seja fácil exportar para o Excel depois.

**SEÇÃO 4: Agradecimento (Footer)**

- Uma frase final centralizada, fofa e elegante: "Agradecemos de coração a todos que poderão compartilhar esse momento tão especial e inesquecível conosco. Mal podemos esperar para celebrar com vocês!"

- Finalize com as iniciais "B & L" e a data "16.01.2027".

Capriche nas animações usando Framer Motion ou transições CSS puras (elementos surgindo suavemente de baixo para cima quando entram na tela). Mantenha as cores no padrão da paleta da imagem floral (creme, oliva, rosa suave, mostarda).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9b37fe35-6ec9-4d5b-818e-70ac92e70316).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
