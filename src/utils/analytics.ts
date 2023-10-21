const trackEvent = (eventName: string, options: Record<string, any>) => {
  if (window && window.analytics) {
    window.analytics.track(eventName, {
      ...options,
    });
  }
};

export default trackEvent;
