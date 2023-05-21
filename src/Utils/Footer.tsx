import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { localizedStrings } from '../Res'

/**
 *  This Method creates a Footer which displays Basic information about the Developer.
 * 
 *  @returns UI representation of the Footer that is shown across all the Pages
 */
export function Footer() {
    return (
        <Box
            sx={{
                bottom: 0,
                right: 0,
                left: 0,
                borderTop: 1,
                height: '100px',
                borderColor: 'secondary.dark',
                display: 'flex',
                alignItems: 'center',
                mt: 2,
            }}>
            <Container maxWidth='xl' sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Typography
                    variant='body2'
                    color='grey.600'
                    sx={{ flex: 1 }}>
                    {localizedStrings.footer}
                </Typography>
                <Box>
                    <IconButton href='https://github.com/larrie1'>
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href=''>
                        <InstagramIcon />
                    </IconButton>
                    <IconButton href=''>
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    )
}
