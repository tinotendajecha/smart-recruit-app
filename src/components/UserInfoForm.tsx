import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserInfoFormProps {
  statement: string;
  role: string;
}

const UserInfoForm = ({ statement, role }: UserInfoFormProps) => {
  // Define the schema with validation
  const formSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." }),
      surname: z
        .string()
        .min(2, { message: "Surname must be at least 2 characters long." }),
      email: z.string().email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"], // Point the error to the confirmPassword field
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4 sm:px-6 md:px-8">
      <Form {...form}>
        <div className="flex flex-col mb-6 items-start">
          <span className="text-2xl sm:text-3xl font-bold text-green-600">
            Create Account
          </span>
          <span className="text-sm sm:text-base text-gray-600">{statement}</span>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Surname Field */}
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Surname</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your surname" className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm your password"
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="form-controls mt-4">
            <Button
              className="w-full bg-green-600 hover:bg-green-500 text-sm sm:text-base"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
