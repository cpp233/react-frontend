import React from 'react';
import styled from 'styled-components';

// 只是为了 css3 的变量测试
// 实际不需要这么写
// styled-components 本身可以用 js 的变量
const Style = styled.div`
  position: relative;
  --width: ${props => props.styleObject.width + '%'};
  --height: ${props => props.styleObject.height + '%'};
  width: var(--width);
  height: var(--height);
  left: calc((100% - var(--width)) / 2);
  top: calc((100% - var(--height)) / 2);
  min-width: calc(
    ${window.outerWidth + 'px'} ${'*'}
      ${props => props.styleObject.minWidth / 100}
  );
  max-width: calc(
    ${window.outerWidth + 'px'} ${'*'}
      ${props => props.styleObject.maxWidth / 100}
  );
  min-height: calc(
    ${window.outerHeight + 'px'} ${'*'}
      ${props => props.styleObject.minHeight / 100}
  );
  max-height: calc(
    ${window.outerHeight + 'px'} ${'*'}
      ${props => props.styleObject.maxHeight / 100}
  );
`;

const processed = str => {
  if (typeof str !== 'number') {
    return Number(str.replace(/[^\d.]/g, ''));
  }
  return str;
};

// 为了可拓展性，只适配百分比。不适配 px 。
const Centering = ({
  children,
  width = 30,
  height = 50,
  minWidth = 10,
  maxWidth = 50,
  minHeight = 15,
  maxHeight = 50,
}) => {
  const styleObject = {
    width: processed(width),
    height: processed(height),
    minWidth: processed(minWidth),
    maxWidth: processed(maxWidth),
    minHeight: processed(minHeight),
    maxHeight: processed(maxHeight),
  };

  return <Style styleObject={styleObject}>{children}</Style>;
};

export default Centering;
