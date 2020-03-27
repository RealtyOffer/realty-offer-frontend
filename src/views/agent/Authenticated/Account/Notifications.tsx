import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Heading } from '../../../../components';

type AgentNotificationsProps = {} & RouteComponentProps;

const AgentNotifications: FunctionComponent<AgentNotificationsProps> = () => <Heading>Notifications</Heading>;

export default AgentNotifications; 
