export function RoomList({ rooms, setRoom, createRoom, joinRoom, room }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      {rooms.map((r) => (
        <div key={r.id}>{r.roomName}</div>
      ))}
    </div>
  );
}
