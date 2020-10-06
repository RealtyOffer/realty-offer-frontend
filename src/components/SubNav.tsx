import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { baseBorderStyle, z1Shadow } from '../styles/mixins';
import { baseSpacer, quarterSpacer, threeQuarterSpacer } from '../styles/size';
import { white, offWhite, brandPrimary } from '../styles/color';

const StyledSubNav = styled.nav`
  background-color: ${white};
  border: ${baseBorderStyle};
  box-shadow: ${z1Shadow};
  margin-bottom: ${baseSpacer};

  @media print {
    display: none;
  }
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

  &.active {
    border-left: ${quarterSpacer} solid ${brandPrimary};
    padding-left: ${threeQuarterSpacer};
  }
`;

type SubNavProps = {
  items: Array<{ name: string; path: string }>;
};

const SubNav: FunctionComponent<SubNavProps> = (props) => (
  <StyledSubNav>
    {props.items.map((item: { name: string; path: string }) => (
      <StyledSubNavLink key={item.name} to={item.path} activeClassName="active">
        {item.name}
      </StyledSubNavLink>
    ))}
  </StyledSubNav>
);

export default SubNav;
