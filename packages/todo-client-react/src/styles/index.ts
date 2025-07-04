import styled from 'styled-components';

export interface FlexBoxFullWidthCenterProps {
  direction?: 'row' | 'column' | 'row-revers' | 'column-revers' | 'initial' | 'inherit' | 'unset';
  align?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'initial' | 'inherit' | 'unset';
  gap?: string | number;
  justify?:
    | 'baseline'
    | 'center'
    | 'end'
    | 'first baseline'
    | 'flex-start'
    | 'flex-end'
    | 'last baseline'
    | 'left'
    | 'right'
    | 'safe'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'stretch'
    | 'initial'
    | 'inherit'
    | 'unset';
}

export const FullWidthFlexBox = styled.div<FlexBoxFullWidthCenterProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap}px` : gap)};
  width: 100%;
`;

export const FlexBox = styled.div<FlexBoxFullWidthCenterProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify};
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap}px` : gap)};
`;

export const WhiteFlexBox = styled(FullWidthFlexBox)`
  background-color: ${({ theme }) => theme.color.white};
`;
  