import React from "react";
import ChatClient from "./ChatClient"; // ChatClient 컴포넌트를 import

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Chat Application</p>
      </header>
      <ChatClient /> {/* ChatClient 컴포넌트를 사용 */}
    </div>
  );
}

export default App;
