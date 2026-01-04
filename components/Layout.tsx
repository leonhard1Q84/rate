import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Car, 
  Store, 
  Box, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  Download,
  Menu,
  Maximize,
  Search,
  Type,
  User,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, active = false, hasSub = false }: { icon: any, label: string, active?: boolean, hasSub?: boolean }) => (
  <div className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {hasSub && <ChevronDown size={14} />}
  </div>
);

const SubItem = ({ label, active = false }: { label: string, active?: boolean }) => (
  <div className={`pl-12 py-2 text-sm cursor-pointer ${active ? 'text-blue-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'}`}>
    {label}
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-700">
           <div className="flex items-center gap-2 text-white font-bold text-xl">
             <Car className="text-blue-500" />
             FleetEdge
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarItem icon={FileText} label="订单管理" hasSub />
          <SidebarItem icon={Car} label="车辆管理" hasSub />
          <SidebarItem icon={Store} label="门店与服务规则" hasSub />
          <SidebarItem icon={Box} label="库存管理" hasSub />
          <SidebarItem icon={ShoppingBag} label="商品管理" hasSub />
          
          <div className="mt-2">
            <SidebarItem icon={CreditCard} label="价格管理" active hasSub />
            <div className="bg-[#0b1120]">
               <SubItem label="异地还车费率" />
               <SubItem label="车辆租金费率" active />
            </div>
          </div>

          <SidebarItem icon={Settings} label="品牌管理" hasSub />
          <SidebarItem icon={Download} label="任务中心" hasSub />
          <SidebarItem icon={Settings} label="系统管理" hasSub />
        </div>

        <div className="p-4 border-t border-slate-700 text-slate-500 text-xs text-center">
           V1.7.0 FleetEdge
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Menu size={20} className="text-gray-500 cursor-pointer" />
            <nav className="flex items-center text-sm text-gray-500">
              <span className="hover:text-blue-600 cursor-pointer">价格管理</span>
              <ChevronRight size={14} className="mx-1" />
              <span className="text-gray-900 font-medium">车辆租金费率</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Maximize size={18} className="text-gray-400 cursor-pointer" />
            <Search size={18} className="text-gray-400 cursor-pointer" />
            <Type size={18} className="text-gray-400 cursor-pointer" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>简体中文</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                 <User size={16} />
               </div>
               <span className="text-sm font-medium text-gray-700">admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  );
};
