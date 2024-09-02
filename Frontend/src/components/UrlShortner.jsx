import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function UrlShortner() {
  const [inputValue, setInputValue] = useState("");
  const [apidata, setApiData] = useState("");

  const [copyText, setCopyText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e) => {
    console.log(copyText);

    setInputValue(e.target.value);
  };

  const copyToClipBoard = async (e) => {
    try {
      const textToCopy = "http://localhost:8000/api/v1/user/url/" + apidata;

      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      // setApiData("");
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      alert("You must enter the link");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/url",
        {
          url: inputValue,
        }
      );
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error Sendind data", error);
    }
  };
  return (
    <div className=" bg-pink flex justify-center items-center mt-20">
      <div className="w-full  max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Link to="/dashboard">
          <h1 className="text-black font-bold ">Go to Dashboard</h1>
        </Link>
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-2">Shorten a long link</h2>
          <p className="text-gray-500 mb-4">No credit card required.</p>
          <input
            type="text"
            placeholder="Paste your long link here"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleInputChange}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
            onClick={handleSubmit}>
            Get your link for free →
          </button>
          {apidata && setCopySuccess && (
            <input
              type="text"
              value={"http://localhost:8000/api/v1/user/url/" + apidata}
              onChange={(e) => setCopyText(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-white"
              readOnly
            />
          )}
          {apidata && (
            <button
              className="w-2/3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300 mt-4"
              onClick={copyToClipBoard}>
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlShortner;
