import emailjs from '@emailjs/browser';

export async function sendMessage({
  firstName,
  lastName,
  email,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  const { status, text } = await emailjs.send(
    'service_3bb15fr',
    'template_m1r6t2j',
    {
      firstName,
      lastName,
      email,
      message,
    },
    'IPUsFfpBKbEo3nsBU'
  );

  return { status, text };
}
