"use client";

import React, { useContext, useEffect, useState } from "react";
import { BackgroundContext } from "../context/BackgroundContext";

export default function Statement() {
const { statements, statementLoading } = useContext(BackgroundContext);

  return (
    <div className=" w-full bg-[#050a2c] text-white p-4 md:p-6">
      
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Transaction Statements
      </h1>

      <div className="bg-[#0b1035] rounded-2xl border border-white/10 overflow-hidden">
        
        {statementLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <>
            {/* ✅ Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#090e30] text-gray-400 text-sm">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {statements.map((item, index) => {
                    const isCredit = item.win_amount;

                    return (
                      <tr
                        key={index}
                        className="border-t border-white/5 hover:bg-[#090e30]"
                      >
                        <td className="p-4 text-sm text-gray-400">
                          {item.created_at}
                        </td>

                        <td className="p-4 text-sm">
                          {item.debit_statement ||
                            item.credit_statement}
                        </td>

                        <td
                          className={`p-4 text-right font-semibold ${
                            isCredit
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {isCredit
                            ? `+₹${item.win_amount}`
                            : `-₹${item.bet_amount}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Cards */}
            <div className="md:hidden space-y-3 p-3">
              {statements.map((item, index) => {
                const isCredit = item.win_amount;

                return (
                  <div
                    key={index}
                    className="bg-[#090e30] p-4 rounded-xl border border-white/5"
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {item.created_at}
                    </p>

                    <p className="text-sm mb-2">
                      {item.debit_statement ||
                        item.credit_statement}
                    </p>

                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isCredit
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {isCredit ? "Credit" : "Debit"}
                      </span>

                      <span
                        className={`font-semibold ${
                          isCredit
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {isCredit
                          ? `+₹${item.win_amount}`
                          : `-₹${item.bet_amount}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}