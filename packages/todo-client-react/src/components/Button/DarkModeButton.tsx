import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { ThemeContext } from '@contexts/ThemeContext';

const ButtonWrapper = styled.div`
  // scale: 1.4;
  // height: 24px;
  margin: 0 16px;
  svg {
    cursor: pointer;
  }
`;

const maskedCircleVariants: Record<string, object> = {
  light: { cx: 19, cy: 4 },
  dark: { cx: 30, cy: 0 }
};

const centerCircleVariants: Record<string, object> = {
  light: { r: 9, fill: 'black' },
  dark: { r: 5, fill: 'white' }
};

const linesVariants: Record<string, object> = {
  light: { scale: 0.6, rotate: 40, opacity: 0 },
  dark: { scale: 1, rotate: 90, opacity: 1, transition: { type: 'spring' } }
};

const DarkModeButton = () => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  return (
    <ButtonWrapper>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        animate={theme}
        onClick={onChangeTheme}
      >
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle r="9" fill="black" variants={maskedCircleVariants} />
        </mask>
        <motion.circle cx="12" cy="12" variants={centerCircleVariants} mask="url(#mask)" />
        <motion.g stroke="currentColor" variants={linesVariants}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </ButtonWrapper>
  );
};

export default DarkModeButton;
