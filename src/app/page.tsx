"use client";

import { useEffect, useState } from "react";
import Peer, { DataConnection } from "peerjs";

interface PeerData {
  timestamp: number;
  message: string;
  username: string;
}

function App() {
  const [peerId, setPeerId] = useState("");
  const [inputId, setInputId] = useState("");
  const [messages, setMessages] = useState<PeerData[]>([]);
  const [message, setMessage] = useState<string>();

  const [peer, setPeer] = useState<Peer>();
  const [connection, setConnection] = useState<DataConnection>();

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);
    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("Peer ID:", peerId);
    });
    newPeer.on("connection", (conn) => {
      // setConnection(conn);
      conn.on("data", (data) => {
        setMessages((messages) => [...messages, data] as PeerData[]);
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>Peer ID: {peerId}</h1>
      <h2>Messages</h2>
      <input
        type="text"
        onChange={(e) => {
          setInputId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const conn = peer?.connect(inputId);
          setConnection(conn);

          console.log("hit connect", connection);
        }}
      >
        Connect
      </button>
      <textarea
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(connection);
          if (!connection) return;
          connection.send({
            timestamp: Date.now(),
            username: "username",
            message: message,
          });
          connection.on("data", (data) => {
            console.log(data);
          });
        }}
      >
        Send
      </button>

      <ul>
        {messages.map((message, i) => (
          <li key={i}>
            [{new Date(message.timestamp).toString()}] {message.username}:{" "}
            {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
