// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormInput from "./FormInput";
import FormOutput from "./FormOutput";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormInput />} />
        <Route path="/formPage" element={<FormOutput />} />
      </Routes>
    </Router>
  );
};

export default App;

//FormInput.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  age: string;
  gender: string;
  address: string;
  country: string;
  agreeTerms: boolean;
}

type changeEventType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
>;
const FormInput: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    address: "",
    agreeTerms: false,
    country: "india",
  });

  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/formPage", { state: { formData } });
  };
  const handleChange = (e: changeEventType) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    //alert(e.target.value);
  };
  return (
    <div>
      <h1>Form data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms">
            I agree to the terms and conditions
          </label>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>
        <div>
          <Link to="/formPage" onClick={handleSubmit}>
            Go to Form Page
          </Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormInput;

//FormOutput.tsx
import React from "react";
import { useLocation } from "react-router-dom";

interface FormData {
  name: string;
  age: string;
  gender: string;
  address: string;
  country: string;
  agreeTerms: boolean;
}

const FormOutput: React.FC = () => {
  const location = useLocation();
  const formData = (location.state as { formData?: FormData })?.formData || {
    name: "",
    age: "",
    gender: "",
    address: "",
    country: "",
    agreeTerms: false,
  };

  return (
    <div>
      <h2>Form Data:</h2>
      <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
      <p>Gender: {formData.gender}</p>
      <p>Address: {formData.address}</p>
      <p>Agree Terms: {formData.agreeTerms ? "Yes" : "No"}</p>
      <p>Country: {formData.country}</p>
    </div>
  );
};

export default FormOutput;

//Index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
