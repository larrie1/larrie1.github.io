import { Typography, Box, SvgIcon, Card, CardActionArea, CardContent, Button } from '@mui/material'
import { useRef } from 'react'
import { leftIn, pause_between_iterations, slideInTop, wobbleHorBottom } from '../../Utils/animations'
import { Headline } from '../../Utils/Headline'
import { ReactComponent as ArrowSvg } from '../../Res/Assets/undraw_arrow.svg'
import { ReactComponent as LearnSvg } from '../../Res/Assets/undraw_bibliophile.svg'
import { ReactComponent as GameSvg } from '../../Res/Assets/undraw_gaming.svg'
import { ReactComponent as BuildSvg } from '../../Res/Assets/undraw_building_blocks.svg'
import { localizedStrings, blockly1, block3, block5, block4 } from '../../Res'

/**
 *  This Method creates the Start Page. It contains a Block Background and some Information about the Topic.
 * 
 *  @returns UI representation of the Start Page
 */
export function Start() {
  const myRef = useRef<HTMLElement>(null)
  const machineLearningRef = useRef<HTMLElement>(null)
  const decisionTreeRef = useRef<HTMLElement>(null)
  const splitsRef = useRef<HTMLElement>(null)
  const informationGainRef = useRef<HTMLElement>(null)
  const scrollToDecide = () => myRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToMachineLearning = () => machineLearningRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToDecisionTree = () => decisionTreeRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToSplits = () => splitsRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToInformationGain = () => informationGainRef?.current?.scrollIntoView({ behavior: "smooth" })

  return (
    <>
      {/* Landing Screen */}
      <Box sx={{
        display: 'flex',
        height: `calc(100vh - 64px)`,
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <Typography
          variant='h1'
          letterSpacing={'6px'}
          sx={{
            animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`,
          }}>
          {localizedStrings.title}
        </Typography>
        <Typography
          variant='h3'
          letterSpacing={'6px'}
          sx={{
            animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`,
          }}>
          {localizedStrings.subtitle}
        </Typography>
        <Box
          component='img'
          alt='Blockly Block Example'
          src={blockly1}
          sx={{
            animation: `${slideInTop} 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            width: '800px',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' },
            zIndex: '-2',
            right: 0,
            top: 100,
          }} />
        <Box
          component='img'
          alt='Blockly Block Example'
          src={block5}
          sx={{
            animation: `${slideInTop} 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            width: '600px',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' },
            zIndex: '-2',
            top: -50,
            left: 350,
          }} />
        <Box
          component='img'
          alt='Blockly Block Example'
          src={block4}
          sx={{
            animation: `${slideInTop} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            width: '350px',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' },
            zIndex: '-2',
            top: 50,
            right: 0,
          }} />
        <Box
          component='img'
          alt='Blockly Block Example'
          src={block3}
          sx={{
            animation: `${slideInTop} 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            width: '800px',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' },
            zIndex: '-2',
            bottom: 0,
            left: 0,
          }} />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backdropFilter: `blur(5px)`,
            zIndex: -1,
          }} />
        <SvgIcon
          component={ArrowSvg}
          inheritViewBox
          onClick={scrollToDecide}
          sx={{
            position: 'absolute',
            bottom: '0',
            margin: '50px',
            transfrom: 'rotate(180deg)',
            width: '3em',
            height: '3em',
            alignSelf: 'center',
            cursor: 'pointer',
            filter: `brightness(80%)`,
            animation: `${wobbleHorBottom} 0.8s infinite, ${pause_between_iterations} 4s infinite`,
            scrollBehavior: 'smooth',
            '&:hover': {
              filter: `brightness(100%)`,
            }
          }} />
      </Box>

      {/* Decision Section */}
      <Box ref={myRef} sx={{ scrollMarginTop: '64px' }}>
        <Headline
          variant={'h3'}
          text={localizedStrings.decide}
        />
        <Typography>
          {localizedStrings.start}
        </Typography>
      </Box>
      <Box sx={{
        my: 10,
        mx: 5,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',
      }}>
        <ExtendableCard
          title={localizedStrings.info}
          description={localizedStrings.start_start}
          img={LearnSvg}
          onClick={scrollToMachineLearning} />
        <ExtendableCard
          title={localizedStrings.game}
          description={localizedStrings.start_game}
          img={GameSvg}
          href={'/#/game'} />
        <ExtendableCard
          title={localizedStrings.generator}
          description={localizedStrings.start_generator}
          img={BuildSvg}
          href={'/#/generator'} />
      </Box>

      {/* Divider */}
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'secondary.dark',
          scrollMarginTop: '64px',
        }} />

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>

        {/* Table of Contents */}
        <Box sx={{
          pt: '64px',
          height: '100%',
          position: 'sticky',
          top: 0,
        }}>
          <Headline
            variant={'h4'}
            text={localizedStrings.table_content}
          />
          <Button
            onClick={scrollToMachineLearning}
            sx={{ display: 'flex' }}
          >
            <Typography noWrap>
              {localizedStrings.machine_learning}
            </Typography>
          </Button>
          <Button
            onClick={scrollToDecisionTree}
            sx={{ display: 'flex' }}
          >
            <Typography noWrap>
              {localizedStrings.decision_tree}
            </Typography>
          </Button>
          <Button
            onClick={scrollToSplits}
            sx={{ display: 'flex' }}
          >
            <Typography noWrap>
              {localizedStrings.splits}
            </Typography>
          </Button>
          <Button
            onClick={scrollToInformationGain}
            sx={{ display: 'flex' }}
          >
            <Typography noWrap>
              {localizedStrings.information_gain}
            </Typography>
          </Button>
        </Box>

        {/* Actual content */}
        <Box sx={{
          pt: '64px',
          ml: 3,
          pl: 3,
          borderLeft: 1,
          borderColor: 'secondary.dark',
        }}>
          <Box
            ref={machineLearningRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.machine_learning}
            />
            <Typography
              variant='body1'
              sx={{ mb: 5 }}
            >
              {localizedStrings.start_machine_learning}
            </Typography>
          </Box>
          <Box
            ref={decisionTreeRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.decision_tree}
            />
            <Typography
              variant='body1'
              sx={{ mb: 5 }}
            >
              {localizedStrings.start_decision_trees}
            </Typography>
          </Box>
          <Box
            ref={splitsRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.splits}
            />
            <Typography
              variant='body1'
              sx={{ mb: 5 }}
            >
              {localizedStrings.start_splits}
            </Typography>
          </Box>
          <Box
            ref={informationGainRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.information_gain}
            />
            <Typography
              variant='body1'
              sx={{ mb: 5 }}
            >
              {localizedStrings.start_information_gain}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

