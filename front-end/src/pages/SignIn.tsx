import React from "react";

import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signup = () => {
  return (
    <div className="grid lg:grid-cols-2 ">
      <div>
        <Auth type="signin" />
      </div>
      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
