import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DurationRange, CarPriceRow } from '../types';

export type AdjustMethod = 'fixed' | 'percent';
export type BulkOperationType = 'reset' | 'increase' | 'decrease';

interface BulkPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: { type: BulkOperationType; values: any }) => void;
  durationColumns: DurationRange[];
  selectedRows: CarPriceRow[];
}

export const BulkPriceModal: React.FC<BulkPriceModalProps> = ({ isOpen, onClose, onApply, durationColumns, selectedRows }) => {
  const [operationType, setOperationType] = useState<BulkOperationType>('reset');
  
  // State for 'reset' mode
  const [resetPrices, setResetPrices] = useState<Record<string, string>>({});

  // State for 'adjust' mode (increase/decrease)
  // Store adjustment config per duration ID
  const [adjustments, setAdjustments] = useState<Record<string, { method: AdjustMethod, value: string }>>({});

  useEffect(() => {
    if (isOpen) {
      setOperationType('reset');
      setResetPrices({});
      
      // Initialize adjustments with defaults
      const initialAdjustments: Record<string, { method: AdjustMethod, value: string }> = {};
      durationColumns.forEach(d => {
        initialAdjustments[d.id] = { method: 'percent', value: '' };
      });
      setAdjustments(initialAdjustments);
    }
  }, [isOpen, durationColumns]);

  if (!isOpen) return null;

  const handleResetPriceChange = (durationId: string, val: string) => {
    setResetPrices(prev => ({ ...prev, [durationId]: val }));
  };

  const handleAdjustmentChange = (durationId: string, field: 'method' | 'value', val: string) => {
    setAdjustments(prev => ({
      ...prev,
      [durationId]: {
        ...prev[durationId],
        [field]: val
      }
    }));
  };

  const handleSubmit = () => {
    if (operationType === 'reset') {
      onApply({ type: operationType, values: resetPrices });
    } else {
      onApply({ type: operationType, values: adjustments });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[900px] max-w-full flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">批量设置价格</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Selected Conditions */}
          {selectedRows.length > 0 && (
             <div className="mb-5">
                <div className="text-sm font-medium text-gray-800 mb-2">
                   已选定 <span className="text-blue-600">{selectedRows.length}</span> 条记录，包括：
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 bg-gray-50 border border-gray-100 rounded">
                   {selectedRows.map(row => (
                      <div key={row.id} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 shadow-sm flex items-center gap-1">
                         <span className="font-medium text-gray-800">{row.storeName}</span>
                         <span className="text-gray-300">-</span>
                         <span>{row.carGroup}组</span>
                         <span className="text-gray-300">-</span>
                         <span className="font-medium text-blue-600">{row.sippCode}</span>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* Operation Type Selection */}
          <div className="flex items-center gap-8 mb-6">
             <label className="text-sm font-medium text-gray-700">调价方式：</label>
             <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="radio" 
                     name="opType" 
                     checked={operationType === 'reset'} 
                     onChange={() => setOperationType('reset')}
                     className="text-blue-600 focus:ring-blue-500"
                   />
                   <span className="text-sm text-gray-700">重设价格</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="radio" 
                     name="opType" 
                     checked={operationType === 'increase'} 
                     onChange={() => setOperationType('increase')}
                     className="text-blue-600 focus:ring-blue-500"
                   />
                   <span className="text-sm text-gray-700">统一涨价</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="radio" 
                     name="opType" 
                     checked={operationType === 'decrease'} 
                     onChange={() => setOperationType('decrease')}
                     className="text-blue-600 focus:ring-blue-500"
                   />
                   <span className="text-sm text-gray-700">统一降价</span>
                </label>
             </div>
          </div>

          {/* Dynamic Content based on Operation Type */}
          {operationType === 'reset' ? (
             <>
                <div className="bg-blue-50 border border-blue-100 rounded p-3 mb-6 text-sm text-blue-700">
                   请根据不同的租期结构，分别设置批量租金价格。留空则不修改该区间的价格。
                </div>
                <div className="space-y-4">
                   {durationColumns.map(col => (
                     <div key={col.id} className="grid grid-cols-6 gap-4 items-center">
                       <label className="text-sm text-gray-600 text-right col-span-1">
                         {col.start}-{col.end}天:
                       </label>
                       <div className="col-span-4 relative">
                         <input 
                            type="number"
                            placeholder="请输入价格"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={resetPrices[col.id] || ''}
                            onChange={(e) => handleResetPriceChange(col.id, e.target.value)}
                         />
                         <span className="absolute right-3 top-2 text-gray-400 text-xs">JPY</span>
                       </div>
                     </div>
                   ))}
                </div>
             </>
          ) : (
             <>
                <div className="space-y-4 mb-6">
                   {durationColumns.map(col => {
                     const adj = adjustments[col.id] || { method: 'percent', value: '' };
                     return (
                       <div key={col.id} className="grid grid-cols-6 gap-4 items-center">
                         <label className="text-sm text-gray-600 text-right col-span-1">
                           {col.start}-{col.end}天:
                         </label>
                         <div className="col-span-1">
                            <select 
                               className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                               value={adj.method}
                               onChange={(e) => handleAdjustmentChange(col.id, 'method', e.target.value as AdjustMethod)}
                            >
                               <option value="percent">按比例</option>
                               <option value="fixed">按金额</option>
                            </select>
                         </div>
                         <div className="col-span-3 relative">
                           <input 
                              type="number"
                              placeholder="请输入"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={adj.value}
                              onChange={(e) => handleAdjustmentChange(col.id, 'value', e.target.value)}
                           />
                           <span className="absolute right-3 top-2 text-gray-400 text-xs">
                              {adj.method === 'percent' ? '%' : 'JPY'}
                           </span>
                         </div>
                       </div>
                     );
                   })}
                </div>
                
                <div className="text-xs text-gray-400 pl-24">
                   {operationType === 'increase' 
                      ? '调价结果为：当前价 × (1 + 比例值) 或 当前价 + 金额' 
                      : '调价结果为：当前价 × (1 - 比例值) 或 当前价 - 金额'}
                </div>
             </>
          )}

        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};