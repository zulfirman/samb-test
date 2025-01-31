"use client";

import { APIGetAllPagination, Option } from "@/types/common";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	VisibilityState,
	Column,
} from "@tanstack/react-table";
import {
	forwardRef,
	useEffect,
	useMemo,
	useState,
	useImperativeHandle,
} from "react";
import SelectInput from "../SelectInput";
import Pagination from "./Pagination";

type TableProps = {
	columns: any[];
	data: any[];
	pagination: APIGetAllPagination;
	onClickNextPage?: (page?: number) => void;
	onClickPrevPage?: () => void;
	onChangeLimit?: (item: { [key: string]: any }) => void;
	page: number;
	limit: number;
	excludePaginationLimit?: number[];
	showPagination?: boolean;
	rowClass?: HTMLDivElement["className"];
	rowOnClick?: (data: any) => void;
	rowColorField?: boolean;
	hoverRow?: boolean;
};

export type TableRefProps = {
	columnLeaf: Column<any, unknown>[];
	columnVisibility: VisibilityState;
};

export const limits: Option[] = [
	{
		label: "10",
		value: 10,
	},
	{
		label: "25",
		value: 25,
	},
	{
		label: "50",
		value: 50,
	},
	{
		label: "100",
		value: 100,
	},
];

// eslint-disable-next-line react/display-name
const Table = forwardRef<TableRefProps, TableProps>(
	(
		{
			columns,
			data,
			limit,
			page,
			onChangeLimit,
			onClickNextPage,
			onClickPrevPage,
			pagination,
			excludePaginationLimit,
			showPagination = true,
			rowClass = "",
			rowOnClick,
			rowColorField = false,
			hoverRow = false,
		},
		ref
	) => {
		const [dataColumns, setDataColumns] = useState([...columns]);
		const [columnVisibility, setColumnVisibility] = useState({});

		const table = useReactTable({
			columns: dataColumns,
			data,
			getCoreRowModel: getCoreRowModel(),
			state: {
				columnVisibility,
			},
			onColumnVisibilityChange: setColumnVisibility,
		});

		useImperativeHandle(ref, () => ({
			columnLeaf: table.getAllLeafColumns(),
			columnVisibility,
		}));

		useEffect(() => {
			setDataColumns([...columns])
		}, [columns])

		const colors = [
			"bg-[rgba(255,122,148,0.3)]",
			"bg-[rgba(76,173,91,0.1)]",
			"bg-[rgba(251,255,80,0.3)]",
			"bg-[rgba(76,173,91,0.3)]",
		];

		// table.up

		return (
			<>
				<div className="relative overflow-x-auto scrollbar-thumb-dark-grey-500 scrollbar-track-blue-grey-700 scrollbar-thin scrollbar-thumb-rounded-lg">
					<table className="text-dark-grey-500 min-w-[600px] w-full relative">
						<thead className="text-left">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr
									className="border-b-[1px] border-blue-grey-700 font-bold text-xs"
									key={headerGroup.id}
								>
									{headerGroup.headers.map((header) => (
										<th
											className="pb-4 sm:pt-4 pl-2"
											key={header.id}
											style={{
												width: header.column.getSize(),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className="letext-left-center">
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row, i) => {
									return (
										<tr
											onClick={() =>
												rowOnClick
													? rowOnClick(row.original)
													: null
											}
											className={`group border-b-[1px] border-blue-grey-300 transition-colors text-xs relative ${
												rowColorField
													? colors[row.original.accuracy - 1] ? colors[row.original.accuracy - 1] : ""
													: "bg-white"
											} ${rowClass}`}
											key={row.id}
										>
											{row
												.getVisibleCells()
												.map((cell) => {
													let fixedWidth = "";

													if (cell.id.includes("description-cell")) {
														fixedWidth = "180px";
													}

													return (
														<td
															className="py-4 pl-2"
															key={cell.id}
															style={{
																maxWidth: fixedWidth ? fixedWidth : cell.column.getSize(),
															}}
														>
															{flexRender(
																cell.column
																	.columnDef.cell,
																cell.getContext()
															)}
														</td>
													)
												})}
										</tr>
									);
								})
							) : (
								<tr>
									<td
										className="letext-left-center font-bold py-5"
										colSpan={columns.length}
										key="not-found"
									>
										Data not found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<Pagination 
					limit={limit}
					limits={limits}
					pagination={pagination}
					onChangeLimit={onChangeLimit}
					showPagination={showPagination}
					onClickNextPage={onClickNextPage}
				/>
			</>
		);
	}
);

export default Table;
