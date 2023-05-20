import { keyframes } from "@mui/material"

export const wobbleHorBottom = keyframes`
0%, 100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
            transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
            transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
            transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
            transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
            transform: translateX(-6px) rotate(-1.2deg);
  }`

export const pause_between_iterations = keyframes`
25.1%, 100% {
        -webkit-transform: translateX(0%);
                transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
}
`

export const scaleInVerTop = keyframes`
0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }`

export const scaleInHorLeft = keyframes`
0% {
    -webkit-transform: scaleX(0);
            transform: scaleX(0);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }`

export const scaleInHorRight = keyframes`
0% {
    -webkit-transform: scaleX(0);
            transform: scaleX(0);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }`

export const scaleInVerCenter = keyframes`
0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }`

export const leftIn = keyframes`
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
  `

export const slideInTop = keyframes`
0% {
        -webkit-transform: translateY(-1000px);
                transform: translateY(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        opacity: 1;
}`
