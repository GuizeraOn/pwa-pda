# Mapeamento Completo da Experiência do Comprador (UX & Product Breakdown)
## App PWA: **El Protocolo del Vinagre**

---

## 1. Visão Geral do Produto e Público-Alvo

### O Produto
O app **"El Protocolo del Vinagre"** é uma Progressive Web App (PWA) desenvolvida em **React 18, Vite, Tailwind CSS e PDF.js**, com backend serverless (Vercel Functions + Google Sheets API / Supabase). Trata-se de uma plataforma educacional e de acompanhamento de um infoproduto focado em saúde natural, limpeza pulmonar, regulação do metabolismo e desinflamação intestinal através de um **ciclo guiado de 21 dias**.

### O Perfil do Comprador (Avatar)
Analisando os depoimentos (`TESTIMONIALS`), lições e recursos visuais:
- **Faixa etária predominante:** Adultos maduros e idosos (50 a 75+ anos: Carmen 68, José 71, Roberto 73, etc.).
- **Dores e motivações:** Dificuldade respiratória, muco pulmonar, rigidez/dores articulares nas pernas e joelhos, metabolismo lento e busca por soluções naturais sem dependência excessiva de remédios químicos.
- **Nível de letramento digital:** Médio a baixo. Precisam de botões grandes, textos com contraste elevado, instruções claras, passos mastigados e nenhuma barreira técnica como senhas complexas ou leitores de PDF externos.
- **Diretrizes de Design Aplicadas:**
  - Fonte base de `18px` com tipografia elegante e acolhedora (`Playfair Display` para títulos e `Inter` para leitura longa).
  - Cores biofílicas e terapêuticas: Verde Sálvia (`--primary`), Âmbar Cálido (`--accent`) e variações suaves de pergaminho/creme (`--background` e `--card`).
  - Limite de largura de tela (`max-w-[430px]`), simulando a ergonomia perfeita de um aplicativo móvel mesmo em navegadores desktop.

---

## 2. A Primeira Experiência de Contato (Onboarding & Instalação)

### 2.1. Ponto de Entrada (Link Pós-Compra)
O comprador finaliza a compra (via Kiwify, Hotmart ou plataforma similar) e recebe no e-mail ou na página de agradecimento o link de acesso ao PWA.

### 2.2. Tela de Login Sem Fricção (`Login.jsx`)
Ao carregar a URL, o usuário se depara com uma tela acolhedora e confiável:
- **Identidade visual forte:** Ícone estilizado de pulmões em verde sálvia, título *"El Protocolo del Vinagre"* e subtítulo *"Programa natural de 21 días"*.
- **Sem senhas confusas:** O comprador não precisa cadastrar senha nem lembrar combinações. Ele apenas digita o **e-mail utilizado na compra**.
- **Autenticação e Verificação:**
  - O sistema consulta a API `/api/check-purchase`, que valida em tempo real se o e-mail consta com status `"Aprovado"` na planilha de vendas do Google Sheets (`db_vendas!A:M`).
  - *Nota técnica:* O código possui um mecanismo de cache de 7 dias no `localStorage` para que o comprador nunca precise fazer login novamente toda vez que abrir o app. No código atual, existe uma flag de conveniência (`VERIFICACION_COMPRA_ACTIVA = false`) permitindo testes imediatos com qualquer e-mail válido.
- **Microcópia de confiança:** *"Acceso exclusivo para compradores del programa"*, reforçando o valor do que foi adquirido.

### 2.3. A Jornada de Instalação PWA (`usePWAInstall.js`, `InstallModal.jsx`, `InstallBanner.jsx`)
Para que o usuário sinta que comprou um aplicativo de verdade (e não apenas um site simples), a experiência de instalação é conduzida em 3 camadas:
1. **Botão na Tela de Login:** Antes mesmo de logar, há o botão *"Instalar app en tu celular"*.
2. **Banner Inteligente no Topo da Aba Início:** Um card elegante *"Instala la App en tu Móvil (Gratis) - Acceso rápido con 1 toque en tu pantalla"*.
3. **Instalação Adaptada por Dispositivo:**
   - **No Android (Chrome/Edge):** Aciona o evento nativo `beforeinstallprompt` com instalação em 1 único clique.
   - **No iPhone (iOS / Safari):** A Apple não permite instalação com 1 clique. O app detecta o iOS e abre um modal passo a passo visual:
     - Passo 1: Tocar no botão **Compartilhar** (ícone do quadrado com seta para cima).
     - Passo 2: Rolar e selecionar **"Agregar a Inicio"**.
     - Passo 3: Tocar em **"Agregar"** no topo direito.
     - *Dica preventiva crucial incluída no modal:* Alerta em destaque para abrir no **Safari**, caso o comprador tenha aberto o link dentro do navegador interno do WhatsApp ou Instagram.

