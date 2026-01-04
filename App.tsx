import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RateList } from './pages/RateList';
import { BasicSettings } from './pages/BasicSettings';
import { PriceSettings } from './pages/PriceSettings';
import { Step } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.LIST);

  // Requirement 1 & 2 logic:
  // "Modify Conditions" -> Basic Settings (Step 1)
  const handleModifyConditions = () => {
    setCurrentStep(Step.BASIC_SETTINGS);
  };

  // "Edit Price" -> Price Settings (Step 2)
  const handleEditPrices = () => {
    setCurrentStep(Step.PRICE_SETTINGS);
  };

  // "Cancel" -> Back to List
  const handleCancel = () => {
    setCurrentStep(Step.LIST);
  };

  const renderContent = () => {
    switch (currentStep) {
      case Step.LIST:
        return (
          <RateList 
            onEditConditions={handleModifyConditions}
            onEditPrices={handleEditPrices} 
          />
        );
      case Step.BASIC_SETTINGS:
        return (
          <BasicSettings 
            initialData={{}} 
            onNext={() => setCurrentStep(Step.PRICE_SETTINGS)}
            onCancel={handleCancel}
          />
        );
      case Step.PRICE_SETTINGS:
        return (
          <PriceSettings 
            onBack={() => setCurrentStep(Step.BASIC_SETTINGS)}
            onCancel={handleCancel}
          />
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Layout>
      {/* Breadcrumb / Title Bar inside content could go here if global */}
      {renderContent()}
    </Layout>
  );
}

export default App;