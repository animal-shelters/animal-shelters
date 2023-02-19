import { FocusEventHandler } from "react";

interface Props {
    pageIndex: number;
    totalItems: number;
    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;
    setPageIndex: (pageIndex: number) => void;
}

function Pagination(props: Props) {
    console.log(props);
    function toFirstPage() {
        if (props.pageIndex != 1) {
            props.setPageIndex(1);
        }
    }

    function toPrevPage() {
        if (props.pageIndex > 1) {
            props.setPageIndex(props.pageIndex - 1);
        }
    }

    function toNextPage() {
        if (props.pageIndex < Math.ceil(props.totalItems / props.pageSize)) {
            props.setPageIndex(props.pageIndex + 1);
        }
    }

    function toLastPage() {
        if (props.pageIndex != Math.ceil(props.totalItems / props.pageSize)) {
            props.setPageIndex(Math.ceil(props.totalItems / props.pageSize))
        }
    }

    return (
        <div className="flex justify-center items-center gap-4 pt-12">
            <button className="" onClick={() => toFirstPage()}>{"<<"}</button>
            <button onClick={() => toPrevPage()}>{"<"}</button>
            <span>
                <input className="w-12" onBlur={(event) => { if (event.target.value && parseInt(event.target.value) > 0 && parseInt(event.target.value) <= Math.ceil(props.totalItems / props.pageSize)) props.setPageIndex(parseInt(event.target.value)) }} defaultValue={props.pageIndex} />
                {" "}z {Math.ceil(props.totalItems / props.pageSize)}
            </span>
            <button onClick={() => toNextPage()}>{">"}</button>
            <button onClick={() => toLastPage()}>{">>"}</button>
        </div>
    );
}

export default Pagination;
