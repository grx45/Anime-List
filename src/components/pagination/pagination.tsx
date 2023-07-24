import ReactPaginate from 'react-paginate'

interface PaginationProps {
    handlePageChange: (pageNumber: { selected: number }) => void;
    size: number;
    totalData: number;
}


function Pagination({ handlePageChange, size, totalData }: PaginationProps) {
    const pageCount = Math.ceil(totalData / size);

    return (
        <div className='random'>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                previousLabel="<<"
                marginPagesDisplayed={3} // number of pages at the start and end of pagination
                pageCount={pageCount}
                pageRangeDisplayed={3} // number of pages between breaklabel
                onPageChange={handlePageChange}
                initialPage={0}
                // =======================================================================smua yang dibawah ini styling aja
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-num"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-num"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-num "}
                activeLinkClassName={"active"}
            />
        </div>
    );
}

export default Pagination;