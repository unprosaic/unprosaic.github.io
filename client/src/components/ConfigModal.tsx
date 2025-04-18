import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { themes } from './themes';
import { useConfig } from '@/context/ConfigContext';
import { formatDate, formatTime } from '@/lib/utils';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig } = useConfig();
  
  // Form state
  const [name, setName] = useState(config.recipientName);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState(config.birthdayMessage);
  const [age, setAge] = useState(config.age);
  const [selectedTheme, setSelectedTheme] = useState(config.theme);

  // Format date for form inputs when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(config.recipientName);
      setDate(config.birthdayDate.toISOString().split('T')[0]);
      setTime(config.birthdayDate.toTimeString().slice(0, 5));
      setMessage(config.birthdayMessage);
      setAge(config.age);
      setSelectedTheme(config.theme);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    // Create date from form inputs
    const birthdayDate = new Date(`${date}T${time}`);
    
    // Update config
    updateConfig({
      recipientName: name,
      birthdayDate,
      birthdayMessage: message,
      age,
      theme: selectedTheme
    });
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 
                className="font-pacifico text-2xl"
                style={{ color: 'var(--primary)' }}
              >
                Settings
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            {/* Theme Options */}
            <div className="mb-6">
              <h4 className="font-quicksand font-semibold text-lg mb-4">Choose Theme</h4>
              <div className="grid grid-cols-3 gap-4">
                {themes.map(theme => (
                  <div 
                    key={theme.id}
                    className={`theme-option rounded-lg overflow-hidden cursor-pointer ${selectedTheme === theme.id ? 'outline outline-offset-2' : ''}`}
                    style={{ outlineColor: selectedTheme === theme.id ? theme.colors.primary : 'transparent' }}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      updateConfig({ theme: theme.id });
                    }}
                  >
                    <div 
                      className="h-16 bg-gradient-to-r"
                      style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})` }}
                    ></div>
                    <div className="py-2 text-center text-xs font-medium">{theme.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Birthday Configuration */}
            <Collapsible className="mb-6">
              <CollapsibleTrigger className="flex items-center w-full">
                <h4 className="font-quicksand font-semibold text-lg">Birthday Settings</h4>
                <i className="fas fa-chevron-down ml-2"></i>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      '--tw-ring-color': 'var(--primary)',
                      'color': 'var(--primary)'
                    } as React.CSSProperties}
                    placeholder="Enter name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthday Date</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthday Time</label>
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 22)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
                    min="1"
                    max="150"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Birthday Message</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-20"
                    style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
                    placeholder="Enter your custom birthday message"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <button 
              onClick={handleSave}
              className="w-full font-medium py-2 px-4 rounded-md transition-colors text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Save Changes
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfigModal;
