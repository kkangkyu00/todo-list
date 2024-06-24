/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import styled from 'styled-components';
import WeatherContainer from '@containers/WeatherContainer';

const HomePageWrapper = styled.div`
  height: 100%;
  padding-bottom: 62px;
  //padding: 44px 0 16px;
`;

const Group = styled.div`
  position: relative;
  padding: 60px 16px 24px;
  background: #89ccc5;
  border-radius: 0 0 16px 16px;
`;

const SectionWrapper = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    padding-top: 32px;
  }
`;

const SectionContent = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-top: -16px;
  padding: 16px;
  background: #ffffff;
`;

const TodoCard = styled.div`
  padding: 8px;
  border: solid 1px #dfdfdf;
  //border-left: solid 6px #89ccc5;
  border-radius: 8px;
`;

const intended: number[] = [1, 2, 3, 4, 5];
const program: number[] = [1, 2, 3, 4, 5];

const HomePage = () => {
  return (
    <HomePageWrapper>
      <Group>ToDoit</Group>
      <SectionWrapper>
        <SectionContent>
          {intended.map(() => (
            <TodoCard>
              <div>
                <div>Title</div>
                <div>DATE</div>
              </div>
              <div>일정 간단 요약</div>
            </TodoCard>
          ))}
        </SectionContent>
        <SectionContent>
          <div>##### 2</div>
        </SectionContent>
      </SectionWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
