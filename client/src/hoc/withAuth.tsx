"use client";

import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import { ElementType, useEffect } from "react";

export const withAuth = (WrappedComponent: ElementType) => {
  return function WithAuth(props: object) {
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
      if (!user) {
        redirect("/login");
      }
    });

    return <WrappedComponent {...props} />;
  };
};
