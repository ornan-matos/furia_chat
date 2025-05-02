# 🐆 FURIA Chatbot – Web Chat Interativo para Fãs de CS:GO

Este projeto é um **chatbot interativo web** criado com **Next.js** para fãs da equipe de CS:GO da **FURIA**.  
Ele permite que fãs acompanhem notícias, jogos, curiosidades e interajam com o bot treinado via **API Grok-3-mini (X.AI)**.

## 🚀 Funcionalidades

### 💬 Chatbot Interativo
- Interface inspirada no WhatsApp/Discord.
- Estilo visual com **cores e ícones da FURIA**.
- Mensagens com animação fluida.
- Campo de digitação + botão de envio.
- Integração com **API Grok (X.AI)** para respostas automáticas.

### 🕹️ Informações de Jogos
- Consome a API do [HLTV](https://hltv-api.vercel.app/) para exibir:
  - ✅ **Próxima partida da FURIA Academy**.
  - 🕗 Atualização automática com horário e adversário.

### 📰 Feed de Notícias
- Exibe o **feed oficial do X (antigo Twitter)** da FURIA:
  - Visualização direta via embed.
  - Logo do X e estilo personalizado (fundo cinza claro e borda dourada).
  - Botão para seguir a equipe.
  - Em breve: link para Instagram oficial.

### 🎨 Interface Moderna
- Layout responsivo com **Tailwind CSS**.
- Estilo “macOS-like” com botões arredondados e sombras suaves.
- Logo da FURIA no topo central da página.
- Componentes bem organizados em pastas separadas.

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta      | Finalidade                           |
|------------------|---------------------------------------|
| [Next.js](https://nextjs.org/)       | Framework React com suporte SSR |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização responsiva |
| [OpenAI SDK](https://www.npmjs.com/package/openai)       | Acesso à API do Grok/X.AI |
| [HLTV API](https://hltv-api.vercel.app/)  | Dados sobre partidas de CS:GO |
| [X.com (Twitter)](https://x.com/furia) | Feed oficial da equipe |

---

## 🧪 Como Executar Localmente

### Pré-requisitos
- Node.js v18+ instalado
- Navegador moderno
- Clonar este repositório

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/furia-chatbot.git
cd furia-chatbot

# 2. Instalar dependências
npm install

# 3. Criar arquivo de variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local e adicione sua chave GROK:
# GROK_API_KEY=sk-...

# 4. Rodar o servidor de desenvolvimento
npm run dev
```
Claro! Aqui está o trecho ajustado para o formato correto em **Markdown**:


### 🌐 Acessar

Abra o navegador em:  
[http://localhost:3000](http://localhost:3000)

---

### 📦 Deploy na Vercel

Este projeto pode ser implantado automaticamente via [Vercel](https://vercel.com/):

1. Faça login na Vercel com sua conta GitHub.
2. Importe este repositório.
3. Defina as variáveis de ambiente (`GROK_API_KEY`).
4. Clique em **"Deploy"**.

---

### 📁 Estrutura de Pastas

```

furia-chatbot/
│
├── components/
│   ├── ChatWindow\.js
│   ├── NextMatch.js
│   ├── NewsFeed.js
│   └── ...
│
├── pages/
│   └── index.js
│   └── api/
│       └── chat.js
│
├── public/
│   └── logo-furia.png
│   └── x-logo.png
│
├── styles/
│   └── globals.css
│
├── .env.local.example
├── package.json
├── tailwind.config.js
└── README.md

```

---

### 🤝 Contribuindo

Contribuições são bem-vindas!  
Sugestões de melhoria, novos recursos e correções de bugs são muito apreciadas.

---

### 📄 Licença

- Este projeto está sob a licença **MIT**.
- Este projeto é apenas para fins educacionais e demonstração técnica. Não está afiliado oficialmente à equipe FURIA.
---

##### ✍️ Autor

Desenvolvido por Ornan Matos, 2025.