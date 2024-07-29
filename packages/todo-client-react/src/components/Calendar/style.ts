import styled from 'styled-components';

export const CalenderWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  background: #fff;

  .date-group {
    display: flex;
    justify-content: space-between;
    padding: 6px;
    .swiper {
      width: 100%;
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
    }
  }

  .date-item {
    width: 12%;
    height: 100%;
    padding: 4px 0px;
    border-radius: 4px;
    text-align: center;
    .day {
      padding-bottom: 2px;
      font-size: 12px;
      font-weight: 600;
    }
    .dayNumber {
      font-size: 16px;
      font-weight: 700;
    }
    &:first-child .day {
      color: red;
    }
    &:last-child .day {
      color: blue;
    }
    &.active {
      background: #c7e6f7;
    }
  }
`;

// export const styleConstructor = (theme: Theme = {}) => {
//   const appStyle = {...defaultStyle, ...theme};
//   return StyleSheet.create({
//     dots: {
//       flexDirection: 'row'
//     },
//     periods: {
//       alignSelf: 'stretch'
//     },
//     period: {
//       height: 4,
//       marginVertical: 1,
//       backgroundColor: appStyle.dotColor
//     },
//     startingDay: {
//       borderTopLeftRadius: 2,
//       borderBottomLeftRadius: 2,
//       marginLeft: 4
//     },
//     endingDay: {
//       borderTopRightRadius: 2,
//       borderBottomRightRadius: 2,
//       marginRight: 4
//     },
//     ...(theme['stylesheet.marking'] || {})
//   });
// };
