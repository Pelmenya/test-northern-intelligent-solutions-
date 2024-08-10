import { FormControl, MenuItem, Select } from "@mui/material";

export type TSelectRowsProps = {
    value: number;
    handleSelect: () => void;
}
export const SelectRows = ({value, handleSelect }: TSelectRowsProps) => {


    return (
            <Select
                variant="standard"
                id="select-rows"
                value={value}
                onChange={handleSelect}
                disableUnderline
                sx={{
                    '& #select-rows':{
                        fontSize: '12px',
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: '16px'
                    }
                }}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
            </Select>
    );
};
