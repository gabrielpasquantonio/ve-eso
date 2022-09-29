import Switcher from 'components/Switcher/Switcher';
import { filterOptions } from 'models/enums/filterOptions';
import { validRoutes } from 'models/enums/validRoutes';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface FeedFilterProps {
  selectedMode: any;
}
const FeedFilter: React.FC<FeedFilterProps> = (props) => {
  const { selectedMode } = props;

  const history = useHistory();

  const [selectedOption, setSelectedOption] = useState(0);

  const checkWhichOptionIsSelected = useCallback(() => {
    if (history.location.pathname.indexOf(validRoutes.FILTER_FOLLOWING) > -1) {
      selectedMode(filterOptions[1].value);
      setSelectedOption(1);

      return;
    }

    selectedMode(filterOptions[0].value);
    setSelectedOption(0);
  }, [history.location.pathname, selectedMode]);

  useEffect(() => {
    checkWhichOptionIsSelected();
  }, [checkWhichOptionIsSelected]);

  const handleOnChangeSwitcher = (selectedSwitcherOption: any): void => {
    history.push(selectedSwitcherOption);
    checkWhichOptionIsSelected();
  };

  return (
    <Switcher
      options={filterOptions}
      optionChecked={selectedOption}
      onChange={handleOnChangeSwitcher}
      data-testid="FeedFilter"
    />
  );
};

export default React.memo(FeedFilter);
