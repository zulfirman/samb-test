import { APIResponse, Option } from "@/types/common";

export type Stock = {
	id: number
	productID: number
	boxQty: number
	pcs: number
	warehouseID: number
	createdAt: string
	createdBy: number
	updatedAt: string
	updatedBy: number
	product: Product
	warehouse: Warehouse
}

export type Product = {
	id: number
	productName: string
	createdAt: string
	createdBy: number
	updatedAt: string
	updatedBy: number
}

export type Warehouse = {
	id: number
	warehouseName: string
	createdAt: string
	createdBy: number
	updatedAt: string
	updatedBy: number
}

export type Productss = {
	id: number;
	departmentCode: number;
	productGroup: string;
	variation: string;
	category: string;
	productCode: number;
	productName: string;
	image: string;
	length: number;
	width: number;
	height: number;
	unitCost: number;
	unitPrice: number;
	beginningStock: number;
	lastStock: number;
	lastOrdered: string;
	reorderPoint: number;
	reorderVolume: number;
	deliveryFrequencyPerWeek: number;
	lifetimeStock: number;
	leadTimeDays: number;
	nextOrderRecommendation: string;
	inventoryTurnOver: number;
	salesAmount: number;
	salesVolume: number;
	totalProfitLoss: number;
	nextWeekSalesVolumeForecast: number;
	accuracy: number;
	hypothesisTesting: number;
	pvalue: number;
	mae: number;
	gmroiLastMonth: number;
	gmroiLast3Month: number;
	gmroiLast6Month: number;
	discount: string;
	removedFromStock: string;
	keyword: string;
	createdAt: string;
	createdBy: number;
	updatedAt: string;
	updatedBy: number;
}

export const defaultResponse: APIResponse = {
	code: 200,
	content: {},
	others: {},
	path: "",
	status: "OK"
}

export const listDepartment: Option[] = [
	{
		label: "4",
		value: 4,
		checked: true,
	},
	{
		label: "Select all",
		value: 0,
		checked: true,
	},
];

export const listSort: Option[] = [
	{
		label: "Product A-Z",
		value: 1,
	},
	{
		label: "Product Z-A",
		value: 0,
	},
];

export const listPeriod: Option[] = [
	{
		label: "1 month",
		value: 1,
	},
	{
		label: "3 month",
		value: 3,
	},
	{
		label: "6 month",
		value: 6,
	},
	{
		label: "1 year",
		value: 12,
	},
];

export const listCategory: Option[] = [
	{
		label: "1. 基礎調味料",
		value: 1,
		checked: true,
	},
	// {
	// 	label: "Category 2",
	// 	value: 2,
	// 	checked: false,
	// },
	// {
	// 	label: "Category 3",
	// 	value: 3,
	// 	checked: false,
	// },
	{
		label: "Select all",
		value: 0,
		checked: true,
	},
];

export const listSubcategory: Option[] = [
	{
		label: "Sub category 1",
		value: 1,
		checked: false,
	},
	{
		label: "Sub category 2",
		value: 2,
		checked: false,
	},
	{
		label: "Sub category 3",
		value: 3,
		checked: false,
	},
	{
		label: "Select all",
		value: -1,
		checked: false,
	},
];


export const defaultStartingPositions: { [key: number]: { [key: number]: number[] } } = {
	1: {
		1: [-0.502, 1.687, -5.788],
		2: [-0.502, 1.316, -5.788],
		3: [-0.502, 0.915, -5.788],
		4: [-0.502, 0.527, -5.788],
		5: [-0.617, 0.052, -5.788],
	},
	2: {
		1: [0.5, 1.687, 5.787],
		2: [0.5, 1.316, 5.787],
		3: [0.5, 0.915, 5.787],
		4: [0.5, 0.527, 5.787],
		5: [0.622, 0.052, 5.787],
	},
};
