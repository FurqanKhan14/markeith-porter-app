import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { sortingOptions } from '../../Utils/Constants/SelectOptions';
import CustomInput from '../CustomInput';
import CustomSelect from '../Common/FormElements/SelectInput';
import './customFilters.css';
import { capitilize, toSnakeCase } from '../../Utils/Utils';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomButton from '../Common/CustomButton';
import { Dropdown } from 'react-bootstrap';
import { BsSliders } from "react-icons/bs";

import FilterBars from '../../assets/images/filter-bars.svg?react';



const CustomFilters = ({
  filters,
  setFilters,
  selectOptions = [],
  checkBoxFilters = [],
  additionalFilters = [],
  rangeFilters = [],
  dateFilters = [],
  hideSearch = false,
  hideItemsPerPage = false,
  useApplyButton = false,
}) => {
  const [formData, setFormData] = useState({});
  const [localFormData, setLocalFormData] = useState({});

  useEffect(() => {
    setFormData(filters);
    setLocalFormData(filters);
  }, [filters]);

  const debouncedSetFilters = useCallback(
    debounce((updatedFormData) => {
      setFilters(updatedFormData);
    }, 500),
    [setFilters]
  );

  const handleChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (useApplyButton) {
      setLocalFormData(updatedFormData);
      setFormData(updatedFormData);
    } else {
      setFormData(updatedFormData);
      if (name === 'search') {
        debouncedSetFilters(updatedFormData);
      } else if (!name.endsWith('_from')) {
        setFilters(updatedFormData);
      }
    }
  };

  const handleApplyFilters = () => {
    setFilters(localFormData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
  };

  const handleSelectChange = (name, value) => {
    handleChange(name, value);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  // console.log(filters , 'filters');
  return (
    <>
      <div className="table-filters mb-2 mb-md-2 mb-lg-4 d-flex flex-column gap-3 flex-md-row justify-content-md-between align-items-md-center">
        <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center entries-length">
        {!hideItemsPerPage ? (
              <CustomSelect
                className={'tableSelect'}
                value={formData?.per_page}
                name="per_page"
                label="Show"
                onChange={(e) => handleSelectChange('per_page', e.target.value)}
                options={sortingOptions}
              />
            ) : null}
        </div>
        <div className="align-items-center d-md-flex justify-content-end order-xl-2 d-flex gap-2">
          <div className="flex-grow-1">
            <div className="search-wrap">
            {!hideSearch ? (
              <CustomInput
                inputClass={'tableInputs tableSearch'}
                type="text"
                placeholder="Search"
                error={false}
                // label="Search"
                showBorders={false}
                borderRadius={10}
                name="search"
                rightIcon={FaMagnifyingGlass}
                value={formData?.search || ''}
                onChange={handleInputChange}
              />
            ) : null}
            </div>
          </div>

          <Dropdown
            className="filters-dropdown"
            align="end"
            show={isDropdownOpen}
            onToggle={handleToggleDropdown}
          >
            <Dropdown.Toggle
              className="primery-color filter-btn"
              id="dropdown-basic"
            >
              <FilterBars  size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="dropdown-header">
                <h3 className="fw-bold title mb-0">Filters 123</h3>
              </div>
              <div className="dropdown-body">
                <div className="filter-wrapper date-filter">
                  {/* {props?.dateFilterTitle && ( */}
                  <label className="w-100 mb-2">Filter By Date</label>
                  {/* )} */}
                  <div className="mb-3">
                  {selectOptions?.map((option, index) => (
              <div key={index}>
                {option ? (
                  <CustomSelect
                    className={'tableSelect'}
                    name={option.title}
                    value={formData[option.title] || ''}
                    onChange={(e) => {
                      handleSelectChange(option.title, e.target.value);
                    }}
                    label={capitilize(option?.title)}
                    options={option?.options}
                  />
                ) : null}
              </div>
            ))}
            {additionalFilters?.map(({ title, placeholder, type }, index) => (
              <div key={index}>
                <CustomInput
                  inputClass={'tableInputs'}
                  showBorders={false}
                  borderRadius={10}
                  type={type}
                  error={false}
                  label={title}
                  name={toSnakeCase(title)}
                  placeholder={placeholder}
                  onChange={handleInputChange}
                  value={formData[toSnakeCase(title)] || ''}
                />
              </div>
            ))}
            {rangeFilters?.map(({ title }, index) => (
              <div
                className="filterWrapper gap-md-2 d-flex align-items-center flex-wrap mb-0"
                key={index}
              >
                <CustomInput
                  inputClass={'tableInputs'}
                  showBorders={false}
                  borderRadius={10}
                  error={false}
                  label={title}
                  name={`${toSnakeCase(title)}_from`}
                  placeholder="From"
                  onChange={handleInputChange}
                  value={formData[`${toSnakeCase(title)}_from`] || ''}
                />
                <div className="separator d-sm-block d-none">
                  <span>-</span>
                </div>
                <CustomInput
                  inputClass={'tableInputs'}
                  showBorders={false}
                  borderRadius={10}
                  label={' '}
                  error={false}
                  name={`${toSnakeCase(title)}_to`}
                  min={formData[`${toSnakeCase(title)}_from`] || null}
                  placeholder="To"
                  onChange={handleInputChange}
                  value={formData[`${toSnakeCase(title)}_to`] || ''}
                />
              </div>
            ))}
            {dateFilters?.map(({ title, from, to }, index) => (
              <div
                className="filterWrapper gap-md-2 d-flex align-items-center flex-wrap mb-0"
                key={index}
              >
                <CustomInput
                  inputClass={'tableInputs'}
                  showBorders={false}
                  borderRadius={10}
                  type="date"
                  error={false}
                  label={title}
                  name={`${toSnakeCase(title)}_from`}
                  placeholder="From"
                  onChange={handleInputChange}
                  value={formData[`${toSnakeCase(title)}_from`] || ''}
                />
                <div className="separator d-sm-block d-none">
                  <span>-</span>
                </div>
                <CustomInput
                  inputClass={'tableInputs'}
                  showBorders={false}
                  borderRadius={10}
                  type="date"
                  label={' '}
                  error={false}
                  name={`${toSnakeCase(title)}_to`}
                  min={formData[`${toSnakeCase(title)}_from`] || null}
                  placeholder="To"
                  onChange={handleInputChange}
                  value={formData[`${toSnakeCase(title)}_to`] || ''}
                />
              </div>
            ))}
            {checkBoxFilters?.map(({ title }, index) => (
              <div key={index}>
                <CustomCheckbox
                  style={{ border: 'none', marginBottom: 0, paddingInline: 0 }}
                  checked={formData[toSnakeCase(title)] || false}
                  name={toSnakeCase(title)}
                  label={title}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
                  </div>
                  <div className="pb-2"></div>
                </div>
              </div>
              <div className="dropdown-footer d-flex flex-column justify-content-center gap-3 gap-lg-3 mt-0 pt-0">
                {/* <CustomButton onClick={handleApply} type="button"> */}
                <CustomButton  type="button">
                  Apply
                </CustomButton>
                {useApplyButton && (
              <CustomButton
                text={'Apply Filters'}
                onClick={handleApplyFilters}
              />
            )}

                {/* <CustomButton handleClear onClick={handleClear} type="button"> */}
                <CustomButton type="button">
                  Clear
                </CustomButton>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default CustomFilters;
