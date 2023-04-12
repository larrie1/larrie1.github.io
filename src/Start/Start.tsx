import { Typography, Box, SvgIcon, keyframes, Link } from '@mui/material';
import { useRef } from 'react';
import { ReactComponent as StartSvg } from '../Assets/undraw_start.svg'
import { ReactComponent as ArrowSvg } from '../Assets/undraw_straight-arrow.svg'
import { strings } from '../Res/localization';
import { leftIn, wobbleHorBottom } from '../Utils/animations';
import { Headline } from '../Utils/Headline';

export function Start() {
  const myRef = useRef<HTMLElement>(document.createElement("section"))
  const executeScroll = () => myRef.current.scrollIntoView() 

  return (
    <>
      <Box sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <Typography
          variant='h1'
          letterSpacing={'6px'}
          sx={{
            mt: '64px', // App Bar
            animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`,
          }}>
          {strings.title}
        </Typography>
        <Typography
          variant='h3'
          letterSpacing={'6px'}
          sx={{
            animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`,
          }}>
          {strings.subtitle}
        </Typography>
        <SvgIcon
          component={StartSvg}
          inheritViewBox
          sx={{
            width: '50vw',
            height: '50vh',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' },
            zIndex: '-1',
            right: 0,
            top: 100,
          }} />
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
            animation: `${wobbleHorBottom} 0.8s infinite`,
            scrollBehavior: 'smooth',
            '&:hover': {
              filter: `brightness(100%)`,
            }
          }}>
            <Link href='#section1'/>
          </SvgIcon>
      </Box>
      <section id='section1' ref={myRef}>
        <Headline variant={'h3'} text={strings.trees} />
        <Typography variant='h6' sx={{mb: 5}}>
          {strings.lorem}
        </Typography>
        <Headline variant={'h3'} text={strings.root} />
        <Typography variant='h6' sx={{mb: 5}}>
          {strings.lorem}
        </Typography>
        <Headline variant={'h3'} text={strings.node} />
        <Typography variant='h6' sx={{mb: 5}}>
          {strings.lorem}
        </Typography>
      </section>
    </>
  );
}
