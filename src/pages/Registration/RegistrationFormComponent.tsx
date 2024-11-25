import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import DatePickerFormField from "./Component/DatePickerFormField";
import {
  useGetCategoryMutation,
  useGetCountryMutation,
  useGetRoleMutation,
  useGetStateMutation,
  useIsEmailExitMutation,
  useIsPhoneNoExitMutation,
  useIsUserNameExitMutation,
} from "../../redux/reducer/api/commonApi";
import { useSignUpMutation } from "../../redux/reducer/api/authApi";
import Loader from "../../components/myComponents/Loader";
import { useDispatch } from "react-redux";

// Validation Schemas
const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    phoneNo: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
    username: z
      .string()
      .min(5, { message: "Username be at least 5 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const userDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  birthDate: z.date(),
  anniversaryDate: z.date(),
  categoryId: z.string(),
  roleId: z.string().min(1, { message: "Please select a role." }),
});

const addressDetailSchema = z.object({
  address1: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  address2: z.string(),
  countryId: z.string().min(0, { message: "Please select a country." }),
  stateId: z.string().min(0, { message: "Please enter a state." }),
  pincode: z.string().min(4, { message: "Please enter a pincode." }),
  city: z.string().min(1, { message: "Please enter a city." }),
});

// Main Form Component
export function RegistrationFormComponent() {
  const [step, setStep] = useState(1);

  const [getCategory, { data: categoryList, isLoading: isCategoryLoaing }] =
    useGetCategoryMutation();
  const [getCountry, { data: countryList, isLoading: isCountryLoaing }] =
    useGetCountryMutation();
  const [getState, { data: stateList, isLoading: isStateLoaing }] =
    useGetStateMutation();
  const [getRole, { data: roleList, isLoading: isRolesLoaing }] =
    useGetRoleMutation();

  const [checkIsEmailExits, { data: isEmailExit, isLoading: checkingEmail }] =
    useIsEmailExitMutation();
  const [checkIsPhoneExits, { data: isPhoneExit, isLoading: checkingPhoneNo }] =
    useIsPhoneNoExitMutation();
  const [
    checkIsUserNameExits,
    { data: isUserNameExit, isLoading: checkingUserName },
  ] = useIsUserNameExitMutation();

  const [registerUser,{isLoading:isSubmitting,isSuccess}]=useSignUpMutation();

  
  const navigate = useNavigate();


  useEffect(() => {
    getCategory();
    getCountry();
    getRole();
  }, []);

  useEffect(()=>{
    if(isSuccess){
      navigate("/login");
    }
  },[isSuccess]);

  const form = useForm<z.infer<typeof loginSchema & typeof userDetailsSchema & typeof addressDetailSchema>>({
    resolver: zodResolver(
      step === 1
        ? loginSchema
        : step === 2
        ?  userDetailsSchema
        : addressDetailSchema
    ),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthDate: undefined,
      phoneNo: "",
      username: "",
      address1: "",
      address2: "",
      countryId: "",
      stateId: "",
      categoryId: "",
      roleId:"",
      city: "",
      pincode:"",
    },
  });

  useEffect(() => {
    const errorMessages = {
      email: "Email Already Exist!",
      phoneNo: "Phone No. Already Exist!",
      userName: "User Name Already Exist!",
    };

    if (isEmailExit) {
      form.setError("email", { message: errorMessages.email });
    } else {
      form.clearErrors("email")
    } 
    
    if (isPhoneExit) {
      form.setError("phoneNo", { message: errorMessages.phoneNo });
    } else {
      form.clearErrors("phoneNo")

    } 
     if (isUserNameExit) {
      form.setError("username", { message: errorMessages.userName });
    }
    else {
      form.clearErrors("username")

    } 
  }, [isEmailExit, isPhoneExit, isUserNameExit]);

  async function onSubmit(values: any) {
    if (step === 1) {
      const result = loginSchema.safeParse(values);
      if (result.success) {
        setStep(2);
      } else {
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as any, { message: issue.message });
        });
      }
    } else if (step === 2) {
      const result = userDetailsSchema.safeParse(values);
      if (result.success) {
        setStep(3);
      } else {
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as any, { message: issue.message });
        });
      }
    } else {
      // Simulate API call
      registerUser(form.getValues())

      // navigate("/");
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-modern from-amber-100 to-amber-200 p-4">
      <Card className="w-full max-w-md">
        {
          isSubmitting && <Loader />
        }
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            {step === 1
              ? "Step 1: Login Credentials"
              : step === 2
              ? "Step 2: Personal Details"
              : "Step 3: Address Details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div
                className={step === 1 ? "flex gap-3 flex-col mt-0" : "hidden"}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                          onBlur={(e) => {
                            checkIsEmailExits(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="jone_2001"
                          {...field}
                          onBlur={(e) => {
                            checkIsUserNameExits(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1234567890"
                          {...field}
                          onBlur={(e) => {
                            checkIsPhoneExits(e.target.value);
                          }}
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={step === 2 ? "flex gap-3 flex-col mt-0" : "hidden"}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePickerFormField
                    formControl={form.control}
                    name={"birthDate"}
                    label={"Birth Date"}
                    description="Optional"
                  />
                  <DatePickerFormField
                    formControl={form.control}
                    name={"anniversaryDate"}
                    label={"Anniversary Date"}
                    description="Optional"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => {
                    
                    return (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryList &&
                            categoryList.length > 0 &&
                            categoryList.map(
                              (category: { value: number; text: string }) => (
                                <SelectItem value={category.value?.toString()}>
                                  {category.text}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}}
                />
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleList &&
                            roleList.length > 0 &&
                            roleList.map(
                              (role: { value: number; text: string }) => (
                                <SelectItem value={role.value?.toString()}>
                                  {role.text}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Add other fields here for Step 2 */}
              </div>
              <div
                className={step === 3 ? "flex gap-3 flex-col mt-0" : "hidden"}
              >
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                            getState(e);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                                 countryList && countryList.length>0 && countryList.map((country:{value:number,text:string})=><SelectItem value={country.value?.toString()}>{country.text}</SelectItem>)
                               }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                         <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!(stateList && stateList.length>0)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                                 {
                                   stateList && stateList.length>0 && stateList.map((state:{value:number,text:string})=><SelectItem value={state.value?.toString()}>{state.text}</SelectItem>)
                                 }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip code</FormLabel>
                        <FormControl>
                          <Input placeholder="423121" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Add other fields here for Step 2 */}
              </div>
              <CardFooter className="flex justify-between mt-5">
                {(step === 2 || step === 3) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  {step === 1 || step === 2
                    ? "Next"
                    : isSubmitting
                    ? "Submitting..."
                    : "Register"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
