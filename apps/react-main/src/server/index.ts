export function chat(inputValue: string) {
  return fetch('http://localhost:3333/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: inputValue }),
  });
}
