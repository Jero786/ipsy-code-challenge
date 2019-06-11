/**
 * Simple contract of output formatter
 */
export interface FormatterField {
    name: string;
    innerFields?: FormatterField[]; // if undefined is a leaf
}

/**
 * Create a object which only will contain the fields allowed.
 * @param item
 * @param {FormatterField[]} formatterFields
 * @returns {any}
 */
export const formatterItem = (item, formatterFields: FormatterField[] = []) => {
    return formatterFields.reduce((newFormatterItem, formatterField) => {
        const attributeValue = item[formatterField.name];
        if (attributeValue && formatterField.innerFields) {
            newFormatterItem[formatterField.name] = formatterItem(attributeValue, formatterField.innerFields);
        } else if (attributeValue) {
            newFormatterItem[formatterField.name] = attributeValue;
        }
        return newFormatterItem;
    }, {});
};
