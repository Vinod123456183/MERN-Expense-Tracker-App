import React from "react";

// Sample Data for Recent Transactions
const transactions = [
  {
    name: "John Doe",
    date: "2025-05-10",
    amount: "$200.00",
  },
  {
    name: "Jane Smith",
    date: "2025-05-09",
    amount: "$450.50",
  },
  {
    name: "Samuel Green",
    date: "2025-05-08",
    amount: "$35.75",
  },
  {
    name: "Martha Lewis",
    date: "2025-05-07",
    amount: "$120.00",
  },
  {
    name: "John Doe",
    date: "2025-05-10",
    amount: "$200.00",
  },
  {
    name: "Jane Smith",
    date: "2025-05-09",
    amount: "$450.50",
  },
  {
    name: "Samuel Green",
    date: "2025-05-08",
    amount: "$35.75",
  },
  {
    name: "Martha Lewis",
    date: "2025-05-07",
    amount: "$120.00",
  },
  {
    name: "Martha Lewis",
    date: "2025-05-07",
    amount: "$120.00",
  },
  {
    name: "Martha Lewis",
    date: "2025-05-07",
    amount: "$120.00",
  },

  {
    name: "Martha Lewis",
    date: "2025-05-07",
    amount: "$120.00",
  },
];

function RecentTransitions() {
  return (
    <div className="w-full  mx-auto p-4 border rounded-lg text-gray-600">
      <h2 className="text-lg font-semibold mb-4 ">Recent Transactions</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="">
              <td className="px-4 py-2"> \''/</td>
              <td className="px-4 py-2">{transaction.name}</td>
              <td className="px-4 py-2">{transaction.date}</td>
              <td className="px-4 py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransitions;
