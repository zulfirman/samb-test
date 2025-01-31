import SearchIcon from "./icons/SearchIcon";

const SearchInput = () => {
	return (
		<div className="flex items-center border-[1px] border-blue-grey-700 max-w-[300px] w-full overflow-hidden rounded-lg transition-all focus-within:border-[rgba(33,90,255,1)]">
			<input
				id="keyword"
				className="h-10 pl-[14px] w-full outline-none placeholder:text-[14px]"
				placeholder="Search here"
				type="text"
				name="keyword"
			/>
			<label htmlFor="keyword">
				<div className="px-3 cursor-pointer">
					<SearchIcon className="stroke-[#A3AED0]" />
				</div>
			</label>
		</div>
	);
};

export default SearchInput;
