import React from 'react';
import { motion, AnimationControls, TargetAndTransition, VariantLabels } from 'framer-motion';
import { Box, Grid } from '@mui/material';
import { Typography, ToggleButton, ToggleButtonGroup } from '@components';
import styled from 'styled-components';

const FeelingCard = styled(ToggleButton)<{ $color: string }>`
  &.MuiToggleButton-root {
    width: 100%;
    aspect-ratio: auto 1 / 1;
    background: ${({ $color }) => $color};
    border-radius: 8px;
  }
`;

type Animate = AnimationControls | TargetAndTransition | VariantLabels | boolean;

const blinkSqueezeTwice: Animate = {
  scale: ['1, 1', '1, 1', '1, 0', '1, 1', '1, 0', '1, 1', '1, 1'],
  transition: {
    repeat: Infinity,
    delay: 1,
    duration: 3,
    ease: 'linear',
    times: [0, 0.45, 0.5, 0.55, 0.6, 0.65, 1]
  }
};

const grin: Animate = {
  bottom: ['0%', '0%', '50%', '50%', '0%', '0%'],
  transition: {
    repeat: Infinity,
    delay: 1,
    duration: 3,
    ease: 'linear',
    times: [0, 0.1, 0.2, 0.4, 0.5, 1]
  }
};
const haha: Animate = {
  bottom: ['0.6', '0.8', '0.6', '0.8', '0.6', '1', '1.2', '1', '1.1'],
  transition: {
    repeat: Infinity,
    delay: 1,
    duration: 3,
    ease: 'linear',
    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
  }
};

const cardList = [
  { type: 'a', color: '#FD4B37' },
  { type: 'b', color: '#FF8C41' },
  { type: 'c', color: '#FCD801' },
  { type: 'd', color: '#2cca90' },
  { type: 'e', color: '#48dfda' },
  { type: 'f', color: '#5ac6ed' },
  { type: 'g', color: '#446BB4' },
  { type: 'h', color: '#707dc3' },
  { type: 'i', color: '#959ca4' }
];
const FeelingCheckPage = () => {
  const handleFeelingClick = () => {};
  return (
    <Box sx={{ padding: '0px 16px' }}>
      <motion.svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="body" fill="#FCD801" cx="22" cy="22" r="22" />
        <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
          <g transform="translate(9, 5)">
            <rect x="-2" y="0" width="4" height="2" rx="2" />
          </g>
          <motion.ellipse cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75" animate={blinkSqueezeTwice} />
          <motion.ellipse cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75" animate={blinkSqueezeTwice} />
        </g>
      </motion.svg>
      {/*
      width: 80px;
		height: 40px;
		left: calc(50% - 40px);
		top: 50%;
		background: $emoji-black-color;
		border-radius: 0 0 40px 40px;
		overflow: hidden;
		z-index: 1;
		animation: haha-mouth 2s linear infinite;
      */}
      <motion.svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="body" fill="#FCD801" cx="22" cy="22" r="22" />
        <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
          <g>
            <motion.rect x="-2" y="0" width="20" height="10" rx="2" animate={haha} />
          </g>
          <motion.ellipse cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75" animate={grin} />
          <motion.ellipse cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75" animate={grin} />
        </g>
      </motion.svg>

      <Typography>오늘 기분이 어때?</Typography>
      <ToggleButtonGroup onClick={handleFeelingClick}>
        <Grid container spacing={2}>
          {cardList.map(({ type, color }) => (
            <Grid item xs={4}>
              <FeelingCard value={type} $color={color} />
            </Grid>
          ))}
        </Grid>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FeelingCheckPage;
