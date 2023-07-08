import { styled, css } from "styled-components"

const InputWrap = styled.div`
  margin: 10px 0;
`

const InputContainer = styled.input`
  padding: 12px 15px;
  border: 1px solid #d0d0e1;
  font-size: 1.5rem;
  width: 300px;
  ${props => props.fullWidth && css`
    width: 610px;
  `}
  ${props => props.halfWidth && css`
    width: 145px;
  `}
`

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 5px;
  display: block;
  color: #4d4d4d;
`

function Input({ label, validation, name, ...props }) {
  return (
    <InputWrap>
      <Label htmlFor={name}>{label}</Label>
      <div>{validation[name]}</div>
      <InputContainer
        name={name}
        id={name}
        {...props}
      />
    </InputWrap>
  )
}

export default Input