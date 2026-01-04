import React, { useState, useMemo } from 'react';
import { DurationRange, CarPriceRow } from '../types';
import { Check, Info, Settings, Filter } from 'lucide-react';
import { BulkPriceModal } from '../components/BulkPriceModal';

interface PriceSettingsProps {
  onBack: () => void;
  onCancel: () => void;
}

// Mock Data
const MOCK_DURATIONS: DurationRange[] = [
  { id: '1', start: 1, end: 2 },
  { id: '2', start: 3, end: 5 },
  { id: '3', start: 6, end: 365 },
];

const MOCK_ROWS: CarPriceRow[] = [
  { id: '1', storeName: 'IX-新千岁空港', carGroup: 'A', sippCode: 'CCAV', modelName: 'Honda Fit', prices: { '1': '5900', '2': '4100', '3': '3900' } },
  { id: '2', storeName: 'IX-新千岁空港', carGroup: 'D', sippCode: 'CFAD', modelName: 'Mazda CX-50', prices: { '1': '15000', '2': '12000', '3': '12000' } },
  { id: '3', storeName: 'IX-新千岁空港', carGroup: 'E', sippCode: 'CVAV', modelName: 'Toyota Vellfire 8 Seats', prices: { '1': '15000', '2': '12000', '3': '12000' } },
  { id: '4', storeName: 'IX-新千岁空港', carGroup: 'C', sippCode: 'DVAV', modelName: 'Toyota Vellfire 7 Seats', prices: { '1': '18000', '2': '15000', '3': '15000' } },
  { id: '5', storeName: 'IX-新千岁空港', carGroup: 'A', sippCode: 'DCAV', modelName: 'Mazda Demio', prices: { '1': '6700', '2': '5700', '3': '5700' } },
  { id: '6', storeName: 'IX-新千岁空港', carGroup: 'A', sippCode: 'EDAR', modelName: 'Toyota Yaris', prices: { '1': '6900', '2': '4900', '3': '4900' } },
  { id: '7', storeName: 'IX-新千岁空港', carGroup: 'E', sippCode: 'IMAR', modelName: 'Nissan Serena 8 Seats', prices: { '1': '15000', '2': '12000', '3': '12000' } },
];

