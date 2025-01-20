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
import { useToast } from "@/hooks/use-toast"



// Form schema
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." }),
});

type SignUpValues = z.infer<typeof signUpSchema>;

async function signUp(data: SignUpValues) {
  const response = await axios.post(`${baseUrl}icapsule/sign-up`, data);
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

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpValues) {
    setIsLoading(true);
    try {
      const result = await signUp(data);
      if (result.success) {
        toast({
          title: "Signup Successful",
          description: result.message,
          variant: "default",
        });
       
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast({
          title: "Signup Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                className="bg-gray-700 text-white border-gray-600"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
