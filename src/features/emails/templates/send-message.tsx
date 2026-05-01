import { render } from '@react-email/components';

interface SendMessageTemplateProps {
  email: string;
  name: string;
  message: string;
}

export default function SendMessageTemplate({
  email,
  name,
  message,
}: Readonly<SendMessageTemplateProps>) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <p>
        New message from {name} ({email})
      </p>
      <p>{message}</p>
    </div>
  );
}

export async function renderSendMessageTemplate({
  email,
  name,
  message,
}: SendMessageTemplateProps) {
  return await render(
    <SendMessageTemplate email={email} name={name} message={message} />,
  );
}
