import { Container, Typography, Box, SvgIcon, Collapse, Switch, keyframes } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as StartSvg } from '../Assets/undraw_start.svg'
import { ReactComponent as ArrowSvg } from '../Assets/undraw_straight-arrow.svg'

const drop = keyframes`
0% {
  -webkit-transform: translateY(-45px);
          transform: translateY(-45px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 1;
}
2.4% {
  opacity: 1;
}
4% {
  -webkit-transform: translateY(-24px);
          transform: translateY(-24px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
6.5% {
  -webkit-transform: translateY(-12px);
          transform: translateY(-12px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
8.2% {
  -webkit-transform: translateY(-6px);
          transform: translateY(-6px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
9.3% {
  -webkit-transform: translateY(-4px);
          transform: translateY(-4px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
2.5%,
5.5%,
7.5%,
8.7% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
10% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
11% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
}
`;

const leftIn = keyframes`
0% {
  -webkit-transform: translateX(-50px);
          transform: translateX(-50px);
  opacity: 0;
}
100% {
  -webkit-transform: translateX(0);
          transform: translateX(0);
  opacity: 1;
}
`;



export function Start() {
  return (
    <>
      <Box sx={{ display: 'flex', height: '93vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Collapse orientation='horizontal' in={true}>
            <Typography variant='h1' sx={{animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`}}>
              Decision Trees
            </Typography>
          </Collapse>
          <Typography variant='h3' letterSpacing={'6px'} sx={{animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`}}>
            A Learntool to understand Machine Learning Techniques
          </Typography>
        </Box>
        <SvgIcon
          component={StartSvg}
          inheritViewBox
          style={{
            width: '800',
            height: '800',
            position: 'absolute',
            zIndex: '-1',
            top: -50,
            right: 100,
          }} />
        <SvgIcon
          component={ArrowSvg}
          inheritViewBox
          sx={{
            width: 75,
            height: 75,
            position: 'absolute',
            bottom: 50,
            animation: `${drop} 10s infinite`
          }} />
      </Box>
    </>
  );
}
