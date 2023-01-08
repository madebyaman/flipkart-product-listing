import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { createLink } from '../utils/createLink';
import { capitalizedWord } from '../utils/capitalized';

export function FilterItem({
  name,
  options,
  selected,
}: {
  name: string;
  options: string[];
  selected: string | null;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // From selected, gather which all options are checked
  let selectedOptions: string[] = [];
  if (selected) {
    selectedOptions = selected.split(':');
  }

  function selectOrUnselectOption(option: string, checked: boolean) {
    let newSelectedOptions: string[] = [];
    if (!checked) {
      // remove option
      newSelectedOptions = selectedOptions.filter(
        (givenOption) => givenOption.toLowerCase() !== option.toLowerCase()
      );
    }
    if (checked) {
      // add option
      newSelectedOptions = [...selectedOptions, option.toLowerCase()];
    }
    // generate link
    const lowercasedName = name.toLowerCase();
    let link: string | null = null;
    if (lowercasedName === 'brand') {
      link = createLink({ type: 'BRAND', param: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'size') {
      link = createLink({ type: 'SIZE', param: newSelectedOptions.join(':') });
    }
    if (lowercasedName === 'gender') {
      link = createLink({
        type: 'GENDER',
        param: newSelectedOptions.join(':'),
      });
    }
    // open the link
    link && navigate(link);
  }

  function isChecked(option: string): boolean {
    return selectedOptions.some(
      (selectedOption) => selectedOption.toLowerCase() === option.toLowerCase()
    );
  }

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{name}</span>
        {open ? (
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div>
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`filter-${option}`}
                className="mr-1 leading-tight h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                type="checkbox"
                checked={isChecked(option)}
                onChange={(e) =>
                  selectOrUnselectOption(option, e.target.checked)
                }
              />
              <label
                className="ml-1 text-sm text-gray-600"
                htmlFor={`filter-${option}`}
              >
                {capitalizedWord(option)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
