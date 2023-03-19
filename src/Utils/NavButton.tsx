import { Button } from '@mui/material';

export function NavButton(props: { page: String }) {
    return (
        <Button
            variant='outlined'
            href={props.page === 'Start' ? '/#' : `/#/${props.page.toLowerCase()}`}
            sx={{
                borderRadius: 25,
                borderColor: 'primary',
                backgroundColor: 'transparent',
                mx: 1,
            }}>
                {props.page}
        </Button>
    );
}
