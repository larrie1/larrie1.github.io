import { Box, Typography } from "@mui/material"
import block2 from '../Assets/block2.png'
import block_plus from '../Assets/block_plus.png'
import block_decision from '../Assets/block_decision.png'
import { strings } from "../Res/localization";

export const getIntros = () => [
    createIntro(block2, strings.block_intro_1),
    createIntro(block_plus, strings.block_intro_2),
    createIntro(block_decision, strings.block_intro_3),
]

function createIntro(img: any, description: string) {
    return (
        <>
            <Box
                component='img'
                alt='Blockly Block Example'
                src={img}
                sx={{
                    mx: 'auto',
                    display: 'flex',
                    width: '100%',
                }} />
            <Typography variant={"body1"} sx={{ mb: 3 }}>
                {description}
            </Typography>
        </>
    )
}
