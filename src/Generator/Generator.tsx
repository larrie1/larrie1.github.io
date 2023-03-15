import { Container, Typography, Box, SvgIcon, Collapse, Switch } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as StartSvg } from '../Assets/undraw_start.svg'

export function Generator() {

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: '50px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Collapse orientation='horizontal' in={true}>
            <Typography fontSize={100}>
              Generator
            </Typography>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}