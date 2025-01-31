import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export type IconProps = {
	active?: boolean
}

export type SidebarItemProps = {
	name: string;
	href: string;
	title: string;
	Icon: (props: IconProps) => JSX.Element;
	items?: {
		title: string;
		href: string;
		name: string;
	}[]
}

export type APIResponse<Content = Record<string, any>> = {
	code: number;
	status: string;
	content: Content;
	others: Record<string, any>;
	path: string;
}

export type APIGetAllPagination = {
	currentPage: number;
	nextPage: number;
	previousPage: number;
	totalData: number;
	totalPages: number;
}

export type APIListData<Data = Record<string, any>[]> = {
	data: Data;
	pagination: APIGetAllPagination;
}

export type APICompareProducts = {
	shelfInformation: {
		id: number;
		shelfId: string;
		createdAt: string;
		createdBy: number;
		updatedAt: string;
		updatedBy: number;
	};
	itemPosition: {
		productId: number;
		shelfPosition: string;
		inCorrectPosition: boolean;
	}[]
}

export type APIShelfImage = {
	id: number
	name: string
	image: string
	createdAt: string
	createdBy: number
	updatedAt: string
	updatedAtBefore: string
	updatedBy: number
}


export type Option = {
	[key in string]: string | number | boolean;
};
