import { PostHog } from 'posthog-node';
import { Email } from './email';

const posthog = new PostHog(process.env.POSTHOG_PROJECT_TOKEN || '', {
  host: 'https://us.i.posthog.com',
  secretKey: process.env.POSTHOG_PROJECT_SECRET_API_KEY,
  enableLocalEvaluation: false,
});

const { data, error } = await posthog.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'hello world',
  templateKey: 'hello-world',
  react: <Email url="https://example.com" />,
});

await posthog.shutdown();

if (error) {
  throw error;
}

console.log(data.id);
