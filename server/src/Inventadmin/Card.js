"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Specific from "../Specific/page";
import { Button } from "@nextui-org/react";
export default function CardComp({ img }) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/Specific", { img: img });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-9 py-3">
              Image
            </th>
            <th scope="col" className="px-5 py-3 text-center`">
              Product Name
            </th>
            <th scope="col" className="px-5 py-3">
              Stock No's
            </th>
            <th scope="col" className="px-5 py-3">
              Stock Outlet
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <Image src={img} alt="Product Image" width={64} height={64} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              Apple Watch
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              1,00,056
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              Chennai
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              200
            </td>
            <td className="px-6 py-4">
              <Button
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                color="danger"
                variant="bordered"
                onClick={handleButtonClick}
              >
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
