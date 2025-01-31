const messages = {
	errors: {
		required: (field: string | undefined = "Field") => `${field} is required.`,
		email: () => "Format email is invalid."
	}
}

export default messages;
