"use client";

import { useCallback, useRef, useEffect, useState } from "react";

import { useAppSelector } from "@src/state";

interface MessageData {
  timestamp: number;
  content: string;
  username: string;
}

type Props = {};

const Connect = (props: Props) => {
  const statePeerId = useAppSelector((state) => state.user.userId);
  const [peerId, setPeerId] = useState<string>(statePeerId ?? "");

  const [inputId, setInputId] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState<string>();

  const peer = useRef<any>();
  const connection = useRef<any>();

  const generatePeerId = useCallback((id: null | string) => {
    if (id && id !== "") return id;
    return Math.random().toString(36).substring(2, 15);
  }, []);

  useEffect(() => {
    const asyncCallback = async () => {
      const Peer = (await import("peerjs")).default;
      const newPeerId = generatePeerId(statePeerId);
      setPeerId(newPeerId);
      const newPeer = new Peer(newPeerId);
      peer.current = newPeer;
      newPeer.on("open", (id) => {
        setPeerId(id);
        console.log("Peer ID:", peerId);
      });
      newPeer.on("connection", (conn) => {
        conn.on("data", (data) => {
          setMessages((messages) => [...messages, data] as MessageData[]);
        });
      });
    };
    asyncCallback();
  }, [statePeerId]);

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
          const conn = peer.current.connect(inputId);
          connection.current = conn;
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
          if (!connection) return;
          connection.current.send({
            timestamp: Date.now(),
            username: peerId,
            content: message,
          });
        }}
      >
        Send
      </button>

      <ul>
        {messages.map((message, i) => (
          <li key={i}>
            [{new Date(message.timestamp).toString()}] {message.username}:{" "}
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connect;
