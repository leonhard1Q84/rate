import React from 'react';
import { Search, RotateCcw, Plus } from 'lucide-react';

interface RateListProps {
  onEditConditions: () => void;
  onEditPrices: () => void;
}

export const RateList: React.FC<RateListProps> = ({ onEditConditions, onEditPrices }) => {
  return (
    <div className="p-6">
       <div className="bg-white rounded shadow-sm border border-gray-200">
          
          {/* Filters */}
          <div className="p-5 border-b border-gray-100">
             <div className="flex flex-wrap gap-4 items-end">
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">规则编码</label>
                   <input type="text" placeholder="请输入" className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">规则名称</label>
                   <input type="text" placeholder="请输入" className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">适用门店</label>
                   <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-500">
                      <option>请选择</option>
                   </select>
                </div>
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">是否过期</label>
                   <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-500">
                      <option>请选择</option>
                      <option>未开始</option>
                      <option>进行中</option>
                      <option>已过期</option>
                   </select>
                </div>
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">规则状态</label>
                   <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-500">
                      <option>请选择</option>
                      <option>启用</option>
                      <option>禁用</option>
                   </select>
                </div>
                <div className="w-48">
                   <label className="block text-xs text-gray-500 mb-1">客源地</label>
                   <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-500">
                      <option>请选择</option>
                   </select>
                </div>
                
                <div className="flex gap-2 ml-auto">
                   <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      <Search size={14}/> 搜索
                   </button>
                   <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      <RotateCcw size={14}/> 重置
                   </button>
                </div>
             </div>
          </div>

          {/* Toolbar */}
          <div className="p-4 flex gap-3">
             <button className="flex items-center gap-1 px-4 py-1.5 bg-blue-50 text-blue-600 rounded text-sm border border-blue-100 hover:bg-blue-100">
                <Plus size={14}/> 新增
             </button>
             <button className="px-4 py-1.5 bg-green-50 text-green-600 rounded text-sm border border-green-100 hover:bg-green-100">
                批量启用
             </button>
             <button className="px-4 py-1.5 bg-red-50 text-red-600 rounded text-sm border border-red-100 hover:bg-red-100">
                批量禁用
             </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left">
             <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                   <th className="p-4 w-10"><input type="checkbox" /></th>
                   <th className="p-4">规则编码</th>
                   <th className="p-4">规则名称</th>
                   <th className="p-4">下单时段</th>
                   <th className="p-4">用车时段</th>
                   <th className="p-4">客源地</th>
                   <th className="p-4">适用渠道</th>
                   <th className="p-4">适用门店</th>
                   <th className="p-4">规则优先级</th>
                   <th className="p-4">是否过期</th>
                   <th className="p-4">规则状态</th>
                   <th className="p-4 text-center">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                   <td className="p-4"><input type="checkbox" /></td>
                   <td className="p-4">
                      <span onClick={onEditConditions} className="text-blue-600 hover:underline cursor-pointer">CTS003</span>
                   </td>
                   <td className="p-4">
                      <span onClick={onEditConditions} className="text-blue-600 hover:underline cursor-pointer">新千岁机场1.16-1.31</span>
                   </td>
                   <td className="p-4 text-gray-400">-</td>
                   <td className="p-4 text-gray-600">2026/01/16 - 2026/01/31</td>
                   <td className="p-4 text-gray-600">无限制</td>
                   <td className="p-4 text-gray-600 text-xs">
                      租租车<br/>QEEQ<br/>客路<br/>线下订单<br/>手动导入
                   </td>
                   <td className="p-4 text-gray-600">IX-新千岁空港</td>
                   <td className="p-4 text-gray-600">3</td>
                   <td className="p-4 text-gray-500">未开始</td>
                   <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">启用</span></td>
                   <td className="p-4">
                      {/* Requirement 1: Split buttons */}
                      <div className="flex flex-col gap-2 items-center text-xs">
                         <button onClick={onEditConditions} className="text-blue-600 hover:underline">编辑规则</button>
                         <button onClick={onEditPrices} className="text-blue-600 hover:underline">编辑价格</button>
                         <button className="text-orange-500 hover:underline">复制</button>
                         <button className="text-red-500 hover:underline">禁用</button>
                      </div>
                   </td>
                </tr>
                <tr className="hover:bg-gray-50">
                   <td className="p-4"><input type="checkbox" /></td>
                   <td className="p-4">
                      <span onClick={onEditConditions} className="text-blue-600 hover:underline cursor-pointer">CTS002</span>
                   </td>
                   <td className="p-4">
                      <span onClick={onEditConditions} className="text-blue-600 hover:underline cursor-pointer">新千岁机场全年旺季</span>
                   </td>
                   <td className="p-4 text-gray-400">-</td>
                   <td className="p-4 text-gray-600">
                      2026/04/01 - 2026/05/31<br/>
                      2026/07/01 - 2026/09/30<br/>
                      2026/11/01 - 2026/11/30
                   </td>
                   <td className="p-4 text-gray-600">无限制</td>
                   <td className="p-4 text-gray-600 text-xs">
                      租租车<br/>QEEQ<br/>客路<br/>线下订单<br/>手动导入
                   </td>
                   <td className="p-4 text-gray-600">IX-新千岁空港</td>
                   <td className="p-4 text-gray-600">2</td>
                   <td className="p-4 text-gray-500">未开始</td>
                   <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">启用</span></td>
                   <td className="p-4">
                      <div className="flex flex-col gap-2 items-center text-xs">
                         <button onClick={onEditConditions} className="text-blue-600 hover:underline">编辑规则</button>
                         <button onClick={onEditPrices} className="text-blue-600 hover:underline">编辑价格</button>
                         <button className="text-orange-500 hover:underline">复制</button>
                         <button className="text-red-500 hover:underline">禁用</button>
                      </div>
                   </td>
                </tr>
             </tbody>
          </table>
          
          <div className="p-4 border-t border-gray-200 flex items-center justify-end gap-2 text-sm text-gray-500">
             <span>共 3 条</span>
             <select className="border border-gray-300 rounded px-2 py-1"><option>20条/页</option></select>
             <div className="flex gap-1">
                <button className="w-8 h-8 border border-gray-200 rounded hover:bg-gray-50">&lt;</button>
                <button className="w-8 h-8 bg-blue-600 text-white rounded">1</button>
                <button className="w-8 h-8 border border-gray-200 rounded hover:bg-gray-50">&gt;</button>
             </div>
             <span>前往 <input type="text" className="w-10 border border-gray-300 rounded text-center" defaultValue="1"/> 页</span>
          </div>

       </div>
    </div>
  );
};