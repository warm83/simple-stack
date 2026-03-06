import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { TaskPriority } from '../types/task'

type PrioritySelectProps = {
  value: TaskPriority
  onChange: (value: TaskPriority) => void
}

export default function PrioritySelect({
  value,
  onChange,
}: PrioritySelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TaskPriority)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="priority-label">優先度</InputLabel>
      <Select
        labelId="priority-label"
        label="優先度"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="low">低</MenuItem>
        <MenuItem value="medium">中</MenuItem>
        <MenuItem value="high">高</MenuItem>
      </Select>
    </FormControl>
  )
}
