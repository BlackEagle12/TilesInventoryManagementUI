"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../../../components/ui/dialog";

type WarningDialogProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isOpen: boolean;
};

export const WarningDialog = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isOpen
}: WarningDialogProps) => {

  const handleClose = () => {
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <Dialog open={isOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{description}</p>
          <DialogFooter>
            <Button variant="ghost" onClick={handleClose}>
              {cancelLabel}
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
