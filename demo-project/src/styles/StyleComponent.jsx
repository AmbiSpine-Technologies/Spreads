import {styled} from "@mui/material"
import { Link as LinkComponent } from 'react-router-dom'

export const Link = styled(LinkComponent)`
  text-decoration: none;
    color: inherit;
    padding: 1rem;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`

export const InputBox = styled("input")`
    border: none;
    outline: none;
    background-color: rgba(0,0,0,0.1);
    padding: 0 3rem;
    border-radius: 1.5rem;
    height: 100%;
    width: 100%;
`


export const SearchField = styled("input")`
    width: 20vmax;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    background-color:#f1f1f1 ;
    font-size: 1.1rem;
`
export const CurvBtn = styled('button')`
  padding: 1rem 2rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: black;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: gray; // Add any hover styles here
  }

  &:active {
    background-color: darkgray; // Add any active styles here
  }

  &:focus {
    outline: 2px solid blue; // Add any focus styles here
  }
`;