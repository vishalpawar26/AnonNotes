"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
// "use client";
// import { SessionProvider } from "next-auth/react";
// import { useState, useEffect } from "react";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     // This can be a loading spinner or placeholder content
//     return <div>Loading...</div>;
//   }

//   return <SessionProvider>{children}</SessionProvider>;
// }
