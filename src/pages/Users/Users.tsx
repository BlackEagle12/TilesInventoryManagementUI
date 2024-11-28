import { Button } from "react-day-picker"
import Loader from "../../components/myComponents/Loader"
import { useGetAllUserQuery } from "../../redux/reducer/api/userApi"
import { columns } from "./DataTableComponent/Column"
import { DataTable } from "./DataTableComponent/DataTable"
import { PaginationDropdown } from "./DataTableComponent/Pagination"
import { useState } from "react"


 function Users() {
  
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const {data,isLoading,isFetching} = useGetAllUserQuery({pageNo,pageSize});

    const totalPages = 20; // Example total pages
    
    const handlePageSizeChange = (size: number) => {
        setPageSize(size)
         // Update table page size logic here
     };

    const handlePageNumberChange = (page: number) => {
        setPageNo(page)
        // Update table page number logic here
    };

    
  return (
    <div className="container mx-auto p-3 h-fit relative">
        {
            <>
              <DataTable columns={columns} data={data || []} isLoading={(isLoading || isFetching)} />
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