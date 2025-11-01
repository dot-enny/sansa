import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Boxes, ShoppingBag, TrendingUp } from "lucide-react";
import { vendorInfo } from '@/data/vendorData'

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
  const { storeName, trustScore, maxTrustScore } = vendorInfo;

  return (
    <div className="flex flex-col h-full bg-card">
      <VendorBranding storeName={storeName} />
      <Navigation />
      <TrustScore trustScore={trustScore} maxTrustScore={maxTrustScore} />
    </div>
  );
}

const VendorBranding = ({ storeName }: { storeName: string }) => {
  return (
    <div className="px-6 pt-14 pb-6">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-primary-foreground">
            {storeName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">{storeName}</h2>
        </div>
      </div>
    </div>
  )
}

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex-1 px-4 py-2 overflow-y-auto">
      <ul className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium w-full group ${isActive
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
  )
}

interface TrustScoreProps {
  trustScore: number,
  maxTrustScore: number,
}

const TrustScore = ({ trustScore, maxTrustScore }: TrustScoreProps) => {
  const scorePercentage = (trustScore / maxTrustScore) * 100;

  return (
    <div className="px-6 py-5 bg-linear-to-br from-primary/5 to-primary/10 border-t border-border/50 mt-auto">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <div className="text-xs font-semibold text-foreground/80">Trust Score</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{trustScore}</span>
          <span className="text-xs text-muted-foreground">of {maxTrustScore}</span>
        </div>
        <div className="relative h-2.5 bg-background/50 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Build trust to unlock better rates
        </p>
      </div>
    </div>
  )
}