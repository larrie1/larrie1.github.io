import { Box, Typography } from "@mui/material"
import { strings } from "../Res/localization";
import blockHighlightedChoices from '../Assets/block_highlighted_choices.png'
import blockHighlightedDecision from '../Assets/block_highlighted_decision.png'
import blockHighlightedPlus from '../Assets/block_highlighted_plus.png'
import blockHighlightedRightConnectors from '../Assets/block_highlighted_right_connectors.png'
import blockHighlightedLeftConnector from '../Assets/block_highlighted_left_connector.png'

export const getIntros = () => [
    createIntro(blockHighlightedDecision, strings.block_intro_1),
    createIntro(blockHighlightedChoices, strings.block_intro_2),
    createIntro(blockHighlightedPlus, strings.block_intro_3),
    createIntro(blockHighlightedLeftConnector, strings.block_intro_3),
    createIntro(blockHighlightedRightConnectors, strings.block_intro_3),
]

function createIntro(img: any, description: string) {
    return (
        <>
            <Box
                component='img'
                alt='Blockly Block Example'
                src={img}
                sx={{
                    mt: 7,
                    mb: 4,
                    mx: 'auto',
                    display: 'flex',
                    width: '60%',
                }} />
                <Box sx={{height: '1px', backgroundColor: 'secondary.dark', mx: 4, mb: 3}} />
            <Typography variant={"body1"} sx={{ mb: 3, mx: 1 }}>
                {description}
            </Typography>
        </>
    )
}
