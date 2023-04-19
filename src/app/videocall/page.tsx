"use client";

// TODO: Clean up the 'any' fest

import { useEffect, useRef, useCallback, useState } from "react";

import { useAppSelector } from "@src/state";
import generatePeerId from "@src/utils/generatePeerId";

function VideoCall() {
  const statePeerId = useAppSelector((state) => state.user.userId);
  const [peerId, setPeerId] = useState<string>(statePeerId ?? "");

  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef<any>(null);
  const currentUserVideoRef = useRef<any>(null);
  const peerInstance = useRef<any>(null);

  const generateUserMedia = useCallback(() => {
    return (
      (navigator as any).getusermedia ||
      (navigator as any).webkitgetusermedia ||
      (navigator as any).mozgetusermedia
    );
  }, []);

  useEffect(() => {
    const asyncCallback = async () => {
      const Peer = (await import("peerjs")).default;
      const genPeerId = generatePeerId(peerId);
      const peer = new Peer(genPeerId);

      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        const getUserMedia =
          (navigator as any).getUserMedia ||
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream: any) => {
          if (!currentUserVideoRef.current) return;
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });

      peerInstance.current = peer;
    };
    asyncCallback();
  }, []);

  const call = (remotePeerId: any) => {
    const getUserMedia =
      (navigator as any).getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream: any) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream: any) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-light">User ID: {peerId}</h1>
      <input
        type="text"
        className="rounded-md p-2 bg-gray-200 glass focus:outline-none"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video
          ref={currentUserVideoRef}
        />
      </div>
      <div>
        <video className="w-1/2 h-1/2" ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default VideoCall;
