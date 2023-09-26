import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';

export default function Calender({
  onChange,
  value,
}: {
  onChange: (date: string | undefined) => void;
  value?: string;
}) {
  const [date, setValue] = React.useState<Dayjs | null>(
    dayjs(value || new Date())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DateField
          label="Controlled field"
          value={date}
          onChange={(newValue) => {
            setValue(date);
            onChange(newValue?.toISOString());
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
