import { Box, Typography } from "@mui/material"
import { blockClean, localizedStrings, blockConnected, blockDecision, blockHighlightedChoices, blockHighlightedDecision, blockHighlightedLeftConnector, blockHighlightedPlus, blockHighlightedRightConnector } from '../../../Res'

/**
 *  This Method creates an array which holds all the Intro Pages.
 * 
 *  @returns Array holding all Intro Pages
 */
export const intros = () => [
    <Intro img={blockClean} description={localizedStrings.block_intro_1} />,
    <Intro img={blockHighlightedDecision} description={localizedStrings.block_intro_2} />,
    <Intro img={blockHighlightedChoices} description={localizedStrings.block_intro_3} />,
    <Intro img={blockHighlightedPlus} description={localizedStrings.block_intro_4} />,
    <Intro img={blockHighlightedLeftConnector} description={localizedStrings.block_intro_5} />,
    <Intro img={blockHighlightedRightConnector} description={localizedStrings.block_intro_6} />,
    <Intro img={blockDecision} description={localizedStrings.block_intro_7} />,
    <Intro img={blockConnected} description={localizedStrings.block_intro_8} />,
]

/**
 * This Method creates a step for the Intro. It just holds an image and a description of the respective step. 
 * 
 * @param img The Image which will be displayed to describe this step
 * @param description The Text wich will be displayed to describe this step
 * @returns UI representation of an Intro step
 */
function Intro(props: {img: any, description: string}) {
    return (
        <>
            <Box
                component='img'
                alt='Blockly Block Example'
                src={props.img}
                sx={{
                    mt: 7,
                    mb: 4,
                    mx: 'auto',
                    display: 'flex',
                    width: '60%',
                }} />
            <Box sx={{
                height: '1px',
                backgroundColor: 'secondary.dark',
                mx: 4,
                mb: 3,
            }} />
            <Typography
                variant={"body1"}
                sx={{ mb: 3, mx: 1 }}>
                {props.description}
            </Typography>
        </>
    )
}
