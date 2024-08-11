import { MouseEvent, useState } from 'react';
import { ButtonBase } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { TSortFieldDirection } from '../../../../types/t-sort-field-direction';

export type TTableSortCellProps = {
    id: string;
    fieldName: string;
    direction: TSortFieldDirection;
    handleOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const TableSortCell = ({
    id,
    fieldName,
    direction,
    handleOnClick,
}: TTableSortCellProps) => {
    const [arrowIsView, setArrowIsView] = useState(false);

    return (
        <ButtonBase
            id={id}
            onMouseOver={() => setArrowIsView(true)}
            onMouseLeave={() => setArrowIsView(false)}
            onClick={handleOnClick}
            sx={[
                {
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    color: 'text.secondary',
                    padding: '4px',
                    marginLeft: '-4px',
                    textTransform: 'initial',
                },
                {
                    '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                        borderRadius: '4px',
                    },
                },
            ]}
        >
            {(direction || arrowIsView) &&
                (direction?.split('-')[1] === 'desc' ? (
                    <ArrowUpwardIcon
                        sx={{
                            height: '20px',
                            width: '20px',
                            opacity: '.87',
                            marginLeft: '-4px',
                            transform: 'rotate(180deg)',
                        }}
                    />
                ) : (
                    <ArrowUpwardIcon
                        sx={{
                            height: '20px',
                            width: '20px',
                            opacity: '.87',
                            marginLeft: '-4px',
                        }}
                    />
                ))}

            {fieldName}
        </ButtonBase>
    );
};
