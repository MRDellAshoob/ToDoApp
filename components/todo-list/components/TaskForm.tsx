import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { formatDateForDatetimeLocal } from "@/helpers/dateTimeHelper";
interface FormProps {
  initialValues?: {
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    _id?: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    _id?: string;
  }) => void;
  handleCloseModal: () => void;
}

const TaskForm: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  handleCloseModal,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prevData) => ({ ...prevData, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "0 auto" }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Start Date"
        name="start_date"
        type="datetime-local"
        value={formatDateForDatetimeLocal(formData.start_date)}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="End Date"
        name="end_date"
        type="datetime-local"
        value={formatDateForDatetimeLocal(formData.end_date)}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />

      <Box sx={{ display: "flex", marginTop: 3 }}>
        <Button
          variant="outlined"
          sx={{ marginRight: "15px" }}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialValues && Object.keys(initialValues).length
            ? "Update"
            : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
