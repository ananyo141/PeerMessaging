"use client";

import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@src/state";

interface PeerData {
  timestamp: number;
  message: string;
  username: string;
}

type Props = {};

const Connect = (props: Props) => {
  const statePeerId = useAppSelector((state) => state.user.userId);
  const [peerId, setPeerId] = useState<string>("");

  const [inputId, setInputId] = useState("");
  const [messages, setMessages] = useState<PeerData[]>([]);
  const [message, setMessage] = useState<string>();

  const [peer, setPeer] = useState<any>();
  const [connection, setConnection] = useState<any>();

  useEffect(() => {
    const asyncCallback = async () => {
      setPeerId(statePeerId ?? Math.random().toString(36).substring(2, 15));
      const Peer = (await import("peerjs")).default;
      const newPeer = new Peer(peerId);
      setPeer(newPeer);
      newPeer.on("open", (id) => {
        console.log("Peer ID:", peerId);
      });
      newPeer.on("connection", (conn) => {
        conn.on("data", (data) => {
          setMessages((messages) => [...messages, data] as PeerData[]);
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
          const conn = peer?.connect(inputId);
          setConnection(conn);
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
          connection.send({
            timestamp: Date.now(),
            username: "username",
            message: message,
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
};

export default Connect;
