"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schema/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

const PublicPage = () => {
  const params = useParams();
  const { username } = params;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const [generatedMessages, setGeneratedMessages] = useState<string>(
    "What's the most interesting thing you've learned this week?||How are you feeling today?||Have you done something that made you smile today?"
  );
  const [messagesList, setMessagesList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingMessages, setIsGeneratingMessages] = useState(false);

  const messageContent = form.watch("content");

  const generateMessages = async () => {
    setIsGeneratingMessages(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setGeneratedMessages(response.data.messages);
      setMessagesList(generatedMessages.split("||"));

      toast({
        description: "New messages generated",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while generating messages",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingMessages(false);
    }
  };

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  useEffect(() => {
    setMessagesList(generatedMessages.split("||"));
  }, [generatedMessages]);

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: messageContent,
      });

      toast({
        description: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <FormProvider {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                onClick={sendMessage}
              >
                Send
              </Button>
            )}
          </div>
        </form>
      </FormProvider>

      <div className="space-y-6 my-8">
        <Button onClick={generateMessages} disabled={isGeneratingMessages}>
          {isGeneratingMessages ? "Generating..." : "Suggest Messages"}
        </Button>
        <p>Click on any message below to select it.</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="p-4 border rounded flex flex-col gap-4">
          {messagesList?.map((value) => {
            return (
              <Button
                variant="outline"
                key={value}
                onClick={() => handleMessageClick(value)}
              >
                {value}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <p>Get Your Message Board</p>
        <Button>
          <Link href="/sign-up">
            Create Your Account
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PublicPage;
