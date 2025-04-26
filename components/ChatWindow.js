import { useState, useRef, useEffect } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🐆 Bem-vindo ao FURIA Chat! Pergunte sobre a equipe, agenda, história, curiosidades, etc." }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(msgs => [...msgs, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: "bot", text: "Erro ao conectar ao bot." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-furia-black">
      {/* Área de próximos jogos/notícias rápidas */}
      <div className="w-full max-w-lg bg-furia-yellow text-furia-black p-4 rounded-mac mb-4 shadow-lg animate-fadeIn">
        <strong>Próximo jogo:</strong> FURIA vs G2 — 28/04 18h | <span className="italic">ESL Pro League</span>
      </div>
      {/* Janela de Chat */}
      <div className="flex flex-col w-full max-w-lg bg-furia-black border border-furia-yellow rounded-mac shadow-2xl animate-slideUp">
        <div ref={chatRef} className="flex-1 h-96 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-mac ${msg.sender === "user"
                ? "bg-furia-yellow text-furia-black self-end" 
                : "bg-gray-800 text-furia-white self-start"} 
                shadow transition-all duration-200`}>
                <span className="font-bold">{msg.sender === "user" ? "Você" : "FURIA Bot"}: </span>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="my-2 flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-mac bg-gray-800 text-furia-white self-start shadow">
                <span className="font-bold">FURIA Bot: </span>
                Digitando...
              </div>
            </div>
          )}
        </div>
        {/* Campo de mensagem */}
        <div className="flex items-center border-t border-furia-yellow p-2 bg-furia-black rounded-b-mac">
          <input
            className="flex-1 p-3 rounded-mac bg-gray-900 text-furia-white focus:outline-none mr-2 transition-all"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Pergunte algo sobre a FURIA..."
            disabled={loading}
          />
          <button
            className="bg-furia-yellow text-furia-black font-bold px-6 py-2 rounded-mac shadow transition-all hover:scale-105 hover:bg-yellow-400"
            onClick={sendMessage}
            disabled={loading}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
