import React from 'react';
import './styles.scss';
import {AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai';
import {colors} from '../../common';

export const getPlanBadgColors = key => {
  switch (key) {
    case 1:
      return {background: 'monthly-background', boder: 'monthly-border'};
    case 2:
      return {background: 'biAnnual-background', border: 'biAnnual-border'};
    case 3:
      return {background: 'annual-background ', border: 'annual-border'};
    default:
      return {background: 'annual-background ', border: 'annual-border'};
  }
};
export const PlanCard = ({
  title,
  infoOne,
  infoSecond,
  price,
  type,
  check,
  onCardPress,
  planType,
}) => {
  return (
    <div
      onClick={onCardPress}
      className={
        check
          ? `plan-card selected-card-border ${
              getPlanBadgColors(planType).border
            }`
          : 'plan-card'
      }>
      <div className={`plan-title ${getPlanBadgColors(planType).background}`}>
        <span>{title}</span>
      </div>
      <div className="p-2">
        <div className="card-info">
          <AiFillCheckCircle color={colors.green} size={20} />
          <span>{infoOne}</span>
        </div>
        <div className="card-info">
          {type === 1 ? (
            <AiFillCloseCircle color={colors.primary} size={20} />
          ) : (
            <AiFillCheckCircle color={colors.green} size={20} />
          )}
          <span>{infoSecond}</span>
        </div>
        <div className="price-container">
          <span className="price-plan">{price}</span>
        </div>
        <div className="radio-container mt-3">
          <input
            class="form-check-input"
            type="radio"
            id="flexRadioDefault2"
            name="radio-group-2"
            value={`name-${price}`}
            checked={check}></input>
        </div>
      </div>
    </div>
  );
};
