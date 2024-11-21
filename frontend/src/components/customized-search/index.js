import React, { useState } from "react";
import "./style.scss";
import { GenericButton, InputField } from "..";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Grid } from "@mui/material";
import Dropdown from "react-dropdown";
import { ALL_TEXT } from "../../common/constants";

export function CustomizedSearch({
  onSearchBtnPress,
  btnLoader,
  title,
  seconddropdownlist,
  firstLabel,
  firstPlaceholder,
  secondInput,
  thirdInput,
  thirdLabel,
  thirdPlaceholder,
  secondLabel,
  secondPlaceholder,
  secondDropdownLabel,
  firstDropdown,
  secondDropdown,
  firstDropdownLabel,
  firstDropdownList,
  onClearFilterHandler,
}) {
  const [primaryFilter, setPrimaryFilter] = useState("");
  const [secondryFilter, setSecondryFilter] = useState("");
  const [thirdFilter, setThirdFilter] = useState("");
  const [ispopupOpen, setIspopupOpen] = useState(true);
  const [firstDropdownValue, setFirstDropdownValue] = useState(ALL_TEXT.ALL);
  const [secondDropdownValue, setSecondDropdownValue] = useState(ALL_TEXT.ALL);

  const onClearFilter = () => {
    setPrimaryFilter("");
    setSecondryFilter("");
    setFirstDropdownValue(ALL_TEXT.ALL);
    setSecondDropdownValue(ALL_TEXT.ALL);
    onClearFilterHandler();
  };

  const isClearVisible =
    primaryFilter != "" ||
    secondryFilter != "" ||
    firstDropdownValue != ALL_TEXT.ALL ||
    secondDropdownValue != ALL_TEXT.ALL;

  return (
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button "
            type="button"
            onClick={() => {
              setIspopupOpen(!ispopupOpen);
            }}
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="top-search-hearder">
              <span>{title}</span>
              <span className="accordianbuttonStyle">
                {ispopupOpen ? <FaPlus /> : <FaMinus />}
              </span>
            </div>
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          {!ispopupOpen && isClearVisible && (
            <span onClick={onClearFilter} className="clear-filter">
              Clear All
            </span>
          )}
          <div class="accordion-body">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <label htmlFor="/">{firstLabel}</label>
                <InputField
                  search
                  placeHolder={firstPlaceholder}
                  value={primaryFilter}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    // const numericValue = inputValue.replace(/[^0-9+]/g, '');
                    setPrimaryFilter(inputValue);
                  }}
                />
              </Grid>
              {secondInput ? (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label htmlFor="/">{secondLabel}</label>
                  <InputField
                    search
                    placeHolder={secondPlaceholder}
                    value={secondryFilter}
                    handleChange={(e) => {
                      const inputValue = e.target.value;
                      // const numericValue = inputValue.replace(/[^0-9+]/g, '');
                      setSecondryFilter(inputValue);
                    }}
                  />
                </Grid>
              ) : null}
              {thirdInput ? (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label htmlFor="/">{thirdLabel}</label>
                  <InputField
                    search
                    placeHolder={thirdPlaceholder}
                    value={thirdFilter}
                    handleChange={(e) => {
                      const inputValue = e.target.value;
                      // const numericValue = inputValue.replace(/[^0-9+]/g, '');
                      setThirdFilter(inputValue);
                    }}
                  />
                </Grid>
              ) : null}
              {firstDropdown ? (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label htmlFor="/">{firstDropdownLabel}</label>
                  <Dropdown
                    options={firstDropdownList}
                    onChange={(i) => {
                      setFirstDropdownValue(i.value);
                    }}
                    value={firstDropdownValue}
                    menuClassName="dropdown-menu-alluser"
                    className="dropdown-style-by-status"
                    controlClassName="status-control-dropdown"
                    placeholder="Select an option"
                    arrowClosed={<BsChevronDown />}
                    arrowOpen={<BsChevronUp />}
                  />
                </Grid>
              ) : null}
              {secondDropdown && (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label htmlFor="/">{secondDropdownLabel}</label>
                  <Dropdown
                    options={seconddropdownlist}
                    onChange={(i) => {
                      setSecondDropdownValue(i.value);
                    }}
                    value={secondDropdownValue}
                    menuClassName="dropdown-menu-alluser"
                    className="dropdown-style-by-status"
                    controlClassName="status-control-dropdown"
                    placeholder="Select an option"
                    arrowClosed={<BsChevronDown />}
                    arrowOpen={<BsChevronUp />}
                  />
                </Grid>
              )}
            </Grid>
            <div className="custom-search-btn-container">
              <GenericButton
                id="customized-search"
                loading={btnLoader}
                buttonText={ALL_TEXT.SEARCH}
                onPress={() => {
                  onSearchBtnPress(
                    primaryFilter,
                    secondryFilter,
                    thirdFilter,
                    firstDropdownValue,
                    secondDropdownValue
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
