import React from "react";
import { useState, useEffect, useReducer } from "react";
import Navigation from "./Navigation";
import { payInApi, chargeOffApi, getUserApi } from "./api";

const getDate = () => {
  const date = new Date();
  const locale = date.toLocaleString("de-DE");
  return locale;
};

const handleTransactions = (state, action) => {
  const reverseTransactions = [...state.transactions].reverse();
  switch (action.type) {
    case "getData":
      return {
        amount: action.payload.balance,
        transactions: action.payload.transactions,
      };
    case "updateAmount":
      return {
        amount: action.payload.balance,
        transactions: [
          ...reverseTransactions,
          {
            transaction: action.payload.transaction,
            value: action.payload.amount,
            date: getDate(),
          },
        ].reverse(),
      };
    case "payIn":
      if (action.payload === "" || isNaN(action.payload)) return state;
      return {
        amount: +state.amount + +action.payload,
        transactions: [
          ...reverseTransactions,
          { transaction: "Einzahlung", value: action.payload, date: getDate() },
        ].reverse(),
      };
    case "chargeOff":
      if (
        +state.amount - +action.payload < 0 ||
        action.payload === "" ||
        isNaN(action.payload)
      )
        return state;
      return {
        amount: +state.amount - +action.payload,
        transactions: [
          ...reverseTransactions,
          { transaction: "Abbuchung", value: action.payload, date: getDate() },
        ].reverse(),
      };
    default:
      break;
  }
};

export default function Members() {
  const [state, dispatch] = useReducer(handleTransactions, {
    amount: 1000,
    transactions: [],
  });
  const [payIn, setPayIn] = useState("");
  const [chargeOff, setChargeOff] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserApi();
        dispatch({
          type: "getData",
          payload: {
            balance: response.balance,
            transactions: response.transactions,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Keep default state if API fails
      }
    })();
  }, []);

  const handlePayIn = async () => {
    const response = await payInApi(state.amount + +payIn);
    console.log({ response });
    updateBalance(payIn, "Einzahlung");
    setPayIn("");
  };

  const handleChargeOff = async () => {
    const response = await chargeOffApi(state.amount - +chargeOff);
    console.log({ response });
    updateBalance(chargeOff, "Abbuchung");
    setChargeOff("");
  };

  const updateBalance = async (amount, transaction) => {
    const response = await getUserApi();
    console.log("Neuer Kontostand", response);
    dispatch({
      type: "updateAmount",
      payload: { balance: response.balance, amount, transaction },
    });
  };

  console.log(state);

  return (
    <div className="contentWrapper">
      <Navigation />
      <div className="membersWrapper">
        <h1>Kontostand: {state.amount} EUR</h1>
        <div className="revenueWrapper">
          <h3>Umsätze</h3>
          <ul>
            {state.transactions.map((obj, index) => (
              <li key={index}>
                <span>
                  {obj.transaction}: {obj.value} €
                </span>
                <span>{obj.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="transactionWrapper">
          <div className="payIn">
            <h3>Einzahlen</h3>
            <label>
              Betrag eingeben
              <input
                type="text"
                value={payIn}
                onChange={(evt) => setPayIn(evt.target.value)}
              />
            </label>
            <button onClick={() => handlePayIn()}>Bestätigen</button>
          </div>
          <div className="chargeOff">
            <h3>Abbuchen</h3>
            <label>
              Betrag eingeben
              <input
                type="text"
                value={chargeOff}
                onChange={(evt) => setChargeOff(evt.target.value)}
              />
            </label>
            <button
              onClick={() => {
                handleChargeOff();
              }}
            >
              Bestätigen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
