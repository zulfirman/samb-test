import { useState } from "react";

export function useCheckboxValueSelectInput<V, AV>(defValues: V, defActiveValues: AV) {
	const [values, setValues] = useState(defValues);
	const [activeValues, setActiveValues] = useState(defActiveValues);

	return [values, setValues, activeValues, setActiveValues] as const;
}
