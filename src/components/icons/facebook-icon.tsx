import React from 'react';

const FacebookIcon = ({
  width = '80',
  height = '80',
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M68 0H12C5.37258 0 0 5.37258 0 12V68C0 74.6274 5.37258 80 12 80H68C74.6274 80 80 74.6274 80 68V12C80 5.37258 74.6274 0 68 0Z'
        fill='#1877F2'
      />
      <path
        d='M55.5625 51.5625L57.3438 40H46.25V32.5C46.25 29.3437 47.7969 26.25 52.7656 26.25H57.8125V16.4062C57.8125 16.4062 53.2344 15.625 48.8594 15.625C39.7188 15.625 33.75 21.1563 33.75 31.1875V40H23.5938V51.5625H33.75V80H46.25V51.5625H55.5625Z'
        fill='white'
      />
    </svg>
  );
};

export default FacebookIcon;
