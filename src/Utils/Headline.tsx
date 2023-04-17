import { Box, Container, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { scaleInHorLeft } from "./animations";

export function Headline(props: {variant: any, text: string}) {
    const theme = useTheme()

    return(
        <Box sx={{ display: 'inline-flex', position: 'relative', m: 1}}>
            <Box 
            bgcolor={theme.palette.primary.main}
            sx={{
                animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                position: 'absolute',
                bottom: 0,
                height: '50%',
                width: '100%',
                zIndex: 1,
            }}/>
            <Typography variant={props.variant} sx={{px: .5, zIndex: 2}}>
                {props.text}
            </Typography>
        </Box>
    )
}