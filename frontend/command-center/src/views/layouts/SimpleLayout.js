import { Toaster } from "react-hot-toast";

export default function SimpleLayout({ children }) {
  return (
    <>
      <Toaster position="bottom-center" duration="4000" />
      {children}
    </>
  );
}
