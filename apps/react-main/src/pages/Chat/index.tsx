import { useState } from 'react';
import { chat } from '@/server';

interface Message {
  role: 'user' | 'system';
  content: string;
}
export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  async function handleClick() {
    if (!inputValue.trim()) {
      return;
    }
    setLoading(true);
    const response = await chat(inputValue);
    if (!response.body) {
      console.error('Response body is null or undefined');
      setLoading(false);
      return;
    }
    const userMessage: Message = { role: 'user', content: inputValue };

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';
    const systemMessage: Message = { role: 'system', content: '' };
    setMessages((state: Message[]) => [...state, userMessage, systemMessage]);
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value, { stream: true });

      const lines: string[] = buffer.split('\n\n').filter((line) => line.trim() !== '');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.replace('data: ', '');
          const json = JSON.parse(data);
          if (json.content) {
            systemMessage.content += json.content
              .replace(/\\n/g, '<br />')
              .replace(/\\r/g, '<br />')
              .replace(/\\/g, '');
            setMessages((currentMessages: Message[]) => {
              currentMessages[currentMessages.length - 1] = systemMessage;
              return [...currentMessages];
            });
          }
        }
      }
      buffer = '';
    }
    setLoading(false);
    setInputValue('');
  }
  return (
    <div className="w-[900px] mt-[100px] mx-auto border-solid border-cyan-100 border-[1px] p-4">
      <div className="h-[500px] overflow-y-auto">
        {messages.map((msg: Message, index: number) => {
          return (
            <div key={index} className="mt-4">
              <div className={msg.role === 'user' ? 'text-[14px]' : 'text-[14px] text-red-300'}>
                <div dangerouslySetInnerHTML={{ __html: msg.content }}></div>
              </div>
            </div>
          );
        })}
        {loading ? <div className="text-red-400">AI 正在思考...</div> : null}
      </div>
      <div className="flex gap-2">
        <input
          disabled={loading}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
          className="w-full border-solid border-cyan-100 border-[1px] focus:outline-none h-8"
        />
        <button disabled={loading} onClick={handleClick} className="w-[50px]">
          发送
        </button>
      </div>
    </div>
  );
}
