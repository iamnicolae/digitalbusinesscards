import styled from 'styled-components'

const Errors = styled.div`
  background: #ffc72e;
  color: #382900;
  border-radius: 20px;
  font-style: italic;
  position: fixed;
  z-index: 99;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;

  span {
    padding: 25px 3px;
  }

  span:first-child {
    padding-left: 25px;
  }

  span:last-child {
    padding-right: 25px;
  }
`

function FormErrors({ validation }) {
  return (
    <Errors>
      {Object.keys(validation).map(key => validation[key] && <span key={key}>{validation[key]}</span>)}
    </Errors>
  )
}

export default FormErrors