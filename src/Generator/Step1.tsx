import { Card, Typography, TextField } from "@mui/material"
import { localizedStrings } from "../Res/localization"
import { Headline } from "../Utils"
import { scaleInVerTop } from "../Utils/animations"

/**
 * 
 * @param props 
 * @returns 
 */
 export function Step1(props: {
    target: string,
    setTarget: any
}) {
    return (
        <Card
            sx={{
                animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                mt: 2,
                px: 2,
                pb: 2,
            }}>
            <Headline
                variant={"h6"}
                text={localizedStrings.decision} />
            <Typography sx={{ ml: 1 }}>
                {localizedStrings.generator_step1}
            </Typography>
            <TextField
                sx={{
                    m: 5,
                    display: 'flex',
                }}
                value={props.target}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setTarget(event.target.value)
                }}
                size='small'
                label={localizedStrings.target}
                variant="outlined" />
        </Card>
    )
}