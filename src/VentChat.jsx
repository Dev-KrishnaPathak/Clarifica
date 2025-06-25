import React, { useState, useRef } from 'react';

function VentChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);
  const lastLength = useRef(0);

  const startWebSocket = (userInput) => {
    wsRef.current = new WebSocket('wss://clarifica-production.up.railway.app/ws/chat');
    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({
        user_message: userInput,
        chat_type: 'vent'
      }));
    };
    wsRef.current.onclose = () => {
      setLoading(false);
      lastLength.current = 0;
    };
    wsRef.current.onerror = () => {
      setMessages(msgs => [...msgs, { from: 'ai', text: 'WebSocket error.' }]);
      setLoading(false);
      lastLength.current = 0;
    };
    wsRef.current.onmessage = (event) => {
      if (event.data === '[END]') {
        setLoading(false);
        wsRef.current.close();
        lastLength.current = 0;
        return;
      }
      setMessages(msgs => {
        let updated = [...msgs];
        if (updated.length && updated[updated.length - 1].from === 'ai') {
          const newText = event.data.substring(lastLength.current);
          updated[updated.length - 1].text += newText;
          lastLength.current = event.data.length;
          return updated;
        } else {
          lastLength.current = event.data.length;
          return [...msgs, { from: 'ai', text: event.data }];
        }
      });
    };
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    startWebSocket(input);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <h2>Venting Space (Riley)</h2>
      <div style={{ minHeight: 200, marginBottom: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{ background: msg.from === 'user' ? '#e3f2fd' : '#eafaf1', padding: '8px 14px', borderRadius: 8, display: 'inline-block' }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>Riley is listening...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' ? sendMessage() : null} style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }} placeholder="Type your message..." />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none' }}>Send</button>
      </div>
    </div>
  );
}

export default VentChat; 