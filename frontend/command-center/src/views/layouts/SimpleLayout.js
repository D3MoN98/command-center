import { Toaster } from "react-hot-toast";

export default function SimpleLayout({ children }) {
  return (
    <>
      {children}
      <Toaster position="bottom-center" duration="4000" />
    </>
  );
}
