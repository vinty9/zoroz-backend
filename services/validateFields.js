export const validateFields = (fields) => {
  const missingFields = [];
  for (const [fieldName, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === "") {
      missingFields.push(fieldName);
    }
  }
  return missingFields.length > 0 ? missingFields : null;
};
