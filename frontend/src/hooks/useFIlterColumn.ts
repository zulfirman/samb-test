import { Option } from "@/types/common";
import { Column, ColumnDef } from "@tanstack/react-table";
import { useCheckboxValueSelectInput } from "./useCheckboxValueSelectInput";

export function useFilterColumn(columns: ColumnDef<any, any>[], columnLeaf: Column<any, unknown>[]) {
	const columnOpts = columns
		.filter((col) => col.id != "id")
		.map((col) => ({
			label: col.header! as string,
			value: (col as any).accessorKey
				? (col as any).accessorKey
				: col.id!,
			checked: true,
		}));
	const activeColumnOpts = columnOpts.map((col) => col.value);

	const [filterColumn, setFilterColumn] = useCheckboxValueSelectInput(
		columnOpts,
		activeColumnOpts
	);

	const onChangeFilterColumn = (newValue: Option) => {
		const newFilterColumn = filterColumn.map((col) => ({
			...col,
			checked: col.value == newValue.value ? !col.checked : col.checked,
		}));

		const findFilterColumn = columnLeaf.find(
			(col) => col.id == newValue.value
		);

		if (findFilterColumn) {
			findFilterColumn.toggleVisibility();
		}

		setFilterColumn(newFilterColumn);
	};

	return {
		filterColumn,
		setFilterColumn,
		columnOpts,
		activeColumnOpts,
		onChangeFilterColumn
	}
}
