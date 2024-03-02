"use client";

import NavbarComponent from "../Components/Navbarr";
import FooterComponent from "../Components/Footerr";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Specific() {
  const router = useRouter();

  const img = router.img;

  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center text-2xl font-bold">Specific details</h1>
      <div className="flex flex-row items-center">
        <Image src={img} width={200} height={200} alt="Item Image" />
        <div className="flex flex-col ml-4">
          <h1>Item Name</h1>
          <h1>Item Name</h1>
          <h1>Item Name</h1>
          <h1>Item Name</h1>
          <h1>Item Name</h1>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
