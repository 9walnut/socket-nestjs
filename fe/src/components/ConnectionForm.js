import "../styles/css/ConnectionForm.css";

export function ConnectionForm({ connectSocket, setNickname, nickname }) {
  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 막기
    if (nickname) {
      connectSocket(); // 닉네임이 있으면 소켓 연결
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* 폼 태그에 이벤트 핸들러 연결 */}
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        autoFocus
      />
      <button type="submit">Connect</button> {/* 버튼 타입을 submit으로 설정 */}
    </form>
  );
}
