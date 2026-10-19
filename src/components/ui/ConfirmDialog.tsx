import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Lanjutkan',
  cancelLabel = 'Batal',
  isDestructive = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex items-start gap-3 mt-1">
        <div className={`p-2.5 rounded-xl shrink-0 ${isDestructive ? 'bg-red-50 text-status-red' : 'bg-amber-50 text-status-amber'}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <p className="text-sm text-ink-secondary leading-relaxed">{message}</p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-ink-primary hover:bg-surface-secondary rounded-xl transition-colors cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-xs transition-colors cursor-pointer ${
            isDestructive 
              ? 'bg-status-red hover:bg-red-700' 
              : 'bg-brand-primary hover:bg-brand-dark'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
