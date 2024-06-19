import React from 'react';
import styled from 'styled-components';
import WeatherContainer from '@containers/WeatherContainer';

const HomePageWrapper = styled.div`
  padding: 44px 16px 16px;
`;

const ScheduleSection = styled.div`
  padding: 24px 16px;
  height: 100%;
  background: #ededed;
  //border-top-right-radius: 26px;
`;

const Group = styled.div``;

const IntendedGroup = styled.div`
  //display: flex;
  //gap: 16px;
  width: 100%;
  height: 100%;
  //overflow: scroll;
`;

const Card = styled.div`
  //min-width: 140px;
  width: 100%;
  height: 60px;
  background: #fff;
  border-radius: 8px;
`;

const intended: number[] = [1, 2, 3, 4, 5];
const program: number[] = [1, 2, 3, 4, 5];

const HomePage = () => {
  return (
    <HomePageWrapper>
      <div>ToDoit</div>
      <WeatherContainer />
      <ScheduleSection>
        <Group>
          <div>예정된 일정</div>
          <IntendedGroup>
            {intended?.length ? intended.map(() => <Card>asd</Card>) : <div>예정된 일정이 없습니다</div>}
          </IntendedGroup>
        </Group>
        <Group>
          <div>나의 운동 프로그램</div>
          <div>
            {program.map(() => (
              <div />
            ))}
          </div>
        </Group>
      </ScheduleSection>
    </HomePageWrapper>
  );
};

export default HomePage;
