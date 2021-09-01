import PropTypes from 'prop-types';
import { StyledLabel, StyledCheckbox } from './StyledHardCodedCheckComponents';

const HardCodeContactsCheckbox = ({ onHardCodedCheckboxChange, isHardCodedContactsUsed }) => {
  return (
    <StyledLabel>
      <StyledCheckbox
        type="checkbox"
        name="useHardCoded"
        onChange={onHardCodedCheckboxChange}
        checked={isHardCodedContactsUsed}
        disabled={isHardCodedContactsUsed}
      />
      Use hard-coded contacts
    </StyledLabel>
  );
};

HardCodeContactsCheckbox.propTypes = {
  onHardCodedCheckboxChange: PropTypes.func,
};

export default HardCodeContactsCheckbox;
