import {
  ClerkProvider as Provider,
} from "@clerk/clerk-react";

const clerkPubKey =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider
      publishableKey={
        clerkPubKey
      }
    >
      {children}
    </Provider>
  );
}