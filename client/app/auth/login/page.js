"use client";

import Button from "@/component/Button";
import { useEffect, useState } from "react";

const Page = () => {
  const [a, setA] = useState(10);
  const handleOnAdd = () => {
    // a++;
    setA(a + 1);
  };
  const handleOnSub = () => {
    setA(a - 1);
  };
  const handleOnDiv = () => {
    setA(a / 2);
  };
  const handleOnMul = () => {
    setA(a * 2);
  };

  useEffect(() => {
    console.log("Component mounted or updated");
  }, [a]);
  return (
    <div>
      <h1 className="bg-slate-400">Hello from login page {a}</h1>
      <Button text="Add" onClick={handleOnAdd} />
      <Button text="Sub" onClick={handleOnSub} />
      <Button text="Div" onClick={handleOnDiv} />
      <Button text="Mul" onClick={handleOnMul} />
      <h1>Counter value: {a}</h1>
    </div>
  );
};

export default Page;
