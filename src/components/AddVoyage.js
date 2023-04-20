import "../App.css";
import React, { useState } from "react";
import VoyageService from "../services/voyage.service";

const Voyage = ({ route_id, departure, arrival, departure_time }) => {
  const [localLoading, setLocalLoading] = useState(false);
  return (
      
      <>
        <div
          className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center"
          id={route_id}
        >
          <header className="jumbotron text-white">
          <h3 >Add New Voyage</h3>
          <div className="form-group d-flex justify-content-center align-items-center ">
            <button className="btn btn-primary " disabled={localLoading}>
              {localLoading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {!localLoading && (
                <h5 >+</h5>
              )}
              
            </button>
          </div>
          </header>
        </div>
      </>
    
  );
};

export default Voyage;
