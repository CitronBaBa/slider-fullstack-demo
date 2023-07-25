import { Duty } from '@fullstack-demo/domain';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteOne, EntityType, findAll, updateOne } from '~/api/entityRestApi';
import { Logger } from '~/util/logger';
import { DutyEditDialog } from './DutyEditDialog';

export const DutyList = (): React.ReactElement => {
  const [dutyToEdit, setDutyToEdit] = useState<Duty | undefined>(undefined);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [duties, setDuties] = useState<Duty[]>([]);

  useEffect(() => {
    fetchDuties();
  }, []);

  const fetchDuties = async (): Promise<void> => {
    try {
      const results = await findAll<Duty>(EntityType.Duty);
      setDuties(results);
    } catch (error: unknown) {
      Logger.error(error);
    }
  };

  const toggleDutyComplete = async (duty: Duty): Promise<void> => {
    const updated = await updateOne(EntityType.Duty, duty.id, {
      ...duty,
      completed: !duty.completed,
      completedAt: new Date(),
    });
    setDuties(duties.map(d => (d.id === updated.id ? updated : d)));
  };

  const deleteDuty = async (id: number): Promise<void> => {
    await deleteOne(EntityType.Duty, id);
    setDuties(duties.filter(duty => duty.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h1"
          sx={{
            p: '2rem 0 1rem 0',
            fontFamily: 'fantasy',
            fontSize: '2rem',
          }}
          color="primary"
        >
          Duty List
        </Typography>
        <IconButton onClick={() => setOpenEditDialog(true)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <List>
        {duties
          .filter(duty => !duty.completed)
          .map(duty => (
            <DutyListItem
              key={duty.id}
              duty={duty}
              onEdit={d => {
                setDutyToEdit(d);
                setOpenEditDialog(true);
              }}
              onDelete={async id => deleteDuty(id)}
              onToggle={async d => toggleDutyComplete(d)}
            />
          ))}
        {duties
          .filter(duty => duty.completed)
          .map(duty => (
            <DutyListItem
              key={duty.id}
              duty={duty}
              onEdit={d => {
                setDutyToEdit(d);
                setOpenEditDialog(true);
              }}
              onDelete={async id => deleteDuty(id)}
              onToggle={async d => toggleDutyComplete(d)}
            />
          ))}
      </List>
      <DutyEditDialog
        inputDuty={dutyToEdit}
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          setDutyToEdit(undefined);
        }}
        onSave={() => {
          fetchDuties();
        }}
      />
    </Container>
  );
};

const DutyListItem = ({
  duty,
  onToggle,
  onDelete,
  onEdit,
}: {
  duty: Duty;
  onEdit: (duty: Duty) => void;
  onToggle: (duty: Duty) => void;
  onDelete: (id: number) => void;
}): React.ReactElement => {
  return (
    <ListItem key={duty.id}>
      <ListItemText
        primary={duty.title}
        secondary={duty.description}
        primaryTypographyProps={{
          variant: 'h6',
          color: duty.completed ? 'textSecondary' : 'primary',
        }}
        secondaryTypographyProps={{
          color: duty.completed ? 'textSecondary' : 'inherit',
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            onEdit(duty);
          }}
        >
          <EditIcon />
        </IconButton>
        <Checkbox
          checked={duty.completed}
          onChange={() => {
            onToggle(duty);
          }}
        />
        <IconButton
          onClick={() => {
            onDelete(duty.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
