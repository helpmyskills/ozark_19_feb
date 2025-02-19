"use client"

import Header from "@/_components/AdminHeader";
import Footer from "@/_components/AdminFooter";
import Menu from "@/_components/AdminSidebar";
import "@/_style/admin.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



export default function AdminLayout({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login")
    } else {
      setLoading(false);
    }
  }, [])

  useEffect(() => { document.title = "Admin | Ozark.co"; }, [])

  // if (loading) {
  //   return <div>
  //     Loading...
  //   </div>
  // }

  const [mobile, setMobile] = useState(false);
  const handleToggle = () => {
    setMobile(!mobile);
  }

  return (
    <html lang="en">
      <body>
        <div className={`app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header ${mobile ? "sidebar-mobile-open" : ""}`}>
          <Header handleToggle={handleToggle} mobile={mobile} />
          <div className="app-main">
            <Menu />
            <div className="app-main__outer">
              {children}
              <Footer />
            </div>
          </div>
        </div>
        <ToastContainer
          autoClose={2000} />
      </body>
    </html>
  );
}
