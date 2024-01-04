import { useCallback, useMemo, useState } from 'react';

export default function useCheckbox(list) {
  const [checkedIdsSet, setCheckedIdsSet] = useState(new Set());
  const numChecked = useMemo(() => checkedIdsSet.size, [checkedIdsSet.size]);

  const updateSet = (set, id) => {
    const updatedSet = new Set(set);

    if (updatedSet.has(id)) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }

    return updatedSet;
  };

  const handleOnChange = (id) => {
    setCheckedIdsSet((prevSet) => updateSet(prevSet, id));
  };

  const toggleAllCheckedById = useCallback(
    ({ target: { checked } }) => {
      if (checked) {
        const allChecked = new Set(list?.map(({ _id }) => _id));
        setCheckedIdsSet(allChecked);
      } else {
        setCheckedIdsSet(new Set());
      }
    },
    [list],
  );

  return {
    checkedIdsSet,
    numChecked,
    handleOnChange,
    toggleAllCheckedById,
  };
}
