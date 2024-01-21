import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { theme } from '@/constants/colors';

interface ChipButtonProps {
  status: string;
}

export default function ChipButton({ status }: ChipButtonProps) {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        {status === 'Ativo' ? (
          <Chip
            label={status}
            sx={{
              bgcolor: theme.palette.success.light,
              color: theme.palette.success.main
            }}
          />
        ) : (
          <Chip
            label={status}
            sx={{
              bgcolor: theme.palette.warning.light,
              color: theme.palette.warning.main
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
