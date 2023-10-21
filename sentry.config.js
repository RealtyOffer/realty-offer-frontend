import * as Sentry from '@sentry/gatsby';

Sentry.init({
  dsn: 'https://4aabb7043cbd4da5a2788cb1d7d69fe2@o456660.ingest.sentry.io/5499988',

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Sentry.Replay()],
});
