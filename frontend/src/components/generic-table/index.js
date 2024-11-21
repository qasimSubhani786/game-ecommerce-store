import React from "react";
import "./style.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

export const GenericTable = ({ headings, data }) => {
  return (
    <BootstrapTable trClassName="table-row" data={data} bordered={false}>
      {headings.map((i, index) => (
        <TableHeaderColumn
          key={index}
          width={"20%"}
          dataField={i.fieldName}
          dataFormat={i.dataformat}
          isKey={index == 0 && true}
        >
          {i.title}
        </TableHeaderColumn>
      ))}
    </BootstrapTable>
  );
};
