import React, { useState } from 'react';
import { DurationRange } from '../types';
import { Plus, Minus, Calendar, Clock, X } from 'lucide-react';

interface BasicSettingsProps {
  initialData: any;
  onNext: () => void;
  onCancel: () => void;
}

export const BasicSettings: React.FC<BasicSettingsProps> = ({ initialData, onNext, onCancel }) => {
  const [durations, setDurations] = useState<DurationRange[]>([
    { id: '1', start: 1, end: 2 },
    { id: '2', start: 3, end: 5 },
    { id: '3', start: 6, end: 365 },
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Wizard Steps Indicator */}
      <div className="mb-8 flex items-center justify-center text-sm">
         <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mb-1">1</div>
            <span className="font-bold text-gray-800">基础设置</span>
            <span className="text-xs text-gray-400">设置价格组的生效条件</span>
         </div>
         <div className="w-48 h-[1px] bg-gray-300 mx-4 mt-[-20px]"></div>
         <div className="flex flex-col items-center opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center font-bold mb-1">2</div>
            <span className="font-medium text-gray-600">设置车辆租金</span>
            <span className="text-xs text-gray-400">根据租期时长定制日租金规则</span>
         </div>
         <div className="w-48 h-[1px] bg-gray-300 mx-4 mt-[-20px]"></div>
         <div className="flex flex-col items-center opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center font-bold mb-1">3</div>
            <span className="font-medium text-gray-600">完成</span>
            <span className="text-xs text-gray-400">完成设置</span>
         </div>
      </div>

      <div className="bg-white p-8 rounded shadow-sm border border-gray-200">
        <h3 className="border-l-4 border-blue-600 pl-3 text-sm font-bold text-gray-800 mb-6">基础信息</h3>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 规则编码：</label>
            <input type="text" value="CTS003" disabled className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 规则名称：</label>
            <div className="relative">
              <input type="text" value="新千岁机场1.16-1.31" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">14 / 200</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
           <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 取用时间：</label>
           <div className="bg-gray-50 p-4 rounded border border-gray-100 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-xs text-gray-500 mb-2">下单时间：</span>
                <div className="flex items-center gap-2">
                   <div className="relative flex-1">
                      <Clock size={14} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" placeholder="开始时间" className="w-full pl-9 px-3 py-2 border border-gray-200 rounded text-sm bg-white" />
                   </div>
                   <span className="text-gray-400">至</span>
                   <div className="flex-1">
                      <input type="text" placeholder="结束时间" className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-white" />
                   </div>
                </div>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-2"><span className="text-red-500">*</span> 用车时间：</label>
                <div className="flex items-center gap-2">
                   <div className="relative flex-1">
                      <Calendar size={14} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" defaultValue="2026-01-16" className="w-full pl-9 px-3 py-2 border border-gray-300 rounded text-sm bg-white" />
                   </div>
                   <span className="text-gray-400">至</span>
                   <div className="relative flex-1">
                      <input type="text" defaultValue="2026-01-31" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white" />
                      <button className="absolute right-2 top-2 text-red-200 hover:text-red-500"><X size={16}/></button>
                   </div>
                </div>
              </div>
           </div>
        </div>

        <div className="mb-6">
           <label className="block text-xs font-medium text-gray-500 mb-2"><span className="text-red-500">*</span> 用车租期：</label>
           <div className="flex gap-4 p-3 bg-gray-50 rounded border border-gray-100">
             {['每周一', '每周二', '每周三', '每周四', '每周五', '每周六', '每周日'].map(day => (
               <label key={day} className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" />
                 <span className="text-sm text-blue-600">{day}</span>
               </label>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
           <div>
              <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 适用门店：</label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded min-h-[38px]">
                 <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                    IX-新千岁空港 <X size={10} className="cursor-pointer" />
                 </span>
              </div>
           </div>
           <div>
              <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 适用渠道：</label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded min-h-[38px]">
                 {['租租车', 'QEEQ', '客路', '线下订单', '手动导入'].map(c => (
                   <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                      {c} <X size={10} className="cursor-pointer" />
                   </span>
                 ))}
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
           <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">客源地：</label>
              <div className="flex gap-2">
                 <select className="flex-1 border border-gray-200 rounded text-sm px-2 py-2 text-gray-500"><option>请选择</option></select>
                 <span className="text-sm text-gray-400 py-2">的</span>
                 <select className="flex-1 border border-gray-200 rounded text-sm px-2 py-2 text-gray-500"><option>请选择</option></select>
              </div>
              <p className="text-xs text-gray-400 mt-1">未设置时，表示该规则不限制客源地</p>
           </div>
           <div>
             <label className="block text-xs font-medium text-gray-500 mb-1"><span className="text-red-500">*</span> 规则优先级：</label>
             <input type="number" defaultValue={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
             <p className="text-xs text-gray-400 mt-1">规则优先级数值越大，规则引擎执行顺序越靠前！</p>
           </div>
        </div>

        <h3 className="border-l-4 border-black pl-3 text-sm font-bold text-gray-800 mb-6 mt-10">租期时长</h3>
        
        <div className="mb-4">
           <label className="block text-xs font-medium text-gray-500 mb-2"><span className="text-red-500">*</span> 计价方式：</label>
           <div className="flex gap-4">
             <label className="flex items-center gap-2"><input type="radio" name="pricing" defaultChecked className="text-blue-600" /> <span className="text-sm">按天</span></label>
             <label className="flex items-center gap-2"><input type="radio" name="pricing" className="text-blue-600" /> <span className="text-sm text-gray-500">其他方式</span></label>
           </div>
        </div>

        <div className="space-y-3 mb-4">
           <div className="flex gap-8 text-xs text-gray-500 mb-1">
              <span className="w-48">租期区间（起）</span>
              <span className="w-48">租期区间（止）</span>
           </div>
           {durations.map((d, idx) => (
             <div key={d.id} className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <span className="text-red-500 w-2">*</span>
                 <input type="number" value={d.start} className="w-48 border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm" disabled />
                 <span>-</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-red-500 w-2">*</span>
                 <input type="number" value={d.end} className="w-48 border border-gray-300 rounded px-3 py-2 text-sm" />
                 <span className="text-sm text-gray-600">天</span>
               </div>
               {idx > 0 && (
                 <button className="w-6 h-6 rounded-full border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50 hover:border-red-400">
                    <Minus size={14} />
                 </button>
               )}
             </div>
           ))}
           <button className="flex items-center gap-1 text-blue-500 text-sm mt-2 hover:text-blue-600">
              <Plus size={16} /> 添加
           </button>
        </div>

      </div>

      <div className="mt-6 flex gap-3">
         <button onClick={onNext} className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium">保存并下一步</button>
         <button onClick={onCancel} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">取消</button>
      </div>
    </div>
  );
};