---

## 3. O que o Comprador Acessa: Mapa de Abas e Conteúdos

A interface é dividida em **5 abas inferiores ergonômicas**:

```
[ 🏠 Inicio ]  [ 📖 Protocolo ]  [ 🎁 Bonos ]  [ 📊 Progreso ]  [ 👤 Yo ]
```

Além disso, o cabeçalho fixo no topo sempre cumprimenta o usuário com empatia:
*"Buenos días / Buenas tardes, [Primeiro Nome]"* + tag *"Día X de 21"*, e avatar clicável que leva ao perfil.

---

### Aba 1: `Inicio` — O Motor do Hábito Diário ("Daily Bloom Engine")

Esta tela foi desenhada com uma mecânica psicológica brilhante chamada **Bloom (Florescimento)**, que evita sobrecarregar o usuário no primeiro momento:

#### Antes de Tomar o Vinagre (Estado Inicial do Dia):
- O comprador vê **apenas o Card Principal de Ação**:
  - Badge: *"Día 1 de 21"*.
  - Título em destaque: *"Toma tu preparación de vinagre ahora"*.
  - Instrução mastigada: *"🫙 2 cucharadas en 200 ml de agua tibia"*.
  - Botão de ação com animação contínua de pulso luminoso (`checkPulse`): **"Marcar como completado"**.
  - Dica sutil abaixo: *"8 bloques de contenido te esperan ⬇️"*.

#### O Momento do Clique (Gratificação Imediata):
Ao tocar em "Marcar como completado":
1. **Feedback Háptico:** O celular vibra em padrão triplo (`[50, 30, 80]ms`).
2. **Confetes:** Uma chuva de 22 confetes coloridos em tons da marca preenche a tela.
3. **O Card encolhe suavemente:** Muda para verde claro com a mensagem *"¡Ya hiciste lo más importante de hoy! 🌿"*.
4. **Bloom Gradual:** O restante da tela surge animado em cascata com 8 blocos de alto engajamento:
   - **Banner Comemorativo:** *"¡Día X listo! X días seguidos 🔥 — ¡sigue así!"*.
   - **Anel de Progresso Circular:** Mostra a porcentagem total cumprida do desafio de 21 dias (ex: 5%, 10%, 100%).
   - **Conselho do Dia (Rotativo):** Dicas práticas de saúde (hidratação com 8 copos, horário fixo, alho cru anti-inflamatório, caminhada suave de 15 min, sono sem telas, vitamina C do limão, etc.).
   - **Controle de Sintomas (Dias 3, 7 e 21):** Pergunta com termômetro emocional de 5 emojis (`😞 😕 😐 🙂 😄`) para registrar a evolução física e respiratória.
   - **Depoimento Real:** Prova social de pessoas comuns com a mesma faixa etária (ex: *"Al tercer día noté que respiraba mejor al subir escaleras"*).
   - **Fato Científico sobre o Vinagre:** Explicações acessíveis (ex: redução da glicose no sangue, ação antibacteriana histórica de Hipócrates, alívio de muco pulmonar).
   - **Atalho da Próxima Leção:** Direciona para o próximo conteúdo não lido.
   - **Descoberta do Protocolo Absorção Máxima:** Surge a partir do Dia 3 para introduzir o material avançado.
   - **Prévia de Amanhã:** *"🌅 Mañana: Día X de 21. Regresa a la misma hora de siempre."* criando o gatilho de retorno.

---

### Aba 2: `Protocolo` — As 5 Lições Estruturantes

Aqui fica o conhecimento fundamental do programa, apresentado em cards com numeração circular e status de conclusão:

