"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthSchema, authSchema } from "@/features/auth/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "./slice";
import { useLoginServerMutation } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import MasterSocker from "@/services/notification";

export type AuthFormProps = {
  classNames?: string;
  onSubmit?: (values: AuthSchema) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ classNames, onSubmit: extraSubmit }) => {
  const [loginServer, { isLoading, isSuccess, isError }] = useLoginServerMutation();
  const dispatch = useDispatch();
  const { toast } = useToast()
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthSchema) {
    loginServer(values)
      .then((response) => {
        if (!response.error) {
          dispatch(
            login({
              authenticated: true,
              email: values.email,
              token: response.data.token,
            })
          )
          extraSubmit?.(response.data);
          MasterSocker?.connect()
        } else {
          // toast an unauthenticated case here
          toast({
            title: "Unauthenticated",
            description: "Please try again",
            variant: "destructive",
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={classNames}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="password" placeholder="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login / Register</Button>
      </form>
    </Form>
  );
};

export default AuthForm;
