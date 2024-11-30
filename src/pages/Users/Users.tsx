import { Button } from "react-day-picker"
import Loader from "../../components/myComponents/Loader"
import { useGetAllUserMutation, useGetAllUserQuery } from "../../redux/reducer/api/userApi"
import { columns } from "./DataTableComponent/Column"
import { DataTable } from "./DataTableComponent/DataTable"
import { PaginationDropdown } from "./DataTableComponent/Pagination"
import { useEffect, useState } from "react"


export interface Payload {
  page: number
  pageSize: number
  searchKeyword: string
  sortBy: string
  isDescending: boolean
  filters: Filter[]
}

export interface Filter {
  fieldName: string
  value: string
  condition: string
  operator: string
}


 function Users() {
  
    const [payload,setPayload]=useState<Payload>({
      filters:[],
      isDescending:true,
      page:1,
      pageSize:10,
      searchKeyword:"",
      sortBy:"userName"
    });

    const [getAllUser,{data,isLoading}] = useGetAllUserMutation();
    const totalPages = 20; // Example total pages

    useEffect(()=>{
      getAllUser(payload)
    },[payload])
    
    const handlePageSizeChange = (size: number) => {
        setPayload(payload=>{ return{
          ...payload,
          pageSize:size
        }})
         // Update table page size logic here
     };

    const handlePageNumberChange = (page: number) => {
        setPayload(payload=>{ return{
          ...payload,
          page:page
        }})
        // Update table page number logic here
    };

    
  return (
    <div className="container mx-auto p-3 h-fit relative">
        {
            <>
              <DataTable columns={columns} data={data?.value || []} isLoading={(isLoading)} />
              <div className="flex items-center justify-end space-x-2 py-4">
                <PaginationDropdown
                    totalPages={totalPages}
                    options={[5, 10, 20, 50]}
                    defaultPageSize={10}
                    defaultPageNumber={1}
                    onPageSizeChange={handlePageSizeChange}
                    onPageNumberChange={handlePageNumberChange}
                />
              </div>
            </>
        }
    </div>
  )
}



export default Users;