"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";

import { useAppSelector } from "@src/state";
import ChatBubble from "@src/components/ChatBubble";
import ErrorAlert from "@src/components/ErrorAlert";
import ChatInput from "@src/components/ChatInput";

interface MessageData {
  timestamp: number;
  content: string;
  username: string;
}

type Props = {};

const Connect = (props: Props) => {
  const statePeerId = useAppSelector((state) => state.user.userId);
  const [peerId, setPeerId] = useState<string>(statePeerId ?? "");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inputId, setInputId] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState<string>();

  const peer = useRef<any>();
  const connection = useRef<any>();

  const sendHandler = useCallback(() => {
    if (!connection.current) {
      setErrorMessage("Please connect to a peer first");
      return;
    }
    const data = {
      timestamp: Date.now(),
      username: peerId,
      content: message,
    };
    connection.current.send(data);

    setMessages((messages) => [...messages, data] as MessageData[]);
  }, [connection, message, peerId]);

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
    <div className="bg-gray-400 min-h-screen flex flex-col justify-center">
      <div className="xl:w-3/4 w-full lg:w-5/6 max-w-5xl shadow-xl lg:rounded-xl p-4 bg-gray-200 mx-auto">
        {errorMessage && (
          <ErrorAlert
            className="mb-4"
            message={errorMessage}
            onClick={() => setErrorMessage(null)}
          />
        )}
        <div className="w-full flex gap-4 justify-between flex-col items-center md:flex-row">
          <h1 className="text-2xl font-light">User ID: {peerId}</h1>

          <div>
            <input
              type="text"
              className="rounded-md p-2 bg-gray-200 glass focus:outline-none"
              onChange={(e) => {
                setInputId(e.target.value);
              }}
            />
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const conn = peer.current.connect(inputId);
                connection.current = conn;
              }}
            >
              Connect
            </button>
          </div>
        </div>
        <div className="h-[80vh] overflow-y-auto overflow-x-hidden">
          {messages.map((message, i) => {
            const date = new Date(message.timestamp);
            const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
            const day = date.getDate();
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;

            return (
              <ChatBubble
                key={`chatmessage-${i}`}
                sender={message.username}
                message={message.content}
                self={message.username === peerId}
                time={formattedDate}
              />
            );
          })}
        </div>
        <div>
          <ChatInput
            onSend={sendHandler}
            inputValue={message ?? ""}
            onInputChange={(e: any) => {
              setMessage(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Connect;
