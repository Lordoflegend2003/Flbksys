import FooterComponent from "../Components/Footerr";
import NavbarComponent from "../Components/Navbarr";
import img1 from "../../img/clothes/1.jpg";
import img2 from "../../img/clothes/2.jpg";
import img3 from "../../img/clothes/3.jpg";
import w1 from "../../img/watches/1.jpg";
import w2 from "../../img/watches/2.jpg";
import w3 from "../../img/watches/3.jpg";
import w4 from "../../img/watches/4.jpg";
import CardComp from "./Card";

export default function inventmain() {
  const imagesofall = [img1, img2, img3, img1, img2, img3, img1, img2];
  const watchimg = [w1, w2, w3, w4];

  const numberOfColumns = 4;

  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center text-4xl mb-5 font-bold">Inventory</h1>
      <h1 className=" ml-7 text-3xl mb-5 font-semibold">Clothings</h1>
      <div
        className={`grid grid-cols-${numberOfColumns} gap-4 justify-items-center`}
      >
        {imagesofall.map((img, index) => (
          <CardComp key={index} img={img} />
        ))}
      </div>
      <h1 className="ml-7 text-3xl mb-5 font-semibold my-10">Watches</h1>
      <div
        className={`grid grid-cols-${numberOfColumns} gap-4 justify-items-center`}
      >
        {watchimg.map((img, index) => (
          <CardComp key={index} img={img} />
        ))}
      </div>
      <FooterComponent />
    </div>
  );
}
