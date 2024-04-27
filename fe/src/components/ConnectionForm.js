import "../styles/css/ConnectionForm.css";

export function ConnectionForm({ connectSocket, setNickname, nickname }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={connectSocket}>Connect</button>
    </div>
  );
}