/**
 *  This Method creates a Card that has a expandable Content that becomes visible when hovering over the Card.
 * 
 *  @param props title: Title of the Card.
 *               description: Description of the Card.
 *               img: Image that will be displayed. Needs to be an SVG React Component. 
 *               href: The Route where this Card will navigate to when clicked. 
 *               onClick: An onClick function that will get triggered when clicking the card.
 *  @returns     UI representation of a Card which has a expandable Content
 */
function ExtendableCard(
  props: {
    title: string,
    description: string,
    img: any,
    href?: string,
    onClick?: () => void,
  }
) {
  return (
    <Card sx={{
      width: '20vw',
      height: '255px',
      overflow: 'auto',
      transition: "transform 0.15s ease-in-out, height 300ms ease-in-out",
      "&:hover": { transform: "scale3d(1.1, 1.1, 1)", height: '450px' },
    }}>
      <div onClick={props.onClick ?? undefined}>
        <CardActionArea
          href={props.href ?? ''}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}>
          <SvgIcon
            component={props.img}
            inheritViewBox
            sx={{
              alignSelf: 'center',
              width: '100%',
              height: '200px',
            }} />
        </CardActionArea>
        <CardContent>
          <Headline variant="h5" text={props.title} />
          <Typography variant="body2">
            {props.description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