1. **Lección 1:** *ACV para Protocolos de Pulmón* — Introdução para iniciantes, o que é "a mãe" do vinagre, por que precisa ser cru e orgânico, receita de 2 colheres em 200ml de água morna com mel/caiena opcionais e alerta para nunca tomar puro.
2. **Lección 2:** *Cuándo Tomar tu Protocolo* — O melhor momento (manhã em jejum ou à noite antes de deitar) e intervalo para escovação dentária.
3. **Lección 3:** *Guía para Resultados Más Rápidos* — Alimentos que potencializam (alho, azeite, limão, folhas verdes, frutas vermelhas), hidratação e caminhadas.
4. **Lección 4:** *Programa de Limpieza con Vinagre* — Os 5 erros clássicos a evitar (tomar sem diluir, dobrar a dose, inconsistência, imediatismo e interações medicamentosas).
5. **Lección 5 (Nova):** *La Hora del Intestino* — O eixo intestino-pulmão e o momento ideal de absorção celular.

---

### Aba 3: `Bonos` — Overdelivery e Percepção de Valor Extremo

A aba de bônus é organizada em 3 grandes ecossistemas de valor:

#### 1. 🧪 Protocolo Absorción Máxima (Card Teal Premium)
- **Protocolos Inclusos:**
  - *El Protocolo de los 7 Días* (Guia núcleo passo a passo).
  - *Mapa de Bactericidas* (Alimentos que amplificam o efeito do vinagre).
  - *Test de la Microbiota* (Guia de autoavaliação intestinal).
- **Bônus Especiais:**
  - *Código Articular* (Eixo intestino-articulações para recuperar flexibilidade).
  - *Truco de la Mente Despierta* (Restauração do "segundo cérebro").
  - **🔐 El Día Cero (Bono Secreto Exclusivo):** Um card escuro com detalhes dourados. Ao clicar, o app exibe uma tela preta misteriosa com texto solene: *"Lo que estás a punto de ver fue lo más difícil de incluir aquí. Este material no se comparte públicamente..."* e um botão para revelar o guia.

#### 2. 🔥 Ritual Activador Ácido (Card Âmbar Colapsável)
Um acordeão expansível com 7 materiais completos:
- *El Shot Activador* (Ritual matinal de 60 segundos).
- *Mapa de Alimentos* (Guia anti-inflamatório respiratório).
- *La Ventana de 20 Min* (Timing metabólico exato).
- *Termómetro de Inflamación* (Guia de autoavaliação).
- *Bônus do Ritual:* Articulações sem dor, Áudio guiado de respiração regenerativa e o Segredo do Dia 4.

#### 3. 🌿 Bonos Clássicos do Protocolo
- *Bono 1:* Ritual Noturno para Dormir Melhor e Apoiar os Pulmões (chás, lavanda, técnica de respiração 4-7-8).
- *Bono 2:* Movimente-se Mais e Reduza a Rigidez Sem Remédios (compressas de vinagre e exercícios articulares).
- *Bono 3:* Metabolismo aos 50 Anos (Rejuvenescimento e queima de gordura natural).

---

### Aba 4: `Progreso` — Gamificação e Conquistas

Focada em manter a disciplina e comemorar pequenas vitórias:
- **Card de Chamas (Streak):** Contador de dias seguidos cumpridos.
- **Calendário dos 21 Dias:** Grade 7x3 onde cada dia concluído ganha um checkmark verde.
- **Insígnias Desbloqueáveis:**
  - 🌱 *Primer Paso* (Completou o dia 1)
  - ⭐ *Primera Semana* (7 dias consecutivos)
  - 🏅 *Mitad del Camino* (10 dias cumpridos)
  - 🏆 *Protocolo Completo* (21 dias finalizados)
- **Histórico dos Controles de Sintomas:** Exibe o score de emojis registrado nos marcos dos dias 3, 7 e 21.

---

### Aba 5: `Yo` (Perfil) — Suporte Humano, Retenção e Esteira de Vendas (Backend)

Esta aba transforma o app em um canal de relacionamento contínuo e monetização futura:

