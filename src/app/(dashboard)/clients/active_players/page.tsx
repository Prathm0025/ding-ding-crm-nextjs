"use client";

import { useAppSelector } from "@/utils/hooks";
import { formatDate } from "@/utils/common";
import { useState, useEffect } from "react";

export default function ActiveUsers() {
  const activeUsers = useAppSelector((state) => state.activeUsers.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  const selectedUser = selectedUserId ? activeUsers[selectedUserId] : null;

  const filteredUsers = Object.entries(activeUsers).filter(([playerId]) =>
    playerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedUser?.currentGame?.entryTime) {
      const entryTime = new Date(selectedUser.currentGame.entryTime).getTime();
      const updateSessionDuration = () => {
        const currentTime = new Date().getTime();
        setSessionDuration(Math.floor((currentTime - entryTime) / 1000));
      };
      const intervalId = setInterval(updateSessionDuration, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedUser]);

  const closeModal = () => {
    setSelectedUserId(null);
    setSessionDuration(0);
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-700 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white">Active Players</h2>
          <div className="mt-4 relative">
            <input
              type="search"
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="p-6">
          {filteredUsers.length > 0 ? (
            <ul className="space-y-4">
              {filteredUsers.map(([playerId, playerData]) => (
                <li
                  key={playerId}
                  className="bg-gray-700 rounded-lg p-4 shadow-sm cursor-pointer"
                  onClick={() => setSelectedUserId(playerId)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">
                      {playerId}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        playerData.currentGame?.gameId
                          ? "bg-green-800 text-green-200"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {playerData.currentGame?.gameId || "No Active Game"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Credits: {playerData.currentCredits}
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Entry Time:{" "}
                    {formatDate(playerData.entryTime?.toISOString() || null)}
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

      {/* Modal for Game Details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-white mb-4">
              {selectedUser.playerId}'s Game Details
            </h3>
            {selectedUser.currentGame ? (
              <div>
                <p className="text-gray-400 mb-2">
                  <strong>Game ID:</strong> {selectedUser.currentGame.gameId}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Credits at Entry:</strong>{" "}
                  {selectedUser.currentGame.creditsAtEntry}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Total Spins:</strong>{" "}
                  {selectedUser.currentGame.totalSpins}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Total Bet Amount:</strong>{" "}
                  {selectedUser.currentGame.totalBetAmount}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Total Win Amount:</strong>{" "}
                  {selectedUser.currentGame.totalWinAmount}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Session Duration:</strong> {sessionDuration} seconds
                </p>
                <div className="mt-4 text-gray-400">
                  <strong>Spin Data:</strong>
                  {/* Scrollable container for spin data */}
                  <ul className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {selectedUser.currentGame.spinData &&
                      selectedUser.currentGame.spinData.map((spin, index) => (
                        <li key={index} className="bg-gray-900 p-2 rounded-md">
                          Bet: {spin.betAmount}, Win: {spin.winAmount}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No active game details available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
