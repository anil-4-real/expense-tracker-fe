import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ExpenseCard from "./ExpenseCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated]);

  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/expense/${user.sub}`
    );
    if (Object.keys(res.data.user).length > 0) {
      setIsLoading((prev) => !prev);
      setExpenses(res.data.user);
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => {
          navigate("/create");
        }}
        type="button"
        className="create-button"
      >
        Create an eXpense?
      </button>
      <div className="dashboard">
        {expenses.expenses === undefined || expenses.expenses.length === 0 ? (
          <>Create an expense to begin</>
        ) : (
          expenses.expenses.map((expense, i) => {
            return <ExpenseCard key={i} func={getData} data={expense} />;
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
