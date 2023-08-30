import { styled, css } from "styled-components"

import Input from "./Input"

const InputWrap = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 750px) {
   

    ${props => props.$email && css`
    display: block;
  `}

  ${props => props.$street && css`
    display: block;
  `}
  }
`

function FormInputs({ profile, changeProfile, changeProfileImage, validate }) {
  return (
    <>
      <InputWrap>
        <Input
          name="firstName"
          type="text"
          label="First Name (required)"
          placeholder="e.g. Michael"
          value={profile.firstName}
          onChange={changeProfile}
          onBlur={validate}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name (required)"
          placeholder="e.g. Anderson"
          value={profile.lastName}
          onChange={changeProfile}
          onBlur={validate}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="mobile"
          type="tel"
          label="Mobile (required)"
          placeholder="e.g. 07911 123456"
          value={profile.mobile}
          onChange={changeProfile}
          onBlur={validate}
        />
        <Input
          name="phone"
          type="tel"
          label="Phone"
          placeholder="e.g. (000) 1234 4321"
          value={profile.phone}
          onChange={changeProfile}
        />
      </InputWrap>

      <InputWrap>
        <Input
          name="company"
          type="text"
          label="Company"
          placeholder="e.g. TheCompany"
          value={profile.company}
          onChange={changeProfile}
        />
        <Input
          name="position"
          type="text"
          label="Position"
          placeholder="e.g. Technical Director"
          value={profile.position}
          onChange={changeProfile}
        />
      </InputWrap>

      <InputWrap $email="true">
        <Input
          name="email"
          type="text"
          label="Email"
          placeholder="e.g. michael@anderson.com"
          value={profile.email}
          onChange={changeProfile}
          onBlur={validate}
        />

        <Input
          name="website"
          type="url"
          label="Website"
          placeholder="e.g. https://getqr.cc"
          value={profile.website}
          onChange={changeProfile}
          onBlur={validate}
        />
      </InputWrap>

      <InputWrap $street="true">
        <Input
          name="street"
          type="text"
          label="Street"
          placeholder="e.g. 199 Bourke Avenue"
          value={profile.street}
          onChange={changeProfile}
        />
        <InputWrap>
          <Input
            name="city"
            type="text"
            label="City"
            placeholder="e.g. Berlin"
            value={profile.city}
            onChange={changeProfile}
            $halfwidth="true"
          />
          <Input
            name="country"
            type="text"
            label="Country"
            placeholder="e.g. Spain"
            value={profile.country}
            onChange={changeProfile}
            $halfwidth="true"
          />
        </InputWrap>
      </InputWrap>

      <Input
        name="avatarImage"
        type="file"
        accept=".png, .jpg, .jpeg"
        label="Avatar"
        onChange={changeProfileImage}
        onBlur={validate}
        $fullwidth="true"
      />
    </>
  )
}

export default FormInputs