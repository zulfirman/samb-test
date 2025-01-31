"use client";

import { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Container from "../_components/Container";
import {apiFunc} from "@/config/api";

const ListProductPage = () => {
	// State variables
	const [selectedSupplier, setSelectedSupplier] = useState(null);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const [notes, setNotes] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [productList, setProductList] = useState([{ productID: 0, boxQty: '', pcs: '' }]);
	const [supplierOptions, setSupplierOptions] = useState([]);
	const [warehouseOptions, setWarehouseOptions] = useState([]);
	const [productOptions, setProductOptions] = useState([]);

	// Fetch master data
	const getMasterData = async () => {
		try {
			const [supplierResponse, productResponse, warehouseResponse] = await Promise.all([
				apiFunc('/supplier', 'get'),
				apiFunc('/product', 'get'),
				apiFunc('/warehouse', 'get'),
			]);

			return {
				supplier: supplierResponse.data.content,
				product: productResponse.data.content,
				warehouse: warehouseResponse.data.content,
			};
		} catch (err) {
			console.log(err);
			return {};
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const masterData = await getMasterData();
			if (masterData.supplier) {
				const options = masterData.supplier.map((val) => ({
					value: val.id,
					label: val.supplierName,
				}));
				setSupplierOptions(options);
			}
			if (masterData.product) {
				const options = masterData.product.map((val) => ({
					value: val.id,
					label: val.productName,
				}));
				setProductOptions(options);
			}
			if (masterData.warehouse) {
				const options = masterData.warehouse.map((val) => ({
					value: val.id,
					label: val.warehouseName,
				}));
				setWarehouseOptions(options);
			}
		};

		fetchData();
	}, []);

	// Add a new row to the product list
	const handleAddRow = () => {
		setProductList([...productList, { productID: 0, boxQty: '', pcs: '' }]);
	};

	// Delete a row from the product list
	const handleDeleteRow = (index) => {
		if (productList.length === 1) {
			Swal.fire({
				icon: 'warning',
				title: 'Cannot Delete',
				text: 'You must have at least one row of product.',
			});
			return;
		}
		const newProductList = productList.filter((_, i) => i !== index);
		setProductList(newProductList);
	};

	// Handle product selection change
	const handleProductChange = (index, selectedOption) => {
		const newProductList = [...productList];
		newProductList[index].productID = selectedOption.value;
		setProductList(newProductList);
	};

	// Handle box quantity change
	const handleBoxChange = (index, value) => {
		const newProductList = [...productList];
		newProductList[index].boxQty = parseInt(value);
		setProductList(newProductList);
	};

	// Handle pieces quantity change
	const handlePcsChange = (index, value) => {
		const newProductList = [...productList];
		newProductList[index].pcs = parseInt(value);
		setProductList(newProductList);
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();

		// Format the date
		const formatDate = (date) => {
			const d = new Date(date);
			const day = String(d.getDate()).padStart(2, '0');
			const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
			const year = d.getFullYear();
			return `${year}-${month}-${day}`;
		};

		// Prepare the request body
		const body = {
			header: {
				notes: notes,
				trxDate: formatDate(selectedDate),
				supplierID: selectedSupplier.value,
				warehouseID: selectedWarehouse.value,
			},
			goodsList: productList,
		};

		console.log(body);

		// Submit the form data
		apiFunc('/goods-release', 'post', { data: body })
			.then((res) => {
				Swal.fire('Submitted!', 'Your form has been submitted.', 'success');
			})
			.catch((err) => {
				Swal.fire('Error!', 'Failed to submit the form.', 'error');
				console.error(err);
			});
	};

	// Confirm form submission
	const confirmSubmit = (e) => {
		e.preventDefault();
		Swal.fire({
			title: 'Are you sure?',
			text: 'You are about to submit the form.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, submit it!',
			cancelButtonText: 'No, cancel!',
		}).then((result) => {
			if (result.isConfirmed) {
				handleSubmit(e);
			}
		});
	};

	return (
		<>
			<Container title="Goods Release" className="">
				<div className="p-8 rounded-xl bg-white">
					<div className="flex flex-col lg:flex-row justify-end items-end mb-4">
						<div className="flex flex-1 flex-col"></div>
						<div className="flex"></div>
					</div>

					<form onSubmit={confirmSubmit} className="p-4">
						<div className="mb-4">
							{/* First Row: Supplier and Date */}
							<div className="flex items-center space-x-4">
								{/* Supplier Select */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Supplier</label>
									<Select
										options={supplierOptions}
										value={selectedSupplier}
										onChange={setSelectedSupplier}
										className="mt-1"
									/>
								</div>

								{/* Warehouse Select */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Warehouse</label>
									<Select
										options={warehouseOptions}
										value={selectedWarehouse}
										onChange={setSelectedWarehouse}
										className="mt-1"
									/>
								</div>

								{/* Date Picker */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Date</label>
									<DatePicker
										selected={selectedDate}
										onChange={setSelectedDate}
										className="mt-1 p-2 border rounded"
									/>
								</div>
							</div>

							{/* Second Row: Notes */}
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700">Notes</label>
								<textarea
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									className="mt-1 p-2 w-full border rounded-md resize-none"
									rows={3}
									placeholder="Enter notes..."
								/>
							</div>
						</div>

						{/* Product List */}
						{productList.map((product, index) => (
							<div key={index} className="mb-4 flex items-center space-x-4">
								{/* Product Select */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Product</label>
									<Select
										options={productOptions}
										value={productOptions.find((option) => option.value === product.productID)}
										onChange={(selectedOption) => handleProductChange(index, selectedOption)}
										className="mt-1"
									/>
								</div>

								{/* Box Quantity */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Box</label>
									<input
										type="number"
										value={product.boxQty}
										onChange={(e) => handleBoxChange(index, e.target.value)}
										className="mt-1 p-2 border rounded w-full"
									/>
								</div>

								{/* Pieces Quantity */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700">Pcs</label>
									<input
										type="number"
										value={product.pcs}
										onChange={(e) => handlePcsChange(index, e.target.value)}
										className="mt-1 p-2 border rounded w-full"
									/>
								</div>

								{/* Delete Button */}
								<button
									type="button"
									onClick={() => handleDeleteRow(index)}
									className="mt-6 p-2 bg-red-500 text-white rounded"
								>
									Delete
								</button>
							</div>
						))}

						{/* Add More Button */}
						<div className="flex justify-center space-x-4 mb-4">
							<button
								type="button"
								onClick={handleAddRow}
								className="p-2 bg-blue-500 text-white rounded"
							>
								Add More
							</button>
						</div>

						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

						{/* Submit Button */}
						<div className="flex justify-center space-x-4 mb-4">
							<button
								type="submit"
								className="p-2 bg-green-500 text-white rounded"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</Container>
		</>
	);
};

export default ListProductPage;
