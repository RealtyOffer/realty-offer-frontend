// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { css, keyframes } from 'styled-components';

import Alert from './Alert';
import { closeAlert } from '../redux/ducks/globalAlerts';

type Props = {
  globalAlerts: any,
  actions: {
    closeAlert: Function,
  },
};

type State = {
  animateIn: boolean,
  animateOut: boolean,
};

const AnimateInKeyframes = keyframes`
  0% {
    transform: translateY(200%);
  }
  100% {
    transform: translateY(0);
  }
`;

const AnimateOutKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(200%);
  }
`;

type StyleProps = {
  entering: boolean,
  exiting: boolean,
};

const inAnimation = () => css`
  animation: ${AnimateInKeyframes} .5s ease-in-out 1;
`;

const outAnimation = () => css`
  animation: ${AnimateOutKeyframes} .5s ease-in-out 1;
`;

const GlobalAlertWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 2222;
  ${(props: StyleProps) => props.entering && inAnimation}
  ${(props: StyleProps) => props.exiting && outAnimation}
  & > div {
    margin-bottom: 0;
    border-radius: 0;
  }
`;

class GlobalAlerts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animateIn: false,
      animateOut: false,
    };
  }

  componentDidUpdate(previousProps: Props) {
    const {
      globalAlerts: {
        currentAlert,
        alerts,
      },
    } = this.props;

    // alert recently added the first alert or we recently closed one
    if (alerts.length > 0 &&
      ((previousProps.globalAlerts.alerts.length === 0 && alerts.length === 1) ||
        (previousProps.globalAlerts.alerts.length > alerts.length))
    ) {
      this.startAnimation();
      // self closing alerts need to close themselves
      if (currentAlert && !currentAlert.dismissable) {
        setTimeout(() => {
          this.dismissAlert(currentAlert);
        }, 5000);
      }
    }
  }

  startAnimation = () => {
    this.setState({
      animateIn: true,
      animateOut: false,
    });
  }

  endAnimation = () => {
    this.setState({
      animateIn: false,
      animateOut: true,
    });
  }

  dismissAlert = (currentAlert: any) => {
    this.endAnimation();
    setTimeout(() => { // give time for animation to finish before removing from store
      this.props.actions.closeAlert(currentAlert);
    }, 500);
  }

  render() {
    const {
      globalAlerts: {
        currentAlert,
        alerts,
      },
    } = this.props;

    return (
      <GlobalAlertWrapper
        entering={this.state.animateIn}
        exiting={this.state.animateOut}
      >
        {
          currentAlert && currentAlert.id && (
            <Alert
              key={`alert-${currentAlert.id}`}
              type={currentAlert.type}
              close={() => this.dismissAlert(currentAlert)}
              dismissable={currentAlert.dismissable}
              alertNumber={1}
              alertNumberTotal={alerts.length}
            >
              {currentAlert.message || 'An error occurred. Please try again.'}
            </Alert>
          )
}
      </GlobalAlertWrapper>
    );
  }
}

export default connect((state) => ({
  globalAlerts: (state as any).globalAlerts,
}), (dispatch) => ({
  actions: bindActionCreators({ closeAlert }, dispatch),
}))(GlobalAlerts);
