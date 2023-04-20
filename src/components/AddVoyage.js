import "../App.css";
import React from "react";

const Voyage = ({ popUp, setPopUp }) => {
  return (
    <>
      <div className="voyage col-xl-3 m-1 p-4 d-flex justify-content-center align-items-center">
        <header className="jumbotron text-white">
          <h3>Add New Voyage</h3>
          <div className="form-group d-flex justify-content-center align-items-center ">
            <button className="btn btn-primary " onClick={() => setPopUp(true)} disabled={popUp}>
              <h5>+</h5>
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default Voyage;
