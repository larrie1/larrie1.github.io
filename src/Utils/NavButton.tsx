import { Button } from '@mui/material';

export function NavButton(props: { page: string, href: string, onClick: () => void, isActive: boolean}) {
    return (
        <Button
            variant={props.isActive ? 'contained' : 'outlined'}
            href={props.href}
            onClick={props.onClick}
            sx={{
                borderRadius: 25,
                borderColor: 'primary',
                backgroundColor: props.isActive ? 'primary' : 'transparent',
                mx: 1,
            }}>
                {props.page}
        </Button>
    );
}
