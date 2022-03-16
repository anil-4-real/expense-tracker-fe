import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ExpenseCard = (props) => {
  const [reload, setReload] = useState(false);

  useEffect(() => {}, [props]);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const reNavigate = (id) => {
    navigate("/edit/" + id, { state: { data: props.data } });
  };

  const handleDelete = async () => {
    try {
      if (isAuthenticated) {
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URL}/expense/${user.sub}/${props.data.uid}`
        );
        if (res.data.statusCode === 200) {
          setReload(true);
          props.func();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container expense-card-container">
      <div className="expense-card">
        <div className="expense-card-header">
          <div className="expense-card-header-top-container">
            <h2 className="expense-card-title">{props.data.name}</h2>
            <p className="time-stamp">
              <span className="created-on">spent date : </span>
              {props.data.date.split("-").reverse().join("/")}
            </p>
          </div>

          <div className="expense-card-btn-group">
            <button
              onClick={() => {
                reNavigate(props.data.uid);
              }}
              className="edit-expense-button"
              type="button"
            >
              &#9998;&nbsp;Edit
            </button>
            <button
              onClick={handleDelete}
              className="delete-expense-button"
              type="button"
            >
              &#10006;&nbsp;Delete
            </button>
          </div>
        </div>
        <div className="expense-card-body">
          <h4 className="expense-card-body-description">Description</h4>
          <p className="expense-card-body-description-text">
            {props.data.description}
          </p>

          <div className="expense-card-body-price-container">
            <p className="expense-card-body-price">
              <span className="currency">&#8377;&nbsp;</span>
              {parseFloat(props.data.price).toLocaleString("en-in", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <span className="expense-card-body-tag">#{props.data.category}</span>
        </div>
      </div>
      <hr className="card-hr"></hr>
    </div>
  );
};

export default ExpenseCard;
