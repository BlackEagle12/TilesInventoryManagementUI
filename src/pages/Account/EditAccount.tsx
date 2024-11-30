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
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useGetAllRoleQuery,
  useGetCategoryQuery,
  useGetCountryQuery,
  useGetRoleQuery,
  useGetStateMutation,
} from "../../redux/reducer/api/commonApi";
import { useSignUpMutation } from "../../redux/reducer/api/authApi";
import Loader from "../../components/myComponents/Loader";
import DatePickerFormField from "../Registration/Component/DatePickerFormField";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { User2 } from "lucide-react";
import { useGetUserByIdMutation, useUpdateUserMutation } from "../../redux/reducer/api/userApi";
import { useSelector } from "react-redux";

const userDetailsSchema = z.object({
    firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
    birthDate: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
    anniversaryDate: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
  
  categoryId: z.number(),
  address1: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  address2: z.string(),
  countryId: z.preprocess(
    (val) => (typeof val === "string" ? (val.trim() ? Number(val) : null) : val),
    z.number({ required_error: "Please select a country." }).min(1, { message: "Invalid country ID." })
  ),
  stateId: z.preprocess(
    (val) => (typeof val === "string" ? (val.trim() ? Number(val) : null) : val),
    z.number({ required_error: "Please enter a state." }).min(1, { message: "Invalid state ID." })
  ),
  pincode: z.string().min(4, { message: "Please enter a pincode." }),
  city: z.string().min(1, { message: "Please enter a city." }),
});

// Main Form Component
 function EditAccount() {


  const { data: categoryList } =
  useGetCategoryQuery({});
  const { data: countryList} =
  useGetCountryQuery({});
  const [getState,{ data: stateList,isSuccess:stateListGet}]=
  useGetStateMutation({});

  const [updateUser,{isLoading:isSubmitting,isSuccess}]=useUpdateUserMutation();
  const [getUserById,{isLoading,data:userData}]=useGetUserByIdMutation();

  const [showDialog,setShowDialog]=useState(false);
  
  const form = useForm<z.infer<typeof userDetailsSchema>>({
    resolver: zodResolver(
        userDetailsSchema
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: undefined,
      address1: "",
      address2: "",
      countryId:0,
      stateId: 0,
      categoryId: 0,
      city: "",
      pincode:"",
    },
    values:{...userData}
  });


  useEffect(()=>{
    if(showDialog){
      getUserById();
    }
  },[showDialog]);

  useEffect(()=>{
    if(stateListGet && userData){
      form.setValue("stateId",userData.stateId )
    }
  },[stateListGet,userData])

  useEffect(()=>{
    if(userData && userData.countryId){
      getState(userData.countryId);
    }
  },[userData]);

  useEffect(()=>{
    if(isSuccess){
      setShowDialog(false)
    }
  },[isSuccess]);

  async function onSubmit(values: any) {
    console.log("values",{...userData,...values});
    
      const result = userDetailsSchema.safeParse(values);
      if (result.success) {
        updateUser({...userData,...values});
      } else {
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as any, { message: issue.message });
        });
      }
  }

  return (
    <Dialog modal open={showDialog} onOpenChange={(isOpen)=>setShowDialog(isOpen)} >
        <DialogTrigger>
              <Button className='bg-white text-black'>
                 <User2 /> Account
              </Button>
        </DialogTrigger>
       
        <DialogContent className="w-full max-w-4xl mx-auto">
          <DialogHeader>
               <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          <Card className="w-full p-4">
             
             {
              isSubmitting && <Loader />
             }
            <CardContent>
            {
          (isLoading) ? <Loader /> :
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Name Fields */}
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

                    {/* Date Picker Fields */}
                    <DatePickerFormField
                      formControl={form.control}
                      name="birthDate"
                      label="Birth Date"
                      description="Optional"
                    />
                    <DatePickerFormField
                      formControl={form.control}
                      name="anniversaryDate"
                      label="Anniversary Date"
                      description="Optional"
                    />

                    {/* Dropdown Fields */}
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value)=>field.onChange(Number(value))}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoryList &&
                                categoryList.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.text}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Address Fields */}
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

                    {/* Country and State Fields */}
                    <FormField
                      control={form.control}
                      name="countryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(Number(value));
                              getState(value);
                            }}
                            value={field.value}

                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryList && countryList?.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.text}
                                </SelectItem>
                              ))}
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
                           onValueChange={(value)=>field.onChange(Number(value))}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                             {stateList && stateList.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* City and Zip Code */}
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
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="423121" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
             }
            </CardContent>
          </Card>
        </DialogContent>
    </Dialog>
  );
}

export default EditAccount;