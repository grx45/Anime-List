import { useState } from "react";

export const usePagination = () =>{
    const [currentPage,setCurrentPage] = useState<number>(1)

    const handlePageChange =(pageNumber: { selected: number }) =>{
        setCurrentPage(pageNumber.selected + 1);
    }

    return {currentPage,setCurrentPage,handlePageChange}
}






