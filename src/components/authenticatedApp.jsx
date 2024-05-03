import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Chat from "./chat";

// AuthenticatedApp component
function AuthenticatedApp() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-w-xl text-white h-dvh min-h-dvh overflow-auto w-full flex flex-col">
      {isAuthenticated ? (
        <>
          <div className="h-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-10 w-10 rounded-full m-5"
                />
                <div className="m-3">
                  <h2>{user.name}</h2>
                  <p className="text-slate-500">{user.email}</p>
                </div>
              </div>
              <button
                className="bg-red-600 p-1 m-5 rounded-md"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            </div>
            <div className="flex justify-center items-center h-[80dvh] min-w-full">
              <Chat />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <p className="text-9xl sm:text-9xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
              FLUX
            </p>
            <p className="text-2xl sm:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
              The Next Gen Chat Application
            </p>
            <button
              className="bg-gradient-to-b from-neutral-200 to-neutral-500 hover:bg-gradient-to-b hover:from-neutral-500 hover:to-neutral-200  text-black  rounded-lg p-2"
              onClick={() => loginWithRedirect()}
            >
              Get Started
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthenticatedApp;
