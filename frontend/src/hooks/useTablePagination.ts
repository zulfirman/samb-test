import React from "react";

import useSWR from "swr";
import { APIGetAllPagination } from "@/types/common";

type ActiveParameters = {
	// pagination?: boolean;
	filter?: boolean;
	sorting?: boolean;
}

type DefaultFilter = {
	field: string;
	value: string;
}

type DefaultSorting = {
	field: string;
	asc: number;
}

type UsePaginationProps = {
	pagination: APIGetAllPagination;
	url: string;
	activeParams?: ActiveParameters;
	defaultData?: {
		sorting?: DefaultSorting;
		filter?: DefaultFilter;
	},
	fallbackDataSWR: any;
	extraParams?: string;
}

const defaultActiveParams: ActiveParameters = {
	// pagination: true,
	filter: true,
	sorting: true
}

const defaultFilter: DefaultFilter = {
	field: "email",
	value: ""
}

const defaultSorting: DefaultSorting = {
	field: "createdAt",
	asc: 0
}

const defaults = {
	filter: defaultFilter,
	sorting: defaultSorting
}

export function usePagination({
	activeParams = defaultActiveParams,
	defaultData = defaults,
	extraParams = "",
	pagination,
	url,
	fallbackDataSWR
}: UsePaginationProps) {
	const [page, setPage] = React.useState<number>(1);
	const [limit, setLimit] = React.useState<number>(10);

	const [sorting, setSorting] = React.useState<DefaultSorting>(defaultData.sorting ?? defaultSorting);
	const [filter, setFilter] = React.useState<DefaultFilter>(defaultData.filter ?? defaultFilter);
	const [tempFilter, setTempFilter] = React.useState<DefaultFilter>(defaultData.filter ?? defaultFilter);

	const { data, mutate, error } = useSWR(
		`${url}?page=${page}&limit=${limit}${activeParams.filter ? `&field=${filter.field}&search=${filter.value}` : ""}${activeParams.sorting ? `&sort=${sorting.field}&asc=${sorting.asc}` : ""}${extraParams}`,
		{ fallbackData: fallbackDataSWR }
	);

	const onChangeFilter = React.useCallback((newFilter: DefaultFilter) => {
		setTempFilter(newFilter);
	}, []);

	const onChangeLimit = React.useCallback((item: { [key: string]: any }) => {
		setLimit(item?.value || 0);
	}, []);

	const onChangeSort = (field: keyof typeof sorting) => {
		return (evt: React.ChangeEvent<HTMLSelectElement>) => {
			const value = evt.target.value;
			onChangeSorting({
				...sorting,
				[field]: value
			})
		}
	}

	const onChangeSorting = React.useCallback((newSorting: DefaultSorting) => {
		setSorting(newSorting);
	}, []);

	const onChangeTempFilter = React.useCallback((newTempFilter: DefaultFilter) => {
		setTempFilter(newTempFilter);
	}, []);

	const onClickNextPage = React.useCallback(() => {
		setPage(page + 1);
	}, [page]);

	const onClickPrevPage = React.useCallback(() => {
		setPage(page - 1);
	}, [page]);

	const onSetFilter = React.useCallback(() => {
		setPage(1);
		setFilter(tempFilter)
	}, [tempFilter]);

	return {
		data,
		error,
		filter,
		limit,
		mutate,
		page,
		sorting,
		tempFilter,

		setFilter,
		setPage,

		onChangeFilter,
		onChangeLimit,
		onChangeSort,
		onChangeSorting,
		onChangeTempFilter,
		onClickNextPage,
		onClickPrevPage,
		onSetFilter
	}
}
