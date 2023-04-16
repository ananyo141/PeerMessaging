"use client";

import React, { useState } from "react";
import { Link } from "@chakra-ui/next-js";

import { useAppSelector, useAppDispatch, userActions } from "@src/state";
import { generateRandomAvatarOptions } from "@src/utils/randomAvatars";

export default function App() {
  const { userId } = useAppSelector((state) => state.user);
  const [userIdInput, setUserIdInput] = useState(userId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setUserIdInput(userId);
    dispatch(userActions.setAvatarOptions(generateRandomAvatarOptions()));
  }, [userId]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="container flex flex-col items-center">
        <div className="hero-content lg:gap-20 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Start now!</h1>
            <p className="py-6 max-w-md">
              Connect with friends securely & efficiently. Say goodbye to
              traditional messaging with our peer to peer chat app.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User ID</span>
                </label>
                <input
                  type="text"
                  placeholder="userid"
                  value={userIdInput ?? ""}
                  onChange={(e) => {
                    setUserIdInput(e.target.value);
                  }}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <Link
                  href={{ pathname: "/connect" }}
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(userActions.setUserId(userIdInput ?? ""));
                  }}
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
