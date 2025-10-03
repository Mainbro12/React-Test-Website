import styled from "@emotion/styled";
import { Link } from "react-router";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default (props) => <StyledLink {...props} />;
