import React from 'react';
import styled from 'styled-components';
import { HorizontalCalendar } from '@components';

const Section = styled.div``;

const intended: null[] = [];
const program: null[] = [];

const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
      <HorizontalCalendar />
      <Section>
        <div>예정된 일정</div>
        <div>
          {intended.map(() => (
            <div />
          ))}
        </div>
      </Section>
      <Section>
        <div>나의 운동 프로그램</div>
        <div>
          {program.map(() => (
            <div />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
