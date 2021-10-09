import React from 'react';
import { number, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ValueSlider from './ValueSlider';

const BetSize = ({
  betSize, min, max, updateBetSize
}) => (
  <div className="form-group">
    <b>
      <FormattedMessage
        id="betsize.betsize"
        defaultMessage="Bet"
      />
    </b>
    <ValueSlider value={betSize} updateValue={updateBetSize} step={0.05} min={0.1} max={max} addonText="BNB" toFixedDigits={8} />
  </div>
);
BetSize.propTypes = {
  betSize: number.isRequired,
  min: number,
  max: number,
  updateBetSize: func.isRequired,
};
BetSize.defaultProps = {
  min: 0.1,
  max: 0.25
};

export default BetSize;
