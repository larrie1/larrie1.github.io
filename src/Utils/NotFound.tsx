import { SvgIcon, Box } from '@mui/material'
import { ReactComponent as NotFoundSvg } from '../Assets/undraw_page_not_found.svg'

export function NotFound() {
    return (
        <Box
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                display: 'flex',
                flex: 1,
                height: 'calc(100vh - 200px)'
            }} >
            <SvgIcon
                component={NotFoundSvg}
                inheritViewBox
                sx={{
                    width: '50vw',
                    height: '50vh',
                    mt: '100px',
                    flex: 1,
                    zIndex: '-1',
                }} />
        </Box>
    )
}