import { styled, css } from "styled-components"

const InputWrap = styled.div`
  margin: 10px 0;
  
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`

const InputContainer = styled.input`
  padding: 12px 15px;
  border: 1px solid var(--color-lightSecondary);
  font-size: 1.5rem;
  width: 300px;
  
  @media only screen and (max-width: 750px) {
    width: 100%;
    font-size: 1.4rem;
  }
  
  ${props => props.$fullwidth && css`
    width: 610px;
    
    @media only screen and (max-width: 750px) {
      width: 100%;
    }
  `}

  ${props => props.$halfwidth && css`
    width: 145px;
    
    @media only screen and (max-width: 750px) {
      width: 100%;
    }
  `}
`

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 5px;
  display: block;
  color: var(--color-darkTertiary);

  @media only screen and (max-width: 750px) {
    font-size: 1.5rem;
  }
`

function Input({ label, name, ...props }) {
  return (
    <InputWrap name={name}>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer
        name={name}
        id={name}
        {...props}
      />
    </InputWrap>
  )
}

export default Input