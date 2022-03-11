import React from 'react';
import styled from 'styled-components';

const colors = [
  [
    `radial-gradient(
      circle,
      rgba(217, 231, 255,1) 0%,
      rgba(227, 255, 231, 1) 100%)`,
  ],
  [
    `radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%)`,
  ],

  // 自定义
  // [
  //   `radial-gradient(
  //     ellipse  80% 50% at 30% -30%,
  //     rgb(242 176 124) 0%,
  //     rgba(255,0,0,0.0) 150.00%)`,
  //   `radial-gradient(
  //       ellipse  50% 80% at -20% 50%,
  //       rgb(242 176 124) 0%,
  //       rgba(255,0,0,0.0) 100%)`,
  //   `radial-gradient(
  //       circle at 60% 10%,
  //       rgb(93 181 185) 10%,
  //       rgba(255,0,0,0.0) 100%)`,
  // ],
  // [
  //   `radial-gradient(
  //     ellipse  80% 50% at 30% -15%,
  //     rgb(138 202 165) 0%,
  //     rgba(255,0,0,0.0) 100.00%)`,
  //   `radial-gradient(
  //     ellipse 50% 150% at 120% 150%,
  //     rgb(242 176 124) 0%,
  //     rgba(255,0,0,0.0) 100%)`,
  //   `radial-gradient(
  //       circle at 60% 10%,
  //       rgb(66 186 238) 10%,
  //       rgba(255,0,0,0.0) 100%)`,
  // ],

  // 颜色盘
  // ['rgb(138 202 165)', 'rgb(66 186 238)'],
  // ['rgb(235 201 234)', 'rgb(255 221 238)'],
  // ['rgb(149 118 97)', 'rgb(33 36 41)'],
];

const Style = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.styleObject.toString()};
`;

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  const color = colors[index];
  return color;
};

const Gradients = ({ children }) => {
  // const styleObject = { ...getRandomColor() };

  return <Style styleObject={getRandomColor()}>{children}</Style>;
};

export default Gradients;
