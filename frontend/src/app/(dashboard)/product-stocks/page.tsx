"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Select from "react-select"; // Import react-select
import Container from "../_components/Container";
import { APIGetAllPagination, Option } from "@/types/common";
import { useFilter } from "@/hooks/useFilter";
import { useProducts } from "@/hooks/useProducts";
import { useFilterColumn } from "@/hooks/useFIlterColumn";
import Table, { type TableRefProps } from "@/components/Table";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import Button from "@/components/Button";
import DownloadIcon from "@/components/icons/DownloadIcon";
import SortIcon from "@/components/icons/SortIcon";
import {listSort, Stock} from "@/app/(dashboard)/_configs/default-data";
import {Product} from "@/types/product";
import {apiFunc} from "@/config/api";

const columnHelper = createColumnHelper<Product>();

const ListProductPage = () => {
	const router = useRouter();
	const tableRef = useRef<TableRefProps>(null);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState<Stock[]>([]);
	const [warehouseOptions, setWarehouseOptions] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState<Option | null>(null);
	const [pagination, setPagination] = useState<APIGetAllPagination>({
		currentPage: 1,
		nextPage: 0,
		previousPage: 0,
		totalData: 0,
		totalPages: 1,
	});
	const { getProductStock } = useProducts(router);
	const {
		filter: { search, sort },
		onChange,
		onChangeInput,
	} = useFilter();

	const getMasterData = async () => {
		try {
			const [warehouseResponse] = await Promise.all([
				apiFunc('/warehouse', 'get'),
			]);

			return {
				warehouse: warehouseResponse.data.content,
			};
		} catch (err) {
			console.log(err);
			return {};
		}
	};

	const fetchData = async (page: number = 1) => {
		const data = {
			productGroup: [],
			variation: [],
		};

		const res = await getProductStock(data, {
			limit,
			page,
			search,
			sort,
			warehouseId: selectedWarehouse?.value??0, // Pass selected warehouse ID to API
		});

		if (res.code === 200) {
			setData(res.content.data);
			setPagination(res.content.pagination);
		}
	};

	// Fetch data when limit, search, sort, or selected warehouse changes
	useEffect(() => {
		fetchData();

		const fetchMaster = async () => {
			const masterData = await getMasterData();
			if (masterData.warehouse) {
				const options = masterData.warehouse.map((val) => ({
					value: val.id,
					label: val.warehouseName,
				}));
				setWarehouseOptions(options);
			}
		};
		fetchMaster();

	}, [limit, search, sort, selectedWarehouse]); // Add selectedWarehouse as a dependency

	const onChangeLimit = (newValue: Option) => {
		setLimit(newValue.value as number);
		fetchData(1);
	};

	// Handle warehouse selection change
	const handleWarehouseChange = (selectedOption: Option | null) => {
		setSelectedWarehouse(selectedOption);
		console.log("Selected Warehouse:", selectedOption); // Log the selected value
		fetchData(); // Refresh the table
	};

	function getDate(date: string) {
		const year = date.substring(0, 4);
		const month = date.substring(5, 7);
		const day = date.substring(8, 10);

		const hour = date.substring(11, 13);
		const minute = date.substring(14, 16);
		const second = date.substring(17, 19);

		return {
			year,
			month,
			day,
			second,
			minute,
			hour
		}
	}

	const columns: ColumnDef<Stock, any>[] = useMemo(
		() => [
			columnHelper.accessor("product.productName", {
				cell: (info) => info.getValue(),
				header: "Product",
			}),
			columnHelper.accessor("boxQty", {
				cell: (info) => info.getValue(),
				header: "Box Qty",
			}),
			columnHelper.accessor("pcs", {
				cell: (info) => info.getValue(),
				header: "Pcs",
			}),
			columnHelper.accessor("warehouse.warehouseName", {
				cell: (info) => info.getValue(),
				header: "Warehouse",
			}),
			columnHelper.accessor("updatedAt", {
				cell: (info) => {
					const { day, month, year } = getDate(info.getValue());
					const createdAt = `${day}/${month}/${year}`;
					return <div>{createdAt}</div>;
				},
				header: "Date",
				size: 60,
			}),
		],
		[limit, pagination]
	);

	const { filterColumn, onChangeFilterColumn } = useFilterColumn(
		columns,
		tableRef.current?.columnLeaf ?? []
	);

	return (
		<>
			<Container title="Product Stock" className="">
				<div className="p-8 rounded-xl bg-white">
					<div className="flex flex-col lg:flex-row justify-end items-end mb-4">
						<div className="flex flex-1 flex-col"></div>
						<div className="flex"></div>
					</div>

					<div className="flex flex-col justify-between items-center lg:flex-row mb-6">
						<div className="flex flex-col flex-1 lg:flex-row">
							{/* Warehouse Select2 Dropdown */}
							<div className="mr-4">
								<label className="block text-sm font-medium text-gray-700">Warehouse</label>
								<Select
									options={warehouseOptions}
									value={selectedWarehouse}
									onChange={handleWarehouseChange}
									className="mt-1 w-[200px]"
									placeholder="Select Warehouse"
								/>
							</div>
						</div>

						<div className="flex flex-col ml-2 lg:flex-row">
							<TextInput
								id="search"
								name="search"
								search
								containerClassName="w-[200px]"
								placeholder="Search here"
								onChange={onChangeInput}
							/>
							<SelectInput
								name="sort"
								data={listSort}
								containerClassName="w-[96px] ml-2 hidden"
								menuWidth="114px"
								preContent={
									<SortIcon className="ml-3 fill-blue-grey-900 text-blue-grey-900" />
								}
								value={{ label: "Sort", value: 0 }}
								hiddenValue={sort}
								onChange={(val) => onChange(val.value, "sort")}
							/>
							<Button className="ml-3 mt-3 lg:mt-0 hidden">
								Download Data
								<DownloadIcon className="ml-2 fill-white text-white" />
							</Button>
						</div>
					</div>

					<Table
						ref={tableRef}
						data={data}
						limit={limit}
						page={pagination.currentPage}
						onClickNextPage={fetchData}
						columns={columns}
						onChangeLimit={onChangeLimit}
						rowClass=""
						hoverRow
						pagination={pagination}
						rowColorField
					/>
				</div>
			</Container>
		</>
	);
};

export default ListProductPage;
