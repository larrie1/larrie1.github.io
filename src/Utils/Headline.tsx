import { Box, Typography } from "@mui/material"
import { scaleInHorLeft } from "./animations"

/**
 *  This Method creates a Headline with different Fontsizes based on the user input. 
 *  It will create a Basic Text that will be underlined by a thic box. 
 * 
 *  @param props variant: Containing a string with one of the possible Variants provider by MUI
 *               text: containing the actual Text that should be displayed as the Headline       
 *  @returns     UI represtation of the Headline
 */
export function Headline(props: { variant: any, text: string }) {
    return (
        <Box sx={{
            display: 'inline-flex',
            position: 'relative',
            m: 1,
        }}>
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                    position: 'absolute',
                    bottom: 0,
                    height: '50%',
                    width: '100%',
                    zIndex: 1,
                }} />
            <Typography variant={props.variant} sx={{ px: .5, zIndex: 2 }}>
                {props.text}
            </Typography>
        </Box>
    )
}
