"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ShareSchema, shareSchema } from "./form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShareVideoResponse, useShareVideoMutation } from "@/services/video";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/slice";

export type ShareFormProps = {
  className?: string;
  onSubmitCallBack?: (arg: ShareVideoResponse) => void;
};

export const ShareForm: React.FC<ShareFormProps> = ({ className, onSubmitCallBack }) => {
  const { authenticated } = useSelector(selectAuth);
  const router = useRouter();
  const { toast } = useToast();
  const [shareVideo, { isLoading, isSuccess, isError }] = useShareVideoMutation(
    {}
  );
  const form = useForm<ShareSchema>({
    resolver: zodResolver(shareSchema),
    defaultValues: {
      youtubeURL: "",
    },
  });
  function onSubmit(values: ShareSchema) {
    if (!authenticated) {
      toast({
        title: "Unauthenticated",
        description: "Please login before sharing a video",
        variant: "destructive",
      });
      return;
    }

    shareVideo({
      url: values.youtubeURL,
    })
      .unwrap()
      .then((response) => {
        toast({
          title: "Success",
          description: "Video shared successfully",
        });
        onSubmitCallBack?.(response);
        router.push(`/`);
      })
      .catch((error) => {
        toast({
          title: "Something is wrong",
          description: "Please try again later",
          variant: "destructive",
        });
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="youtubeURL"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="https://youtube.com/xsyqgsa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Share
        </Button>
      </form>
    </Form>
  );
};

export default ShareForm
