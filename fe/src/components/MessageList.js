export function MessageList({ messages }) {
  return (
    <div>
      {messages.map((m, index) => (
        <p key={index}>{m.message}</p>
      ))}
    </div>
  );
}
