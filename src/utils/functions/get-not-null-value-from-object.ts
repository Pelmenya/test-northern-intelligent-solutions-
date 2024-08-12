import { TSortFieldDirection } from "../../types/t-sort-field-direction";
import { TSorts } from "../../types/t-sorts";

export const getNotNullValueFromObject = (sorts: TSorts): TSortFieldDirection => Object.values(sorts).filter((item) => item !== null)[0];

