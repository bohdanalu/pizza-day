import React from "react";

const Order = () => {
  return (
    <div style={{ paddingBottom: "200px" }}>
      <h2>`Order: id status: preparing`</h2>
      <div>
        <span>Priority</span>
        <span>Preparing order</span>
      </div>
      <div>
        <p>Only 51 minutes left </p>
        <p>
          (Estimated delivery: <span></span>)
        </p>
      </div>
      <ul>
        <li></li>
      </ul>

      <div>
        <p>
          Price pizza: <span>" \u20AC"</span>
        </p>
        <p>
          Price priority: <span>" \u20AC"</span>
        </p>
        <p>
          To pay on delivery: <span>" \u20AC"</span>
        </p>
      </div>
      <button>Prioritize</button>
    </div>
  );
};

export default Order;
