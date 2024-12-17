import { useSearchFilter } from './SearchAndFilter';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const FilterDropdown = () => {
  const { menu, setMenu } = useSearchFilter();
  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={menu}
          label={menu}
          onChange={(e) => setMenu(e.target.value)}
        >
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'draft'}>Draft</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterDropdown;
