import { Link, useLocation, useParams } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Boxes, ShoppingBag } from "lucide-react";

const links = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Add Product",
    to: "/dashboard/add-product",
    icon: <PlusCircle className="w-5 h-5" />,
  },
  {
    name: "Manage Products",
    to: "/dashboard/manage-products",
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    name: "Orders",
    to: "/dashboard/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
];

export default function SidebarVendor() {

  const location = useLocation();
  const storeName = "StoreName";
  
  return (
    <div className="flex flex-col h-full bg-card">
      {/* Store Logo/Name Section */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-20 h-20 rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">
              {storeName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">{storeName}</h2>
            <p className="text-xs text-muted-foreground">Vendor Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu - aligned to top */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium w-full group ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-foreground/70 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                  }`}
                >
                  <span className={isActive ? "" : "group-hover:scale-110 transition-transform"}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Credit Score Badge at bottom */}
      <div className="px-6 py-4 border-t border-border bg-muted/30 mt-auto">
        <div className="text-xs text-muted-foreground mb-1">Credit Score</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%]"></div>
          </div>
          <span className="text-sm font-bold text-foreground">750</span>
        </div>
      </div>
    </div>
  );
}