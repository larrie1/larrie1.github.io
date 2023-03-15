import { Container, Typography, Box, SvgIcon, Collapse, Switch } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as StartSvg } from '../Assets/undraw_start.svg'

export function Start() {
  var [checked, setCheck] = useState(false)

  function handleChange() {
    setCheck(!checked)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: '50px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Switch checked={checked} onChange={handleChange} />
          <Collapse orientation='horizontal' in={checked}>
            <Typography fontSize={100}>
              Decision Trees
            </Typography>
          </Collapse>
          <Typography variant='h3' letterSpacing={'6px'}>
            A Learntool to understand Machine Learning Techniques
          </Typography>
        </Box>
        <SvgIcon component={StartSvg} inheritViewBox style={{ width: '500', height: '500' }} />
      </Box>
    </>
  );
}
