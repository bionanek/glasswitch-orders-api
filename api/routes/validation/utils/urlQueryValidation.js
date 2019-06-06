const { InvalidQueryParamsError } = require("@helpers/errors");

class URLQueryValidation {
	static Validate(query, queryModel) {
		URLQueryValidation.ValidateQueryObject(query);
		URLQueryValidation.ValidateRequiredQueryFieldsExist(query, queryModel);
		URLQueryValidation.ValidateQueryFieldsHaveCorrectValues(query, queryModel);
	}

	static ValidateQueryObject(query) {
		if (!query) {
			throw new InvalidQueryParamsError("URLQuery cannot be empty.");
		}
	}

	static ValidateQueryFieldsHaveCorrectValues(query, queryModel) {
		const validationResult = URLQueryValidation.ValidateQueryValues(
			query,
			queryModel
		);

		if (!validationResult.isValid) {
			const invalidFieldsJson = JSON.stringify(validationResult.invalidFields);
			throw new InvalidQueryParamsError(
				`Query contains parameters of wrong types. Expected types for invalid field/s: ${invalidFieldsJson}`
			);
		}
	}

	static ValidateQueryValues(query, queryModel) {
		let invalidFields = {};
		for (const field in query) {
			if (queryModel[field] === "number" && isNaN(query[field])) {
				invalidFields[field] = queryModel[field];
			} else if (typeof queryModel[field] === "object") {
				const allowedValues = Object.values(queryModel[field]);

				if (!allowedValues.includes(query[field])) {
					invalidFields[field] = queryModel[field];
				}
			}
		}

		return {
			isValid: Object.keys(invalidFields).length === 0,
			invalidFields: invalidFields
		};
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
