import React from "react";
import Image from "next/image";

export default function Tablecomponent({ props }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-10 py-3">
              Image
            </th>
            <th scope="col" className="px-10 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Delivery Time
            </th>
            <th scope="col" className="px-6 py-3">
              Delivery Date
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
              <Image src={props} alt="Product Image" width={64} height={64} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              Apple Watch
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              7AM-10PM
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              10/12/2024
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              200
            </td>
            <td className="px-6 py-4">
              <a
                href="javascript:void(0)"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delivered
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
