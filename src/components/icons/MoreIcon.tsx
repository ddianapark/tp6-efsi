import React from 'react';

export default function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 4H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}