1. **Card de Identidade e Progresso:** Resumo de dias restantes para finalizar o programa.
2. **Linha do Tempo (Marcos):** Checklist comemorativo (Dia 1, Dia 3 primeiros efeitos, Dia 7 primeira semana, Dia 10 metade do caminho, Dia 21 vitória).
3. **Área "Estamos Contigo" (Suporte Humanizado):**
   - E-mail direto de suporte (`soporte@protocolodelvinagre.com`).
   - Botão para WhatsApp.
   - Avatares com fotos dos membros da equipe e promessa: *"Respondemos en menos de 24 horas"*.
4. **Área "Solo para Ti" (Esteira de Produtos / Upsell):**
   - **Protocolo Intensivo 60 Días:** Bloqueado com cadeado. Só destrava após completar os 21 dias (gatilho de consistência que abre porta para venda de ticket maior).
   - **Protocolo Absorción Máxima:** Atalho para o material já desbloqueado.
   - **Consulta Grupal con el Especialista (Dr. Méndez):** Selo "Próximamente" para sessões ao vivo.
5. **Preferências e Acessibilidade:** Botão para ativar/desativar a vibração do aparelho ao concluir ações.
6. **Central de Ajuda:** FAQ, tutorial passo a passo para iPhone e Android, Termos e Privacidade.
7. **Botão de Encerrar Sessão:** Com diálogo de confirmação protetor garantindo que os dados não serão perdidos.

---

## 4. Como o Comprador Interage: A Experiência de Leitura sem Atrito

Um dos pontos mais críticos em infoprodutos para esse perfil de público é o consumo de arquivos PDF. Em sites comuns, o usuário baixa o arquivo, não sabe onde foi parar no celular ou precisa de um app de terceiros.

No **Protocolo del Vinagre**, a experiência é 100% nativa através do componente `PDFCanvasViewer.jsx`:
- **Renderização Direta:** O PDF renderiza dentro do próprio aplicativo usando a biblioteca `pdfjs-dist` desenhando em telas `<canvas>`.
- **Controles Intuitivos:**
  - Indicador de total de páginas.
  - Botões de zoom (`-` e `+`) com porcentagem visível.
  - Botão para abrir em aba externa ou baixar caso o usuário queira imprimir.
  - Tela especial para o material secreto ("El Día Cero") que exige clique consciente para revelar o conteúdo.
- **Conclusão:** Barra inferior fixa com o botão verde **"Marcar como completado"**, fechando o visualizador, disparando confetes e marcando o progresso da lição ou bônus.

---

## 5. Resumo da Jornada Mental do Comprador

| Fase | Sentimento do Comprador | Recurso no App que Atende |
|---|---|---|
| **Chegada** | Insegurança / Expectativa | Login limpo com e-mail, sem senhas complicadas, visual profissional. |
| **Instalação** | Sensação de ter um app "de verdade" | Banners e tutoriais passo a passo específicos para iPhone e Android. |
| **Dia 1** | Motivação inicial | Foco apenas no copo de vinagre. Nenhuma sobrecarga de informação inicial. |
| **Pós-Toma** | Recompensa e curiosidade | Confetes, vibração no celular e o florescimento dinâmico de novos blocos. |
| **Dias 3 a 7** | Primeiros resultados e dúvidas | Testes de autoavaliação com emojis, conselhos do dia e depoimentos de incentivo. |
| **Consumo** | Praticidade | Leitor de PDFs embutido sem sair do app, com zoom e marcação de lido. |
| **Dias 10 a 21** | Vitória do hábito | Conquistas desbloqueadas, fogo de sequência diária e oferta do protocolo avançado. |

---

## 6. Oportunidades e Diagnósticos Técnicos para a Operação

1. **Ativação da Proteção de Compra:** O arquivo `Login.jsx` está com `VERIFICACION_COMPRA_ACTIVA = false`. Para entrar em produção e restringir o app apenas a compradores reais, basta alterar a flag para `true` e configurar as credenciais do Google Service Account na Vercel.
2. **Links de Atendimento:** O link do WhatsApp no `Usuario.jsx` está com número placeholder (`https://wa.me/5511999999999`). Inserir o WhatsApp real do suporte comercial/atendimento.
3. **Persistência de Dados:** O progresso do usuário é atualmente salvo por e-mail no `localStorage` do navegador do dispositivo. Para uma experiência cross-device (começar no computador e continuar no celular com o mesmo progresso), uma tabela no Supabase sincronizando o objeto de progresso é o próximo passo natural.
