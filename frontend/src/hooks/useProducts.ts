import {defaultResponse, Product, Stock} from "@/app/(dashboard)/_configs/default-data";
import { getProducts as _getProducts } from "@/services/product";
import { APIListData, APIResponse } from "@/types/common";
import { useRouter } from "next/navigation";
import { useAPI } from "./useAPI";
import { ProductDescription } from "@/types/product";


export function useProducts(router: ReturnType<typeof useRouter>) {
	const getProductStock = async (data: any = {}, params: any = {}) => {
		try {
			const { page, search, sort, limit, warehouseId } = params;

			const req = await requestAPI(
				`/product-stock?warehouseID=${warehouseId}&page=${page}&sort=productName&asc=${sort}&search=${search}&limit=${limit}`,
				"get",
				{ data }
			);

			const res: APIResponse<APIListData<Stock[]>> = req.data;

			return res;
		} catch (err) {
			console.log("Error Get Product");
			return {
				code: 500,
				status: "Error",
				content: {
					data: [],
					pagination: {
						currentPage: 1,
						nextPage: 0,
						previousPage: 0,
						totalData: 0,
						totalPages: 0
					}
				},
				others: {},
				path: ""
			};
		}
	}

	const { requestAPI } = useAPI(router);

	return { getProductStock}
}
