import { SidebarItemProps } from "@/types/common";
import ListProductIcon from "@/components/icons/ListProductIcon";
import StockProductIcon from "@/components/icons/StockProductIcon";
import ColumnIcon from "@/components/icons/ColumnIcon";

export const sidebarItems: SidebarItemProps[] = [
	{
		name: "goods-receipt",
		href: "/goods-receipt",
		title: "Goods receipt",
		Icon: ListProductIcon
	},
	{
		name: "goods-release",
		href: "/goods-release",
		title: "Goods Release",
		Icon: StockProductIcon
	},
	{
		name: "product-stocks",
		href: "/product-stocks",
		title: "Product Stocks",
		Icon: StockProductIcon
	}
];
