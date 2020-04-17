import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { baseBorderStyle, z1Shadow } from '../styles/mixins';
import { baseSpacer } from '../styles/size';
import { white, offWhite } from '../styles/color';

const StyledSubNav = styled.nav`
  background-color: ${white};
  border: ${baseBorderStyle};
  box-shadow: ${z1Shadow};
`;

const StyledSubNavLink = styled(Link)`
  border-bottom: ${baseBorderStyle};
  display: block;
  padding: ${baseSpacer};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${offWhite};
  }
`;

type SubNavProps = {
  items: Array<{ name: string; path: string }>;
};

const SubNav: FunctionComponent<SubNavProps> = (props) => (
  <StyledSubNav>
    {props.items.map((item: { name: string; path: string }) => (
      <StyledSubNavLink key={item.name} to={item.path}>
        {item.name}
      </StyledSubNavLink>
    ))}
  </StyledSubNav>
);

export default SubNav;
