"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { baseUrl } from "@/helpers/constants";
import { useToast } from "@/hooks/use-toast";

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." }),
});

type loginValues = z.infer<typeof loginSchema>;

async function login(data: loginValues) {
  const response = await axios.post(`${baseUrl}icapsule/login`, data);
  const result = response.data;
  if (result.success) {
    return {
      success: true,
      message: result.message,
    };
  } else {
    return { success: false, message: result.message };
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: loginValues) {
    setIsLoading(true);
    try {
      const result = await login(data);
      if (result.success) {
        toast({
          title: "Login Successful",
          description: result.message,
          variant: "default",
        });
        console.log(result.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 4000);
      } else {
        toast({
          title: "login Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Enter you Deatils to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-gray-700 text-white border-gray-600"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-gray-700 text-white border-gray-600"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-400">
            Create an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
