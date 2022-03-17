import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CreateExpense = () => {
  useEffect(() => {}, []);
  const { id } = useParams();
  const history = useLocation();
  const data = history.state.data;
  const { user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: data.name,
      description: data.description,
      price: data.price,
      date: data.date,
      category: data.category,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("required")
        .min(10, "Too short")
        .max(20, "Too long"),
      description: yup
        .string()
        .required("required")
        .min(10, "Too short")
        .max(250, "Too long"),

      price: yup
        .string()
        .matches(/^\d{0,8}(\.\d{1,4})?$/, "Invalid Price Format")
        .required("required"),
      date: yup
        .date()
        .min("2000-01-01", "select a date after 2000")
        .max(Date().toString(), "max date must be today")
        .required("required"),
      category: yup.string().required("required"),
    }),
    onSubmit: (values) => {
      if (isAuthenticated) {
        handleFormSave(values);
      }
    },
  });

  let handleFormSave = async (expense) => {
    const { date, price, name, category, description } = expense;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/expense/${user.sub}/${data.uid}`,
        { date, price, name, category, description, id }
      );
      if (res.data.statusCode === 201) {
        formik.initialValues = {};

        navigate("/dashboard");
      } else {
        window.alert("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h2 className="form-title">Edit eXpense</h2>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Expense Name</label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Joe's Birthday"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="description">Expense Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="money spent On Joe's 12th birthday to buy cake and other stuff"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price">Spent amount</label>
          <br />
          <input
            id="price"
            name="price"
            type="text"
            className="form-control"
            placeholder="enter price"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div style={{ color: "red" }}>{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price">Date</label>
          <br />
          <input
            id="date"
            name="date"
            type="date"
            className="form-control"
            placeholder="date of Joe's birthday"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date ? (
            <div style={{ color: "red" }}>{formik.errors.date}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            name="category"
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            <option value="">--select--</option>
            <option value="miscellaneous">Misc</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fuel">Fuel</option>
            <option value="utilities">Utilities</option>
            <option value="medicine">Medicine</option>
            <option value="groceries">Groceries</option>
            <option value="shopping">Shopping</option>
            <option value="studies">Studies</option>
            <option value="entertainment">Entertainment</option>
            <option value="fitness">Fitness</option>
            <option value="savings">Savings</option>
            <option value="personal">Personal</option>
            <option value="insurance">Insurance</option>
            <option value="repairs">Repairs</option>
            <option value="emergency">Emergency</option>
            <option value="pets">Pets</option>
            <option value="bills">Bills</option>
            <option value="hobbies">Hobbies</option>
            <option value="celebration">Celebration/Festivals</option>
            <option value="others">Others</option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div style={{ color: "red" }}>{formik.errors.category}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
