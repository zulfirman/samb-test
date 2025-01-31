"use client";

import { APIGetAllPagination, Option } from "@/types/common";
import { useEffect, useState } from "react";
import SelectInput from "../SelectInput";

type PaginationProps = {
	showPagination?: boolean;
	limits: Option[];
	limit: number;
	onChangeLimit?: (item: { [key: string]: any }) => void;
	pagination: APIGetAllPagination;
	onClickNextPage?: (page?: number) => void;
}

const Pagination = ({ showPagination = false, limit, limits, onChangeLimit, pagination, onClickNextPage }: PaginationProps) => {
	const [pages, setPages] = useState<number[]>([]);

	const onClickPage = (page: number) => {
		return () => {
			if (page == 0) return;

			if (onClickNextPage) {
				onClickNextPage(page);
			}
		}
	}

	useEffect(() => {
		const setNewPages = () => {
			const newPages = [];
			const minPages = Math.max(pagination.totalPages, 1)

			if (minPages < 5) {
				for (let i = 1; i <= minPages; i++) {
					newPages.push(i)
				}

				setPages(newPages)
				return;
			}

			if (pagination.currentPage == 1) {
				setPages([1,2,3,4,5])
				return;
			}

			if (pagination.currentPage == minPages) {
				for (let i = minPages - 4; i <= minPages; i++) {
					newPages.push(i);
				}

				setPages(newPages)
				return;
			}

			if (minPages < 5) {
				for (let i = 1; i <= Math.min(5, minPages); i++) {
					newPages.push(i)
				}

				setPages(newPages)
				return;
			}

			if (pagination.currentPage == minPages - 1) {
				newPages.push(pagination.currentPage - 3)
			}

			if (pagination.currentPage == 2) {
				newPages.push(1);
			} else if ((pagination.currentPage - 2) > 0) {
				newPages.push(pagination.currentPage - 2)
				newPages.push(pagination.currentPage - 1)
			}

			newPages.push(pagination.currentPage);

			if (pagination.currentPage == minPages - 1) {
				newPages.push(minPages);
			} else if ((pagination.currentPage + 2) <= pagination.totalPages) {
				newPages.push(pagination.currentPage + 1)
				newPages.push(pagination.currentPage + 2)
			}

			if (pagination.currentPage == 2) {
				newPages.push(pagination.currentPage + 3)
			}

			// console.log(newPages);

			console.log(newPages)

			setPages(newPages);
		}

		setNewPages()
	}, [pagination])

	if (!showPagination) {
		return null
	}
	
	return (
		<div className="flex relative mt-8 items-end text-metalic-silver w-full justify-end flex-col lg:flex-row">
			<div className="flex">
				<div 
					className="h-10 w-10 flex justify-center items-center rounded-lg bg-transparent text-blue-grey-900 font-normal hover:bg-blue-grey-100 cursor-pointer"
					onClick={onClickPage(pagination.currentPage == 1 ? 0 : pagination.currentPage - 1)}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.22 12.72C8.07931 12.5795 8.00018 12.3888 8 12.19V11.81C8.0023 11.6116 8.08112 11.4217 8.22 11.28L13.36 6.14997C13.4539 6.05532 13.5817 6.00208 13.715 6.00208C13.8483 6.00208 13.9761 6.05532 14.07 6.14997L14.78 6.85997C14.8741 6.95214 14.9271 7.07828 14.9271 7.20997C14.9271 7.34166 14.8741 7.46781 14.78 7.55997L10.33 12L14.78 16.44C14.8747 16.5339 14.9279 16.6617 14.9279 16.795C14.9279 16.9283 14.8747 17.0561 14.78 17.15L14.07 17.85C13.9761 17.9446 13.8483 17.9979 13.715 17.9979C13.5817 17.9979 13.4539 17.9446 13.36 17.85L8.22 12.72Z"
							fill="#A3AED0"
						/>
					</svg>
				</div>

				{pagination.totalPages > 5 && pagination.currentPage > 3 ? (
					<div
						className={`h-10 w-10 ml-2 flex justify-center items-center rounded-lg text-[14px] ${
							"bg-transparent text-blue-grey-900 font-normal hover:bg-blue-grey-100"
						} select-none`}
					>
						...
					</div>	
				) : <div/>}
				{pages.map((val, i) => {
					return (
						<div
							key={i}
							className={`h-10 w-10 ml-2 flex justify-center items-center rounded-lg text-[14px] ${
								val == pagination.currentPage
									? "bg-primary-500 text-white font-bold"
									: "bg-transparent text-blue-grey-900 font-normal hover:bg-blue-grey-100"
							} cursor-pointer`}
							onClick={onClickPage(pagination.currentPage == val ? 0 : val)}
						>
							{val}
						</div>
					);
				})}
				{pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 ? (
					<div
						className={`h-10 w-10 ml-2 flex justify-center items-center rounded-lg text-[14px] ${
							"bg-transparent text-blue-grey-900 font-normal hover:bg-blue-grey-100"
						} select-none`}
					>
						...
					</div>	
				) : <div/>}
				<div 
					className="h-10 w-10 flex justify-center items-center rounded-lg bg-transparent text-blue-grey-900 font-normal hover:bg-blue-grey-100 cursor-pointer ml-2"
					onClick={onClickPage(pagination.currentPage == pagination.totalPages ? 0 : pagination.currentPage + 1)}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.78 12.72C15.9207 12.5795 15.9998 12.3888 16 12.19V11.81C15.9977 11.6116 15.9189 11.4217 15.78 11.28L10.64 6.14997C10.5461 6.05532 10.4183 6.00208 10.285 6.00208C10.1517 6.00208 10.0239 6.05532 9.93 6.14997L9.22 6.85997C9.12594 6.95214 9.07293 7.07828 9.07293 7.20997C9.07293 7.34166 9.12594 7.46781 9.22 7.55997L13.67 12L9.22 16.44C9.12534 16.5339 9.0721 16.6617 9.0721 16.795C9.0721 16.9283 9.12534 17.0561 9.22 17.15L9.93 17.85C10.0239 17.9446 10.1517 17.9979 10.285 17.9979C10.4183 17.9979 10.5461 17.9446 10.64 17.85L15.78 12.72Z"
							fill="#A3AED0"
						/>
					</svg>
				</div>
			</div>
			<SelectInput
				name="limit"
				data={limits}
				containerClassName="w-[146px] ml-2"
				value={{ label: limit + " per page", value: limit }}
				onChange={onChangeLimit}
			/>
			{/* <div className="h-10 border-[1px] border-blue-grey-700 px-[14px] ml-4 flex items-center overflow-hidden rounded-lg cursor-pointer text-dark-grey-500 text-[14px] mt-3 lg:mt-0">
				10 per page
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="ml-2"
				>
					<path
						d="M5 7.5L10 12.5L15 7.5"
						stroke="#4D4D4D"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div> */}
		</div>
	)
}

export default Pagination;