export const PriceSettings: React.FC<PriceSettingsProps> = ({ onBack, onCancel }) => {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  
  // Requirement 3: Multi-select state for Car Group
  const [selectedCarGroups, setSelectedCarGroups] = useState<string[]>([]);
  const carGroupOptions = ['A', 'B', 'C', 'D', 'E', 'F'];

  // SIPP Code Filter State (Multi-select)
  const [selectedSippCodes, setSelectedSippCodes] = useState<string[]>([]);

  // Derived SIPP Options
  const sippOptions = useMemo(() => {
    const codes = new Set(MOCK_ROWS.map(r => r.sippCode));
    return Array.from(codes).sort();
  }, []);

  // Filter Logic
  const filteredRows = useMemo(() => {
    return MOCK_ROWS.filter(r => {
      const matchGroup = selectedCarGroups.length === 0 || selectedCarGroups.includes(r.carGroup);
      const matchSipp = selectedSippCodes.length === 0 || selectedSippCodes.includes(r.sippCode);
      return matchGroup && matchSipp;
    });
  }, [selectedCarGroups, selectedSippCodes]);

  // Derived selected rows for modal
  const selectedRowsList = useMemo(() => {
    return MOCK_ROWS.filter(r => selectedRowIds.has(r.id));
  }, [selectedRowIds]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(new Set(filteredRows.map(r => r.id)));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const handleRowSelect = (id: string) => {
    const newSet = new Set(selectedRowIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRowIds(newSet);
  };

  const openBulkSettings = () => {
    setIsBulkModalOpen(true);
  };

  const handleBulkApply = (result: any) => {
    console.log("Bulk Operation Result:", result);
    const { type, values } = result;
    
    if (type === 'reset') {
       alert(`Resetting prices for ${selectedRowIds.size} rows. See console for details.`);
    } else {
       alert(`${type === 'increase' ? 'Increasing' : 'Decreasing'} prices for ${selectedRowIds.size} rows. See console for details.`);
    }
    setIsBulkModalOpen(false);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen flex flex-col">
       {/* Wizard Steps Indicator - Step 2 Active */}
       <div className="mb-8 flex items-center justify-center text-sm">
         <div className="flex flex-col items-center opacity-50 cursor-pointer" onClick={onBack}>
            <div className="w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center font-bold mb-1"><Check size={16}/></div>
            <span className="font-medium text-gray-600">基础设置</span>
            <span className="text-xs text-gray-400">设置价格组的生效条件</span>
         </div>
         <div className="w-48 h-[1px] bg-green-500 mx-4 mt-[-20px]"></div>
         <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mb-1">2</div>
            <span className="font-bold text-gray-800">设置车辆租金</span>
            <span className="text-xs text-gray-400">根据租期时长定制日租金规则</span>
         </div>
         <div className="w-48 h-[1px] bg-gray-300 mx-4 mt-[-20px]"></div>
         <div className="flex flex-col items-center opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center font-bold mb-1">3</div>
            <span className="font-medium text-gray-600">完成</span>
            <span className="text-xs text-gray-400">完成设置</span>
         </div>
      </div>

      <div className="bg-white p-6 rounded shadow-sm border border-gray-200 flex-1 flex flex-col">
        {/* Info Header */}
        <div className="grid grid-cols-3 gap-8 text-sm mb-8 px-4">
           <div><span className="text-gray-500">下单时间：</span> -- </div>
           <div><span className="text-gray-500">用车时间：</span> 2026/01/16 -- 2026/01/31</div>
           <div><span className="text-gray-500">客源地：</span> 无限制</div>
           <div>
             <span className="text-gray-500">用车租期：</span>
             <span className="inline-flex gap-4 ml-2 align-middle">
               {['每周一', '每周二', '每周三', '每周四', '每周五', '每周六', '每周日'].map(d => (
                 <label key={d} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <input type="checkbox" checked disabled className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 cursor-not-allowed" />
                    {d}
                 </label>
               ))}
             </span>
           </div>
        </div>

        {/* Requirements 3 & 4: Filters and Actions */}
        <div className="flex flex-col gap-4 mb-4">
           <h3 className="border-l-4 border-black pl-3 text-sm font-bold text-gray-800">租金定价</h3>
           
           <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-6">
                 {/* Existing checkboxes from screenshot */}
                 <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" /> 按SIPP Code 批量设置
                 </label>
                 <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" /> 按车型组 批量设置
                 </label>
                 
                 <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>

                 {/* Filters */}
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">适用门店:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm w-32">
                       <option>请选择适用门店</option>
                       <option>IX-新千岁空港</option>
                    </select>
                 </div>

                 {/* Requirement 3: Car Group Filter (Multi-select simulation) */}
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-bold text-blue-600">车型组(多选):</span>
                    <div className="relative group">
                       <button className="border border-gray-300 rounded px-2 py-1 text-sm w-32 bg-white text-left flex justify-between items-center">
                          {selectedCarGroups.length > 0 ? `${selectedCarGroups.length} 已选` : '请选择车型组'}
                          <Filter size={12} />
                       </button>
                       {/* Dropdown for multi-select */}
                       <div className="absolute top-full left-0 w-40 bg-white shadow-lg border border-gray-200 rounded mt-1 hidden group-hover:block z-20 p-2">
                          {carGroupOptions.map(opt => (
                            <label key={opt} className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer text-sm">
                               <input 
                                 type="checkbox" 
                                 checked={selectedCarGroups.includes(opt)}
                                 onChange={(e) => {
                                    if(e.target.checked) setSelectedCarGroups([...selectedCarGroups, opt]);
                                    else setSelectedCarGroups(selectedCarGroups.filter(x => x !== opt));
                                 }}
                               />
                               {opt}组
                            </label>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* SIPP Code Filter (Multi-select) */}
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-bold text-blue-600">SIPP Code(多选):</span>
                    <div className="relative group">
                       <button className="border border-gray-300 rounded px-2 py-1 text-sm w-36 bg-white text-left flex justify-between items-center">
                          {selectedSippCodes.length > 0 ? `${selectedSippCodes.length} 已选` : '请选择SIPP'}
                          <Filter size={12} />
                       </button>
                       {/* Dropdown for multi-select */}
                       <div className="absolute top-full left-0 w-48 bg-white shadow-lg border border-gray-200 rounded mt-1 hidden group-hover:block z-20 p-2 max-h-60 overflow-y-auto">
                          {sippOptions.map(opt => (
                            <label key={opt} className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer text-sm">
                               <input 
                                 type="checkbox" 
                                 checked={selectedSippCodes.includes(opt)}
                                 onChange={(e) => {
                                    if(e.target.checked) setSelectedSippCodes([...selectedSippCodes, opt]);
                                    else setSelectedSippCodes(selectedSippCodes.filter(x => x !== opt));
                                 }}
                               />
                               {opt}
                            </label>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Requirement 4: Batch Actions - Merged Button */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={openBulkSettings}
                  disabled={selectedRowIds.size === 0}
                  className={`px-4 py-1.5 text-sm rounded transition-colors ${selectedRowIds.size > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                   批量设置
                </button>
              </div>
           </div>
        </div>

        {/* Pricing Table */}
        <div className="flex-1 overflow-auto border border-gray-200 rounded">
           <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10 text-gray-600 font-medium">
                 <tr>
                    <th className="p-3 border-b border-gray-200 w-12 text-center">
                       <input 
                         type="checkbox" 
                         onChange={handleSelectAll} 
                         checked={filteredRows.length > 0 && selectedRowIds.size >= filteredRows.length} 
                       />
                    </th>
                    <th className="p-3 border-b border-gray-200">门店名称</th>
                    <th className="p-3 border-b border-gray-200">车型组</th>
                    <th className="p-3 border-b border-gray-200">SIPP码</th>
                    <th className="p-3 border-b border-gray-200">车型名称</th>
                    {MOCK_DURATIONS.map(d => (
                       <th key={d.id} className="p-3 border-b border-gray-200 w-48 text-center bg-gray-200/50">
                          {d.start}-{d.end}天
                       </th>
                    ))}
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {filteredRows.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/30">
                       <td className="p-3 text-center">
                          <input 
                            type="checkbox" 
                            checked={selectedRowIds.has(row.id)}
                            onChange={() => handleRowSelect(row.id)}
                          />
                       </td>
                       <td className="p-3 text-gray-600">{row.storeName}</td>
                       <td className="p-3 text-gray-600">{row.carGroup}</td>
                       <td className="p-3 text-gray-600">{row.sippCode}</td>
                       <td className="p-3 text-gray-600">{row.modelName}</td>
                       {MOCK_DURATIONS.map(d => (
                          <td key={d.id} className="p-2 border-l border-gray-100">
                             <div className="relative">
                                <input 
                                  type="text" 
                                  defaultValue={row.prices[d.id]} 
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-right pr-8 focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-2 top-1.5 text-xs text-gray-400">JPY</span>
                             </div>
                          </td>
                       ))}
                    </tr>
                 ))}
                 {filteredRows.length === 0 && (
                   <tr>
                     <td colSpan={5 + MOCK_DURATIONS.length} className="p-8 text-center text-gray-400">
                        暂无数据
                     </td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="mt-6 flex gap-3">
         <button className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium">保存</button>
         <button onClick={onBack} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">上一步</button>
         <button onClick={onCancel} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">取消</button>
      </div>

      <BulkPriceModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        durationColumns={MOCK_DURATIONS}
        onApply={handleBulkApply}
        selectedRows={selectedRowsList}
      />
    </div>
  );
};