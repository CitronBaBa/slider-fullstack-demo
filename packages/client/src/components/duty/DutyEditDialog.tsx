import { Duty } from '@fullstack-demo/domain';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { createOne, EntityType, updateOne } from '~/api/entityRestApi';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueAt: Yup.date().nullable(),
});

export const DutyEditDialog = ({
  open,
  inputDuty,
  onClose,
  onSave,
}: {
  open: boolean;
  inputDuty?: Duty;
  onClose: () => void;
  onSave: (duty: Duty) => void;
}): React.ReactElement => {
  const onSubmit = async (val: Partial<Duty>): Promise<void> => {
    const result = inputDuty
      ? await updateOne(EntityType.Duty, inputDuty?.id, val)
      : await createOne(EntityType.Duty, val);
    onSave(result);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ pt: '2em' }}>
        <Formik
          initialValues={
            inputDuty ?? {
              title: '',
              description: '',
              completed: false,
              completedAt: null,
              dueAt: null,
            }
          }
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          spellCheck={true}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  fullWidth
                  required
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  fullWidth
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <Field name="dueAt">
                  {({ field, form }: any) => (
                    <DateTimePicker
                      label="Due At"
                      ampm={false}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={date =>
                        form.setFieldValue(field.name, date?.toDate())
                      }
                    />
                  )}
                </Field>

                <DialogActions>
                  <Button type="submit" variant="contained" color="primary">
                    Confirm
                  </Button>
                  <Button onClick={onClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
