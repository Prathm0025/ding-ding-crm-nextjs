"use client";

import { useState } from "react";
import { useAppSelector } from "@/utils/hooks";

export default function ActiveUsers() {
  const activeUsers = useAppSelector((state) => state.activeUsers.users);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(activeUsers);

  const filteredUsers = Object.entries(activeUsers).filter(([username]) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-700 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Active Users
          </h2>
          <div className="mt-4 relative">
            <input
              type="search"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute left-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="p-6">
          {filteredUsers.length > 0 ? (
            <ul className="space-y-4">
              {filteredUsers.map(([username, playerData]) => (
                <li
                  key={username}
                  className="bg-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">
                      {username}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        playerData.activeGame
                          ? "bg-green-800 text-green-200"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {playerData.activeGame || "No Active Game"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Credits: {playerData.credits}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No active users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
