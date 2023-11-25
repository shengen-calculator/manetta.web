const headCells: HeadCell[] = [
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'account',
        numeric: false,
        disablePadding: false,
        label: 'Account',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'docNumber',
        numeric: true,
        disablePadding: false,
        label: 'Doc Number',
    },
    {
        id: 'sum',
        numeric: true,
        disablePadding: false,
        label: 'Sum',
    },
    {
        id: 'equivalent',
        numeric: true,
        disablePadding: false,
        label: 'EURO',
    },
    {
        id: 'balance',
        numeric: true,
        disablePadding: false,
        label: 'Balance',
    },
];

export default headCells
