/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DatePicker } from '@components';
import dayjs, { Dayjs } from 'dayjs';
import Form, { TFormOption } from '@components/Form/Form';
import { EnumFieldType } from '@components/Form/FormComponentByType';
import * as yup from 'yup';

const WeekTaskItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 100%;
  //border: 1px solid red;
  //background: blue;
`;

const TimeItem = styled.div`
  height: 84px;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  font-size: 12px;
`;

const TasksPage = () => {
  const navigate = useNavigate();

  const getHourDuration = (date: Dayjs | string) => {
    const hours = dayjs(date).hour();
    const minutes = dayjs(date).minute();
    return dayjs.duration({ hours, minutes }).asHours();
  };

  const options: TFormOption[] = [
    { field: EnumFieldType.TextField, label: '이름', name: 'name', required: true },
    { field: EnumFieldType.TextField, label: '전화번호', name: 'phone' }
  ];

  const onSubmit = (value: unknown) => {
    console.log(value, '########### onSubmit');
  };

  const asd = yup.object().shape({
    name: yup.string().required('이름은 필수항목이에요')
  });

  return (
    <div>
      <Form formOptions={options} values={{}} validationSchema={asd} onSubmit={onSubmit} />
      {/* eslint-disable-next-line react/button-has-type */}
      <button form="form" type="submit">
        submit
      </button>
      {/* <TopSheet /> */}
      <DatePicker dateType="week" />
      <div>====</div>
      <DatePicker />
    </div>
  );
};

// <div style={{ position: 'relative', zIndex: 2, background: '#fff' }}>
//   <div>
//     <div>일별로 보기</div>
//     <div>주별로 보기</div>
//   </div>
//   <div style={{ position: 'relative', height: '100%', width: '100%', paddingTop: 40 }}>
//     {new Array(23).fill(0).map((_, i) => (
//       <TimeItem>
//         {dayjs()
//           .hour(i + 1)
//           .format('A hh')}
//       </TimeItem>
//     ))}
//     <Reorder.Group axis="x" values={[]} onReorder={() => {
//     }} style={{ paddingLeft: 60 }}>
//       {tasks.map((t, zIndex) => {
//         const startPoint = getHourDuration(t.startDate);
//         const endPoint = getHourDuration(t.endDate);
//
//         const top = `${84 * startPoint - 44}px`;
//         const height = `${84 * (endPoint - startPoint)}px`;
//         return (
//           <WeekTaskItem style={{ zIndex, top, height }}>
//             <TaskCard name={t.name} desc={t.description} startDate={t.startDate} endDate={t.endDate} />
//           </WeekTaskItem>
//         );
//       })}
//     </Reorder.Group>
//   </div>
// </div>
export default TasksPage;
