

import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";

export const metadata = {
  title: "Genex CRM – Smart Customer Management by Genex Web Services",
  description:
    "Genex CRM is a powerful, user-friendly customer relationship management system designed to streamline operations, boost productivity, and help businesses build stronger client relationships. Crafted by Genex Web Services for modern teams.",
};

export default function RootLayout({ children }) {

  //if (!excludePaths.includes(pathname)) {
    //useAuth();
  //}
  return (
    <html lang='en'>
      <PluginInit />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
