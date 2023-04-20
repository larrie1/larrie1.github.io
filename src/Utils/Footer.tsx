import { Box, Container, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { strings } from '../Res/localization';

export function Footer() {
    const theme = useTheme()

    return (
        <Box
            sx={{
                bottom: 0,
                right: 0,
                left: 0,
                borderTop: 1,
                borderColor: theme.palette.secondary.dark,
                mt: 10,
                p: 5,
                zIndex: 99,
            }}>
            <Container maxWidth='xl' sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Typography variant='body2' color='grey.600' sx={{flex: 1}}>
                    {strings.footer}
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