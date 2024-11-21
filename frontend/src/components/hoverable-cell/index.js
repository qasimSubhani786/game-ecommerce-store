import React from 'react';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const CellValue = ({cell, row}) => {
  return (
    <>
      <span
        data-tip={row.name}
        data-tooltip-id={row.id}
        data-tooltip-content={cell}
        style={{cursor: 'pointer'}}>
        {cell}
      </span>
      <Tooltip id={row.id} />
    </>
  );
};
