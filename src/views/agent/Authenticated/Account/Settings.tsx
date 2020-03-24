import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Heading } from '../../../../components';

type AgentSettingsProps = {} & RouteComponentProps;

const AgentSettings: FunctionComponent<AgentSettingsProps> = () => <Heading>Settings</Heading>;

export default AgentSettings;
