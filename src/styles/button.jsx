import styled from 'styled-components'

export const MinimalButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  font-size: 1.4rem;
  
  span {
    font-weight: 700;
    text-align: left;
  }
`

export const MainButton = styled.button`
  background: #695BD7;
  color: #fff;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  line-height: 0;

  svg {
    font-size: 1.7rem;
  }
`