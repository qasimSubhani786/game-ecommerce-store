import React from "react";
import { images } from "../../common";

export const HorizontalCard = ({ item }) => {
  return (
    <div className="horizontal-card-conatiner">
      <div className="image-container-horizontal">
        <img
          src={require(`../../../../../nodeJsProject/softec-23-backend/Images/${item?.Image}`)}
        />
      </div>
      <div className="card-detail-horizontal">
        <h4>{item.title} </h4>
        {item.key1 && <KeyValueData keyy={item.key1} value={item.value1} />}
        {/* <div className="horizontal-item-badge"> */}
        {item.key2 && <KeyValueData keyy={item.key2} value={item.value2} />}
        {item.key3 && <KeyValueData keyy={item.key3} value={item.value3} />}
        {item.key4 && <KeyValueData keyy={item.key4} value={item.value4} />}
        {/* </div> */}
      </div>
    </div>
  );
};
export const KeyValueData = ({ keyy, value }) => {
  return (
    <div className="description-complain">
      <span>{`${keyy}:`}</span>
      <span>{` ${value}`}</span>
    </div>
  );
};
