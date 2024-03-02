import React from "react";
import FooterComponent from "../Components/Footerr";
import NavbarComponent from "../Components/Navbarr";
import img1 from "../../img/clothes/1.jpg";
import img2 from "../../img/clothes/2.jpg";
import img3 from "../../img/clothes/3.jpg";
import TabelComponent from "./Tables";

export default function inventmain() {
  const imagedata = [img1, img2, img3];

  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center text-2xl font-semibold mt-3 mb-10">
        Hi ! Pawan, your assigned Delivery Products
      </h1>
      {/* Use parentheses and add a return statement inside the map function */}
      {imagedata.map((props, i) => (
        <TabelComponent key={i} props={props} />
      ))}
      <FooterComponent />
    </div>
  );
}
