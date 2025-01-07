"use client";
import React from "react";
import CompanyInfoForm from "@/components/CompanyInfoForm";
import UserInfoForm from "@/components/UserInfoForm";

const index = () => {

  return (
    <div className="flex flex-col justify-center items-center mt-36">
      <h1 className="text-3xl font-bold">Lets Register Your Company</h1>

      {/* <CompanyInfoForm  /> */}

      <UserInfoForm />
      
    </div>
  );
};

export default index;

