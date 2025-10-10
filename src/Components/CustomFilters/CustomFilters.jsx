import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState, useId } from 'react';
import {
  FaCalendar,
  FaClock,
  FaMagnifyingGlass,
  FaRegCalendar,
} from 'react-icons/fa6';
import { sortingOptions } from '../../Utils/Constants/SelectOptions'
import SelectInput from '../Common/FormElements/SelectInput';
import './customFilters.css';
import { capitilize, toSnakeCase } from '../../Utils/Utils';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomButton from '../Common/CustomButton';
import { Dropdown } from 'react-bootstrap';
import { BsSliders } from 'react-icons/bs';
import TextInput from '../Common/FormElements/TextInput';
// import FilterBars from '../../../assets/images/filter-bars.svg?react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const CustomFilters = ({
  tableKey,
  filters,
  setFilters,
  selectOptions = [],
  checkBoxFilters = [],
  additionalFilters = [],
  rangeFilters = [],
  dateFilters = [],
  showTableFilters = true,
  showItemsPerPage = true,
  showSearchInput = true,
  showFilterDropdown = true,
  useApplyButton = false,
}) => {
  // ✅ Generate unique ID for this filter instance
  const uniqueId = useId();

  // ✅ Create unique local state for each filter instance
  const [localFormData, setLocalFormData] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // console.log(filters, 'filters');

  useEffect(() => {
    // console.log('CustomFilters useEffect - tableKey:', tableKey);
    // console.log('CustomFilters useEffect - filters:', filters);
    // console.log(
    //   'CustomFilters useEffect - filters[tableKey]:',
    //   filters?.[tableKey]
    // );
    const tableFilters = tableKey ? (filters?.[tableKey] || {}) : (filters || {});

    // const tableFilters = filters?.[tableKey] || {};
    // console.log(
    //   'CustomFilters useEffect - setting localFormData to:',
    //   tableFilters
    // );
    setLocalFormData(tableFilters);
  }, [filters, tableKey]);

  // ✅ Create unique debounced function for each filter instance
  // const debouncedSetFilters = useCallback(
  //   debounce((updatedFormData) => {
  //     setFilters((prev) => ({
  //       ...prev,
  //       [tableKey]: updatedFormData,
  //     }));
  //   }, 500),
  //   [setFilters, tableKey]
  // );

    // ✅ Create unique debounced function for each filter instance
    const debouncedSetFilters = useCallback(
      debounce((updatedFormData) => {
        if (tableKey) {
          setFilters((prev) => ({
            ...prev,
            [tableKey]: updatedFormData,
          }));
        } else {
          // If no tableKey, merge directly with existing filters
          setFilters((prev) => ({
            ...prev,
            ...updatedFormData,
          }));
        }
      }, 500),
      [setFilters, tableKey]
    );

    // ✅ Update only this tableKey filters
    // if (tableKey) {
    //   setFilters((prev) => ({
    //     ...prev,
    //     [tableKey]: {
    //       ...prev[tableKey], // keep old filters of this table
    //       ...updatedFormData,
    //     },
    //   }));
    // } else {
    //   // If no tableKey, merge directly with existing filters
    //   setFilters((prev) => ({
    //     ...prev,
    //     ...updatedFormData,
    //   }));
    // }



  const handleSearchChange = (event) => {
    const { name, value } = event.target;

    // ✅ Extract the base field name (remove the tableKey prefix)
    // const baseFieldName = name.replace(`${tableKey}_`, '');
    const baseFieldName = tableKey ? name.replace(`${tableKey}_`, '') : name;

    const updatedFormData = {
      ...localFormData,
      [baseFieldName]: value, // Store with base name (e.g., 'search' not 'roster-logs_search')
    };

    console.log('handleSearchChange - tableKey:', tableKey);
    // console.log('handleSearchChange - baseFieldName:', baseFieldName);
    // console.log('handleSearchChange - updatedFormData:', updatedFormData);

    setLocalFormData(updatedFormData);

    // ✅ Update only this tableKey filters
    // setFilters((prev) => {
    //   const newFilters = {
    //     ...prev,
    //     [tableKey]: updatedFormData,
    //   };
    //   console.log('handlePerPageChange - new filters:', newFilters);
    //   return newFilters;
    // });
    if (tableKey) {
      setFilters((prev) => ({
        ...prev,
        [tableKey]: {
          ...prev[tableKey],
          ...updatedFormData,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        ...updatedFormData,
      }));
    }


    // ✅ Table specific filter update
    // setFilters((prev) => {
    //   const newFilters = {
    //     ...prev,
    //     [tableKey]: updatedFormData,
    //   };
    //   console.log('handleSearchChange - new filters:', newFilters);
    //   return newFilters;
    // });

    debouncedSetFilters(updatedFormData);
  };

  const handlePerPageChange = (value) => {
    const updatedFormData = { ...localFormData, per_page: value };
    console.log('handlePerPageChange - tableKey:', tableKey);
    console.log('handlePerPageChange - updatedFormData:', updatedFormData);

    setLocalFormData(updatedFormData);

    // setFilters((prev) => {
    //   const newFilters = {
    //     ...prev,
    //     [tableKey]: updatedFormData,
    //   };
    //   console.log('handlePerPageChange - new filters:', newFilters);
    //   return newFilters;
    // });
    if (tableKey) {
      setFilters((prev) => ({
        ...prev,
        [tableKey]: {
          ...prev[tableKey],
          ...updatedFormData,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        ...updatedFormData,
      }));
    }
  };

  // Handle filter changes (only update local state, not parent)
  const handleFilterChange = (name, value) => {
    console.log('handleFilterChange - name:', name, 'value:', value);
    setLocalFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      console.log('handleFilterChange - updated localFormData:', updated);
      return updated;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('handleInputChange - name:', name, 'value:', value);
    handleFilterChange(name, value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleFilterChange(name, checked);
  };

  const handleSelectChange = (name, value) => {
    console.log('handleSelectChange - name:', name, 'value:', value);
    handleFilterChange(name, value);
  };

  const handleApplyFilters = () => {
    console.log('handleApplyFilters - tableKey:', tableKey);
    console.log('handleApplyFilters - localFormData:', localFormData);

    setFilters((prev) => {
      if (tableKey) {
        return {
          ...prev,
          [tableKey]: localFormData,
        };
      } else {
        return {
          ...prev,
          ...localFormData,
        };
      }
    });
    setDropdownOpen(false);
  };

  const handleClearFilters = () => {
    // Create cleared filters object
    const clearedFilters = {
      ...filters?.[tableKey], // Keep current page, per_page, search for this table
      page: 1, // Reset to first page when clearing filters
    };

    // Clear all filter-specific fields
    selectOptions.forEach((option) => {
      if (option && option.title) {
        clearedFilters[option.title] = '';
      }
    });

    additionalFilters.forEach((filter) => {
      if (filter && filter.title) {
        clearedFilters[toSnakeCase(filter.title)] = '';
      }
    });

    rangeFilters.forEach((filter) => {
      if (filter && filter.title) {
        clearedFilters[`${toSnakeCase(filter.title)}_from`] = '';
        clearedFilters[`${toSnakeCase(filter.title)}_to`] = '';
      }
    });

    dateFilters.forEach((filter) => {
      if (filter && filter.title) {
        clearedFilters[`${toSnakeCase(filter.title)}_from`] = '';
        clearedFilters[`${toSnakeCase(filter.title)}_to`] = '';
      }
    });

    checkBoxFilters.forEach((filter) => {
      if (filter && filter.title) {
        clearedFilters[toSnakeCase(filter.title)] = false;
      }
    });

    // Update both local and parent state
    console.log('handleClearFilters - tableKey:', tableKey);
    console.log('handleClearFilters - clearedFilters:', clearedFilters);

    setLocalFormData(clearedFilters);
    setFilters((prev) => {
      if (tableKey) {
        return {
          ...prev,
          [tableKey]: clearedFilters,
        };
      } else {
        return {
          ...prev,
          ...clearedFilters,
        };
      }
    });
    setDropdownOpen(false);
  };

  return (
    <>
      {showTableFilters && (
        <div className="table-filters mb-2 mb-md-2 mb-lg-4 d-flex flex-column gap-3 flex-md-row justify-content-md-between align-items-md-center">
          {/* Table Controls - Entries dropdown and search */}
          {showItemsPerPage && (
            <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center entries-length">
              <SelectInput
                className={'tableSelect'}
                value={localFormData?.per_page || '10'}
                name={tableKey ? `${tableKey}_per_page` : 'per_page'}
                // name={`${tableKey}_per_page`}
                label="Showing:"
                onChange={handlePerPageChange}
                options={sortingOptions}
              />
            </div>
          )}

          <div className="align-items-center d-md-flex justify-content-end order-xl-2 d-flex gap-2">
            {/* Search */}
            {showSearchInput && (
              <div className="flex-grow-1">
                <div className="search-wrapper">
                  <TextInput
                    type="text"
                    placeholder="Search here..."
                    error={false}
                    name={tableKey ? `${tableKey}_search` : 'search'}
                    // name={`${tableKey}_search`}
                    inputIcon={FaMagnifyingGlass}
                    value={localFormData?.search || ''}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            )}

            {/* Filters Dropdown */}
            {showFilterDropdown && (
              <Dropdown
                className="filters-dropdown"
                align="end"
                show={isDropdownOpen}
                onToggle={() => setDropdownOpen(!isDropdownOpen)}
              >
                <Dropdown.Toggle
                  className="primary-color filter-btn"
                  id="dropdown-basic"
                >
                  {/* <FilterBars size={24} /> */}
                 <FontAwesomeIcon icon={faFilter} size="lg" /> 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="dropdown-header">
                    <h3 className="fw-bold title mb-0">Filters</h3>
                  </div>
                  <div className="dropdown-body pb-0">
                    {selectOptions?.map((option, index) => (
                      <div
                        className={`filter-wrapper ${
                          index === 0 ? 'mb-3' : 'mb-4'
                        }`}
                        key={index}
                      >
                        {option && (
                          <SelectInput
                            name={option.title}
                            value={localFormData[option.title] || ''}
                            onChange={(value) =>
                              handleSelectChange(option.title, value)
                            }
                            label={capitilize(option?.title)}
                            options={option?.options}
                          />
                        )}
                      </div>
                    ))}

                    {dateFilters?.map(({ title, from, to }, index) => (
                      <div
                        className={`filter-wrapper date-filter ${
                          index === 0 ? 'mb-4' : 'mb-4'
                        }`}
                        key={index}
                      >
                        {title && <h6 className="mb-3">{title}</h6>}
                        <div className="mb-2">
                          <TextInput
                            type="date"
                            error={false}
                            label={from}
                            name={tableKey ? `${tableKey}_${toSnakeCase(title)}_from` : `${toSnakeCase(title)}_from`}
                            // name={`${toSnakeCase(title)}_from`}
                            onChange={handleInputChange}
                            value={
                              localFormData[`${toSnakeCase(title)}_from`] || ''
                            }
                          />
                        </div>
                        <div className="mb-2">
                          <TextInput
                            type="date"
                            label={to}
                            error={false}
                            name={tableKey ? `${tableKey}_${toSnakeCase(title)}_to` : `${toSnakeCase(title)}_to`}
                            // name={`${toSnakeCase(title)}_to`}
                            min={
                              localFormData[`${toSnakeCase(title)}_from`] ||
                              null
                            }
                            iconPosition="right"
                            onChange={handleInputChange}
                            value={
                              localFormData[`${toSnakeCase(title)}_to`] || ''
                            }
                          />
                        </div>
                      </div>
                    ))}

                    {additionalFilters?.map(
                      ({ title, placeholder, type }, index) => (
                        <div key={index}>
                          <TextInput
                            inputClass={'tableInputs'}
                            type={type}
                            error={false}
                            label={title}
                            name={tableKey ? `${tableKey}_${toSnakeCase(title)}` : toSnakeCase(title)}
                            // name={toSnakeCase(title)}
                            placeholder={placeholder}
                            onChange={handleInputChange}
                            value={localFormData[toSnakeCase(title)] || ''}
                          />
                        </div>
                      )
                    )}

                    {rangeFilters?.map(({ title }, index) => (
                      <div
                        className="filterWrapper gap-md-2 d-flex align-items-center flex-wrap mb-0"
                        key={index}
                      >
                        <TextInput
                          inputClass={'tableInputs'}
                          error={false}
                          label={title}
                          name={tableKey ? `${tableKey}_${toSnakeCase(title)}_from` : `${toSnakeCase(title)}_from`}
                          // name={`${toSnakeCase(title)}_from`}
                          placeholder="From"
                          onChange={handleInputChange}
                          value={
                            localFormData[`${toSnakeCase(title)}_from`] || ''
                          }
                        />
                        <div className="separator d-sm-block d-none">
                          <span>-</span>
                        </div>
                        <TextInput
                          inputClass={'tableInputs'}
                          label={' '}
                          error={false}
                          name={tableKey ? `${tableKey}_${toSnakeCase(title)}_to` : `${toSnakeCase(title)}_to`}
                          // name={`${toSnakeCase(title)}_to`}
                          min={
                            localFormData[`${toSnakeCase(title)}_from`] || null
                          }
                          placeholder="To"
                          onChange={handleInputChange}
                          value={
                            localFormData[`${toSnakeCase(title)}_to`] || ''
                          }
                        />
                      </div>
                    ))}

                    {checkBoxFilters?.map(({ title }, index) => (
                      <div key={index}>
                        <CustomCheckbox
                          style={{
                            border: 'none',
                            marginBottom: 0,
                            paddingInline: 0,
                          }}
                          checked={localFormData[toSnakeCase(title)] || false}
                          name={tableKey ? `${tableKey}_${toSnakeCase(title)}` : toSnakeCase(title)}
                          // name={toSnakeCase(title)}
                          label={title}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer d-flex flex-column justify-content-center gap-3 gap-lg-3 mt-0">
                    <CustomButton
                      type="button"
                      variant="primary"
                      onClick={handleApplyFilters}
                    >
                      Apply
                    </CustomButton>
                    {useApplyButton && (
                      <CustomButton
                        text={'Apply Filters'}
                        onClick={handleApplyFilters}
                        variant="primary"
                      />
                    )}
                    <CustomButton
                      type="button"
                      variant="outline-secondary"
                      onClick={handleClearFilters}
                    >
                      Clear All Filters
                    </CustomButton>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomFilters;
