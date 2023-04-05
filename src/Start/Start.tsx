import { Typography, Box, SvgIcon, keyframes, Link } from '@mui/material';
import { useRef } from 'react';
import { ReactComponent as StartSvg } from '../Assets/undraw_start.svg'
import { ReactComponent as ArrowSvg } from '../Assets/undraw_straight-arrow.svg'
import { wobbleHorBottom } from '../Utils/animations';

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
          Decision Trees
        </Typography>
        <Typography
          variant='h3'
          letterSpacing={'6px'}
          sx={{
            animation: `${leftIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`,
          }}>
          A Learntool to understand Machine Learning Techniques
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
        <Typography variant='h6'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

          Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer
        </Typography>
        <Typography variant='h6'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

          Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer
        </Typography>
      </section>
    </>
  );
}
