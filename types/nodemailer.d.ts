/* eslint-disable @typescript-eslint/no-explicit-any */
// Minimal stub to satisfy TypeScript during build on hosts
// where @types/nodemailer isn't installed. We only import the
// default export and call createTransport in server code.

declare module 'nodemailer' {
  interface Transporter {
    sendMail(options: any): Promise<any>;
  }
  export function createTransport(options: any): Transporter;
  const _default: {
    createTransport: typeof createTransport;
  };
  export default _default;
}
