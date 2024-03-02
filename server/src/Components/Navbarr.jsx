"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import Logomain from "../../img/Dlvery-logos_black.png";
import Image from "next/image";

export default function NavbarComponent() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <Image
          src={Logomain}
          className="mr-3"
          width={50}
          height={50}
          alt="Delhivery Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Delhivery
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
