"use client";
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string | number;
  showCloseButton?: boolean;
  actions?: React.ReactNode; // For custom footer actions
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 500,
  showCloseButton = true,
  actions,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="base-modal-title"
      aria-describedby="base-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: "90%",
          maxWidth: maxWidth,
        }}
      >
        {title && (
          <Typography
            id="base-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>
        )}
        <Box id="base-modal-description" sx={{ mb: 2 }}>
          {children}
        </Box>
        {actions && <Box sx={{ textAlign: "right", mt: 3 }}>{actions}</Box>}
        {showCloseButton && (
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ mt: 3 }}
            fullWidth={false}
          >
            Close
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default BaseModal;
