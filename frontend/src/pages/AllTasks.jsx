import React, { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import Cards from "../components/Home/Cards";

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState(false);

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv(true)}>
            {" "}
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <Cards home={"true"} setInputDiv={setInputDiv} />
      </div>

      {inputDiv && <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />}
    </>
  );
};

export default AllTasks;
