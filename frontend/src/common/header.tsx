"use client";
import { Button } from "@/components/ui/button";
import { logout, selectAuth } from "@/features/auth/slice";
import AuthForm from "@/features/auth/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterSocket from "@/services/notification";

const Header: React.FC<unknown> = () => {
  return (
    <div className="flex justify-between">
      <div className="text-xl font-bold">
        <Link href="/">Funny Movies</Link>
      </div>
      <div className="max-w-[450px]">
        <MenuBar />
      </div>
    </div>
  );
};

const MenuBar: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const { authenticated, email } = useSelector(selectAuth);
  return (
    <>
      <AuthForm
        classNames={cn({
          "flex justify-between gap-x-2": true,
          hidden: authenticated,
        })}
      />
      <div
        className={cn({
          "flex justify-between gap-x-4 items-center": true,
          hidden: !authenticated,
        })}
      >
        <span className="text-sm">Welcome {email}</span>
        <Link href="/share">
          <Button>Share a Video</Button>
        </Link>
        <Button variant={"outline"} onClick={() => {
          MasterSocket.close()
          dispatch(logout())
        }}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Header;
