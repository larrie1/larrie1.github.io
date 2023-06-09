import '../../Blockly/tree/Tree.css'
import { Typography, Box, SvgIcon, Card, CardActionArea, CardContent, Button, Link } from '@mui/material'
import { useRef } from 'react'
import { leftIn, pause_between_iterations, slideInTop, wobbleHorBottom } from '../../Utils/animations'
import { Headline } from '../../Utils/Headline'
import { ReactComponent as ArrowSvg } from '../../Res/Assets/undraw_arrow.svg'
import { ReactComponent as LearnSvg } from '../../Res/Assets/undraw_bibliophile.svg'
import { ReactComponent as GameSvg } from '../../Res/Assets/undraw_gaming.svg'
import { ReactComponent as BuildSvg } from '../../Res/Assets/undraw_building_blocks.svg'
import { localizedStrings, blockly1, block3, block5, block4 } from '../../Res'
import { TableContext } from '../../context'
import { BasicTable, createTable } from '../../Utils/Table'
import { start_data } from '../../Res/data/tables'

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
  const entropyRef = useRef<HTMLElement>(null)
  const scrollToDecide = () => myRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToMachineLearning = () => machineLearningRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToDecisionTree = () => decisionTreeRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToSplits = () => splitsRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToInformationGain = () => informationGainRef?.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToEntropy = () => entropyRef?.current?.scrollIntoView({ behavior: "smooth" })

  const startData = start_data()
  const startTable = createTable(
    startData.data,
    startData.data,
    startData.target,
    startData.features,
    () => { }
  )

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
            animation: `${wobbleHorBottom} 0.8s infinite, ${pause_between_iterations} 4s infinite`,
            scrollBehavior: 'smooth',
            '&:hover': {
              filter: `brightness(80%)`,
            }
          }} />
      </Box>

      {/* Decision Section */}
      <Box ref={myRef} sx={{ scrollMarginTop: '64px' }}>
        <Headline
          variant={'h3'}
          text={localizedStrings.decide}
        />
        <Typography variant={'h6'}>
          {localizedStrings.start}
        </Typography>
      </Box>
      <Box sx={{
        my: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-around',
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
            onClick={scrollToEntropy}
            sx={{ display: 'flex' }}
          >
            <Typography noWrap>
              {localizedStrings.entropy}
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
              variant='h6'
              sx={{ mb: 5, textAlign: 'justify' }}
            >
              {localizedStrings.start_machine_learning}
            </Typography>
          </Box>
          <Box
            ref={decisionTreeRef}
            sx={{ scrollMarginTop: '64px', mb: 5 }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.decision_tree}
            />
            <Box sx={{ mb: 5, mr: 5 }}>
              <Box className={'tree'}>
                <ul>
                  <li>
                    <Link variant='h6'>{localizedStrings.root}</Link>
                    <ul>
                      <li>
                        <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                        <ul>
                          <li>
                            <Link variant='h6'>{localizedStrings.node}</Link>
                            <ul>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.leaf}</Link>
                                </ul>
                              </li>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.leaf}</Link>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                        <ul>
                          <li>
                            <Link variant='h6'>{localizedStrings.node}</Link>
                            <ul>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.leaf}</Link>
                                </ul>
                              </li>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.value}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.leaf}</Link>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Box>
            </Box>
            <Typography
              variant='h6'
              sx={{ textAlign: 'justify' }}
            >
              {localizedStrings.start_decision_trees1}
            </Typography>
            <Box sx={{ my: 2, display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant='h6'
                sx={{
                  flex: 1,
                  textAlign: 'justify'
                }}
              >
                {localizedStrings.start_decision_trees2}
              </Typography>
              <Box
                className={'tree'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Typography variant='h6' color='primary.main'>
                  Was soll ich heute anziehen?
                </Typography>
                <ul style={{ marginLeft: 5 }}>
                  <li>
                    <Link variant='h6'>{localizedStrings.start_tree_temperature}</Link>
                    <ul>
                      <li>
                        <Link className={'featureVal'} variant='h6'>{localizedStrings.cold}</Link>
                        <ul>
                          <li>
                            <Link variant='h6'>{localizedStrings.start_tree_rain}</Link>
                            <ul>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.yes}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.start_tree_leaf1}</Link>
                                </ul>
                              </li>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.no}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.start_tree_leaf2}</Link>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link className={'featureVal'} variant='h6'>{localizedStrings.warm}</Link>
                        <ul>
                          <li>
                            <Link variant='h6'>{localizedStrings.start_tree_windy}</Link>
                            <ul>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.yes}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.start_tree_leaf3}</Link>
                                </ul>
                              </li>
                              <li>
                                <Link className={'featureVal'} variant='h6'>{localizedStrings.no}</Link>
                                <ul>
                                  <Link variant='h6'>{localizedStrings.start_tree_leaf4}</Link>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
          <Box
            ref={splitsRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.splits}
            />
            <TableContext.Provider value={startTable}>
              <BasicTable showFooter={false} showResult={false} />
            </TableContext.Provider>
            <Typography
              variant='h6'
              sx={{ mb: 5, textAlign: 'justify' }}
            >
              {localizedStrings.start_splits}
            </Typography>
          </Box>
          <Box
            ref={entropyRef}
            sx={{ scrollMarginTop: '64px' }}
          >
            <Headline
              variant={'h4'}
              text={localizedStrings.entropy}
            />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', my: 2 }}>
              <Typography variant='h4' color='primary.main'>
                {localizedStrings.entropy}(S) = &sum;<sub>a &isin; A</sub> -p(a)log<sub>2</sub>p(a)
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{ mb: 5, textAlign: 'justify' }}
            >
              {localizedStrings.start_entropy}
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
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', my: 2 }}>
              <Typography variant='h4' color='primary.main'>
                {localizedStrings.information_gain}(S, a) = {localizedStrings.entropy}(S) - &sum;<sub>v &isin; Values(a)</sub> |S<sub>v</sub>| / |S| {localizedStrings.entropy}(S<sub>v</sub>)
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{ mb: 5, textAlign: 'justify' }}
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
      maxWidth: '255px',
      height: '255px',
      overflow: 'hidden',
      transition: "transform 0.15s ease-in-out, height 300ms ease-in-out",
      "&:hover": { transform: "scale3d(1.1, 1.1, 1)", height: '450px', overflow: 'auto' },
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
