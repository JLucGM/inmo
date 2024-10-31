import { Switch } from '@headlessui/react';

function ToggleSwitch({ isChecked, onToggle, label, ...props }) {
  return (
    <div className="flex items-center">
      {label && <span className="mr-2">{label}</span>}
      <Switch
        checked={isChecked}
        onChange={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
          isChecked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute left-0 inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            isChecked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </Switch>
    </div>
  );
}

export default ToggleSwitch;