import { Box, Container, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'

export function Headline(props: {variant: any, text: string}) {
    const theme = useTheme()

    return(
        <Box sx={{display: 'inline-flex', position: 'relative', m: 1}}>
            <Box 
            bgcolor={theme.palette.primary.main}
            sx={{
                position: 'absolute',
                bottom: 0,
                height: '50%',
                width: '100%',
                zIndex: -1,
            }}/>
            <Typography variant={props.variant} sx={{px: .5}}>
                {props.text}
            </Typography>
        </Box>
    )
}