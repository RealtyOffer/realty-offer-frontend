import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Heading } from '../../../../components';

type AgentSecurityProps = {} & RouteComponentProps;

const AgentSecurity: FunctionComponent<AgentSecurityProps> = () => <Heading>Security</Heading>;

export default AgentSecurity;
