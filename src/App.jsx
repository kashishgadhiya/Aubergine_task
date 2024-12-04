import React, { useState, useEffect } from "react";

import Card from "./Component/Card";

const App = () => {
  
  const [country, setCountry] = useState("");
  const [findState, setFindState] = useState("");
  const [states, setAllStates] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlldata = async () => {
    const res = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    const data = await res.json();
    setUniversities(data);

    const uniState = [...new Set(data.map((uni) => uni["state-province"]))];
    setAllStates(uniState.filter(Boolean));
  };

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetchAlldata();
      setLoading(false);
    }
  }, [country]);

  const filteredUniversities = findState
    ? universities.filter(
        (university) => university["state-province"] === findState
      )
    : universities;

  return (
    //tailwind css is not working in my project so i used simple css
    <div style={{ padding: "20px" }}>
      <h1>University App</h1>
      <input
        type="text"
        placeholder="Select your desired country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{ marginBottom: "10px", width: "300px", display: "block" }}
      />

      {states.length > 0 && (
        <select
          onChange={(e) => setFindState(e.target.value)}
          value={findState}
        >
          <option value="">States</option>
          {states.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>
      )}

      {loading ? (
        "loading "
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {filteredUniversities.map((university, i) => (
            <Card key={i} university={university} id={`card-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
