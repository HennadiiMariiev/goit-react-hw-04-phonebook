import PropTypes from "prop-types";
import { StyledInput, StyledLabel } from "./StyledFilterComponents";

const Filter = ({ onFilterChange, filter, disabled }) => {
  return (
    <div>
      <StyledLabel>
        Search
        <StyledInput
          type="text"
          name="search"
          placeholder="Please, type search name"
          value={filter}
          onChange={onFilterChange}
          disabled={disabled}
        />
      </StyledLabel>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

export default Filter;
