import React, { useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Box, Heading } from '../../components';
import { getAgentSiteBanners } from '../../redux/ducks/agent';
import { BannerType } from '../../redux/ducks/agent.d';
import { RootState } from '../../redux/ducks';
import BannerDetails from './BannerDetails';
import { quarterSpacer, baseSpacer } from '../../styles/size';
import { baseBorderStyle } from '../../styles/mixins';

// TODO use table lib/component
const StyledTable = styled.table`
  margin-bottom: ${baseSpacer};
`;

const StyledTr = styled.tr`
  border: ${baseBorderStyle};
`;

const StyledTd = styled.td`
  padding: ${quarterSpacer};
  border: ${baseBorderStyle};
`;

const StyledTh = styled.th`
  padding: ${quarterSpacer};
  font-weight: bold;
  border: ${baseBorderStyle};
`;

const Banners: FunctionComponent<RouteComponentProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentSiteBanners());
  }, []);

  return (
    <>
      <Box>
        <Heading>Site Banners</Heading>
        <StyledTable>
          <thead>
            <StyledTr>
              <StyledTh>Message</StyledTh>
              <StyledTh>Type</StyledTh>
              <StyledTh>Dismissable</StyledTh>
              <StyledTh>Call To Action Link</StyledTh>
              <StyledTh>Expires</StyledTh>
              <StyledTh>Audience</StyledTh>
              <StyledTh>Actions</StyledTh>
            </StyledTr>
          </thead>
          <tbody>
            {agent.banners?.map((banner: BannerType) => (
              <StyledTr key={banner.id}>
                <StyledTd>{banner.message}</StyledTd>
                <StyledTd>{banner.styling}</StyledTd>
                <StyledTd>{banner.dismissable.toString()}</StyledTd>
                <StyledTd>{banner.callToActionLink}</StyledTd>
                <StyledTd>{banner.expirationDate}</StyledTd>
                <StyledTd>{banner.audience}</StyledTd>
                <StyledTd>
                  <Link to={`/admin/banners/${banner.id}`} state={banner}>
                    Edit
                  </Link>
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
        <Router>
          <BannerDetails path="/:id" />
        </Router>
      </Box>
    </>
  );
};

export default Banners;
