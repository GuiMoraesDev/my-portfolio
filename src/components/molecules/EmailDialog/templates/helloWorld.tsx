type EmailTemplateProps = {
  firstName: string;
};

export const EmailTemplate = ({ firstName }: Readonly<EmailTemplateProps>) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
