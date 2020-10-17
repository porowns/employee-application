
import React, { useState } from 'react';
import {
    TextInput,
    ModalWrapper,
    DatePicker,
    DatePickerInput,
    Select,
    SelectItem
  } from 'carbon-components-react';
import moment from "moment";
const props = () => {
  return {
    buttonTriggerText: "Add Employee",
    primaryButtonText: "Add",
    secondaryButtonText: "Cancel",
  };
};

export const EmployeeForm = ( {parentCallback} ) => {
  const [firstName, updateFirstName] = useState('');
  const [firstNameInvalid, updateFirstNameInvalid] = useState(true);
  const [lastName, updateLastName] = useState('');
  const [lastNameInvalid, updateLastNameInvalid] = useState(true);
  const [hireDate, updateHireDate] = useState(null);
  const [hireDateInvalid, updateHireDateInvalid] = useState(true);
  const [role, updateRole] = useState('');
  const [roleInvalid, updateRoleInvalid] = useState(true);

  const validateFirstName = (e) => {
    if (e.currentTarget.value.length > 0) {
      updateFirstNameInvalid(false);
      updateFirstName(e.currentTarget.value);
    }
    else {
      updateFirstNameInvalid(true);
    }
  }

  const validateLastName = (e) => {
    if (e.currentTarget.value.length > 0) {
      updateLastNameInvalid(false);
      updateLastName(e.currentTarget.value);
    }
    else {
      updateLastNameInvalid(true);
    }
  }

  const validateHireDate = (e) => {
    if (e.length > 0) {
      updateHireDate(e[0].toISOString().substr(0,10));
      updateHireDateInvalid(false);
    }
    else {
      updateHireDateInvalid(true);
    }
  }

  const validateRole = (e) => {
    if (e.currentTarget.value === "placeholder-item") {
      updateRoleInvalid(true);
    }
    else {
      updateRole(e.currentTarget.value)
      updateRoleInvalid(false);
    }
  }

    return (
      <ModalWrapper
      id="input-modal"
      shouldCloseAfterSubmit={true}
      handleSubmit={() => {

        if (firstNameInvalid || hireDateInvalid || lastNameInvalid || roleInvalid) {
          return true 
        } else {
          const url = process.env.REACT_APP_API_URL + "/api/employees"
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'firstName': firstName,
              'lastName': lastName,
              'hireDate': hireDate,
              'role': role,
            })
        }).then((response) => {
          parentCallback();
        })
        
        return true;
        }
        
      }}
      {...props()}>
      <TextInput
        id="firstName"
        placeholder="First Name"
        invalidText="A valid value is required"
        labelText="First Name:"
        invalid={firstNameInvalid}
        onChange={e => validateFirstName(e)}
      />
      <TextInput
        id="lastName"
        placeholder="Last Name"
        invalidText="A valid value is required"
        labelText="Last Name:"
        invalid={lastNameInvalid}
        onChange={e => validateLastName(e)}
      />
      <br />
      <DatePicker 
        maxDate={moment().format("MM-DD-YYYY").toString()}
        datePickerType="single"
        onChange={ e => validateHireDate(e)}
        >
        <DatePickerInput
          invalid={hireDateInvalid}
          invalidText="A valid value is required"
          placeholder="mm/dd/yyyy"
          labelText="Hire Date"
          id="date-picker-single"
        />
      </DatePicker>

      <Select 
      id="select-role"
      invalid={roleInvalid}
      invalidText="Must select a role"
      defaultValue="placeholder-item"
      onChange={e => validateRole(e)}
      >
      <SelectItem
        disabled
        hidden
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItem
        value="CEO"
        text="CEO"
      />
      <SelectItem
        value="VP"
        text="VP"
      />
      <SelectItem
        value="MANAGER"
        text="MANAGER"
      />
      <SelectItem
        value="LACKEY"
        text="LACKEY"
      />
      </Select>
    </ModalWrapper>
    );
  };
  
  export default EmployeeForm; 