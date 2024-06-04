import { Suspense } from "react";

export default function ShareLayout({ children }) {
    return (
      <>
      <Suspense fallback={<div>Loading..</div>}>
    {children}
    </Suspense>
      </>
    );
  }