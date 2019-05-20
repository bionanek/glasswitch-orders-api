const { InvalidQueryParamsError } = require("@helpers/errors");

class URLQueryValidation {
	static ValidateQueryFieldsHaveCorrectValues(query, queryModel) {
		let invalidFields = {};
		for (const field in query) {
			if (queryModel[field] === "number") {
				if (isNaN(query[field])) {
					invalidFields[field] = queryModel[field];
				}
			} else if (typeof queryModel[field] === "object") {
				const dictionary = queryModel[field];

				if (!Object.values(dictionary).includes(query[field])) {
					invalidFields[field] = queryModel[field];
				}
			}
		}

		if (Object.keys(invalidFields).length) {
			const invalidFieldsJson = JSON.stringify(invalidFields);
			throw new InvalidQueryParamsError(
				`Query contains parameters of wrong types. Expected types for invalid field/s: ${invalidFieldsJson}`
			);
		}
	}

	static ValidateRequiredQueryFieldsExist(query, queryModel) {
		let missingFields = [];
		for (const field in queryModel) {
			if (query[field] === undefined || query[field] === null) {
				missingFields.push(field);
			}
		}

		if (missingFields.length > 0) {
			throw new InvalidQueryParamsError(
				`Query is missing field/s: [${missingFields.join(", ")}]`
			);
		}
	}
}

module.exports = {
	URLQueryValidation
};
