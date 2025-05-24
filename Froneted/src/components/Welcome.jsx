import React from "react";

function Welcome({ name }) {
  return (
    <div>
      <span className="text-blue-600">welcome, </span>
      <span className="text-microsoftOrange font-semibold  line-through">
        {" "}
        {name}
      </span>
    </div>
  );
}

export default Welcome;
