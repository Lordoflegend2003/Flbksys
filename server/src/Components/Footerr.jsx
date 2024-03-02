// Updated import statement
import logofooter from "../../img/Dlvery-logos_black.png";
import { Footer } from "flowbite-react";
import Image from "next/image";

export default function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full text-center mt-7">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Image
            src={logofooter}
            alt="Dlvery"
            width={150}
            height={150}
            className="mr-5"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Dlvery™" year={2024} />
      </div>
    </Footer>
  );
}
