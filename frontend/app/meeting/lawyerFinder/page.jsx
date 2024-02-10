import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <iframe
          width="100%"
          height="1000"
          src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=lawyers+in+Mumbai&ie=UTF8&t=&z=14&iwloc=B&output=embed&zoom=0`}
        >
          <a href="https://www.maps.ie/map-my-route/">Plot a route map</a>
        </iframe>
      </div>
    </div>
  );
};

export default page;
