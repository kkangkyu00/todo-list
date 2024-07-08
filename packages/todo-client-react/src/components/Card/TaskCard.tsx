import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

const TaskCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 8px 8px 8px 12px;
  border-top: 1px solid #ededed;
  border-radius: 4px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.12);

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 4px;
    height: 100%;
    background: #5267fb;
  }
`;

const Meta = styled.div`
  .card-meta-title {
    padding-bottom: 4px;
    color: #3c3d48;
    font-size: 14px;
    font-weight: 700;
  }
  .card-meta-desc {
    padding-bottom: 6px;
    color: #3c3d48;
    font-size: 12px;
  }
  .card-meta-date {
    border-top: 1px solid #ecedf0;
    padding-top: 6px;
    color: #a0a0b6;
    font-size: 12px;
    font-weight: 700;
  }
`;

interface TaskCardProps {
  name?: string;
  desc?: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}

const TaskCard = ({ name, desc, startDate, endDate }: TaskCardProps): React.JSX.Element => {
  return (
    <TaskCardWrapper>
      <Meta>
        {name && <div className="card-meta-title">{name}</div>}
        {desc && <div className="card-meta-desc">{desc}</div>}
        <div className="card-meta-date">
          {endDate
            ? `${dayjs(startDate)?.format('MM DD')} ~ ${dayjs(endDate)?.format('MM DD')}`
            : `${dayjs(startDate)?.format('MM DD ⋅ a hh:mm')}`}
        </div>
      </Meta>
    </TaskCardWrapper>
  );
};

export default React.memo(TaskCard);
