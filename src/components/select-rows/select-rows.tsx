import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { valuesRowsPerPage } from '../../utils/constants/values-rows-per-page';

export type TSelectRowsProps = {
    value: number;
    handleSelect: (e: SelectChangeEvent<number>) => void;
};
export const SelectRows = ({ value, handleSelect }: TSelectRowsProps) => {
    return (
        <Select
            variant="standard"
            id="select-rows"
            value={value}
            onChange={handleSelect}
            disableUnderline
            sx={{
                '& #select-rows': {
                    fontSize: '12px',
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: '24px',
                    marginTop: '2px',
                    color: 'text.secondary',
                    opacity: 1,
                    fontWeight: 500,
                },
            }}
        >
            {valuesRowsPerPage.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    );
};
