import { Typography, Box, SvgIcon, keyframes, Link } from '@mui/material';
import { useRef } from 'react';
import { ReactComponent as ArrowSvg } from '../Assets/undraw_arrow.svg'
import { localizedStrings } from '../Res/localization';
import { leftIn, pause_between_iterations, slideInTop, wobbleHorBottom } from '../Utils/animations';
import { Headline } from '../Utils/Headline';
import block1 from '../Assets/blockly1.png'
import block5 from '../Assets/block5.png'
import block3 from '../Assets/block3.png'
import block4 from '../Assets/block4.png'

export function Start() {
  const myRef = useRef<HTMLElement>(document.createElement("section"))
  const executeScroll = () => myRef.current.scrollIntoView()

  return (
    <>
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
          src={block1}
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
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', backdropFilter: `blur(5px)`, zIndex: -1 }} />
        <SvgIcon
          component={ArrowSvg}
          inheritViewBox
          href='#section1'
          onClick={executeScroll}
          sx={{
            position: 'absolute',
            href: '#section1',
            to: '#section1',
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
          }}>
          <Link href='#section1' />
        </SvgIcon>
      </Box>
      <section id='section1' ref={myRef}>
        <Box sx={{height: '64px'}} />
        <Headline variant={'h3'} text={localizedStrings.trees} />
        <Typography variant='h6' sx={{ mb: 5 }}>
          {localizedStrings.lorem}
        </Typography>
        <Headline variant={'h3'} text={localizedStrings.root} />
        <Typography variant='h6' sx={{ mb: 5 }}>
          {localizedStrings.lorem}
        </Typography>
        <Headline variant={'h3'} text={localizedStrings.node} />
        <Typography variant='h6' sx={{ mb: 5 }}>
          {localizedStrings.lorem}
        </Typography>
      </section>
    </>
  );
}
