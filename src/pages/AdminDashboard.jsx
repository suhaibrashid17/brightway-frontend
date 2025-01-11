import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  UserPlus,
  ClipboardList,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import Dashboard from "../components/AdminDashboard/Dashboard";
import AddStudent from "../components/AdminDashboard/AddStudent";
import AddTeacher from "../components/AdminDashboard/AddTeacher";
import TeacherRecords from "../components/AdminDashboard/TeacherRecords";
import StudentRecords from "../components/AdminDashboard/StudentRecords";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      onClick: () => setCurrentView("Dashboard"),
    },
    {
      title: "Register Student",
      icon: <UserPlus className="w-5 h-5" />,
      onClick: () => setCurrentView("RegisterStudent"),
    },
    {
      title: "Register Teacher",
      icon: <UserPlus className="w-5 h-5" />,
      onClick: () => setCurrentView("RegisterTeacher"),
    },
    {
      title: "View Student Records",
      icon: <ClipboardList className="w-5 h-5" />,
      onClick: () => setCurrentView("StudentRecords"),
    },
    {
      title: "View Teacher Records",
      icon: <ClipboardList className="w-5 h-5" />,
      onClick: () => setCurrentView("TeacherRecords"),
    },
    {
      title: "Add Admin",
      icon: <Shield className="w-5 h-5" />,
      onClick: () => setCurrentView("AddAdmin"),
    },
  ];

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "Dashboard":
        return <Dashboard />;
      case "RegisterStudent":
        return <AddStudent></AddStudent>;
      case "RegisterTeacher":
        return <AddTeacher></AddTeacher>;
      case "StudentRecords":
        return <StudentRecords></StudentRecords>;
      case "TeacherRecords":
        return <TeacherRecords></TeacherRecords>;
      case "AddAdmin":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Add Admin</h1>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-red bg-opacity-50 z-20"
          onClick={handleOverlayClick}
        />
      )}

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 left-4 z-30 p-2 bg-white rounded-md shadow-md"
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`
                    fixed lg:relative
                    inset-y-0 left-0
                    w-64 flex-shrink-0
                    bg-darkblue
                    transform 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                    transition-transform duration-300 ease-in-out
                    z-30
                    flex flex-col
                `}
      >
        <nav className="flex-1 py-16 bg-darkblue overflow-y-auto">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className={`
                                        w-full flex items-center gap-3 px-4 py-3 text-white 
                                        hover:bg-red rounded-md transition-colors duration-200 
                                        focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50
                                        ${
                                          currentView === item.title
                                            ? "ring-2 ring-red ring-opacity-50"
                                            : ""
                                        }
                                    `}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        className={`
                flex-1
                overflow-y-auto
                bg-gray-100
                ${isMobile && isSidebarOpen ? "blur-sm" : ""}
            `}
      >
        <div className="h-full">{renderView()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
