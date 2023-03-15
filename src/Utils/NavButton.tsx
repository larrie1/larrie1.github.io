import { Button, Link, Typography } from '@mui/material';

export function NavButton(props: { page: String }) {
    return (
        <Button
            variant='outlined'
            sx={{
                borderRadius: 25,
                borderColor: 'primary',
                color: 'white',
                backgroundColor: 'transparent',
                mx: 1,
            }}>
                <Link 
                href={props.page === 'Start' ? '/' : `/${props.page.toLowerCase()}`}
                underline='none'>
                    {props.page}
                </Link>
        </Button>
    );
}
