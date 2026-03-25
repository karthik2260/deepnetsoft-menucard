import type { FormikProps } from 'formik';
import type { ItemFormValues } from '../../types/menuTypes';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: FormikProps<ItemFormValues>;
  activeMenuName?: string;
}

const AddItemModal = ({ isOpen, onClose, formik, activeMenuName }: AddItemModalProps) => {
  if (!isOpen) return null;

  const handleClose = () => { formik.resetForm(); onClose(); };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">ADD MENU ITEM</h2>
            {activeMenuName && <span className="modal-subtitle">to {activeMenuName}</span>}
          </div>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={formik.handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Item Name *</label>
            <input
              type="text"
              name="name"
              className={`form-input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Fire Cracker Salmon"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="error-msg">{formik.errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Price ($) *</label>
            <input
              type="number"
              name="price"
              className={`form-input ${formik.touched.price && formik.errors.price ? 'input-error' : ''}`}
              placeholder="e.g. 16"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min="0"
              step="0.01"
            />
            {formik.touched.price && formik.errors.price && (
              <span className="error-msg">{formik.errors.price as string}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className={`form-input form-textarea ${formik.touched.description && formik.errors.description ? 'input-error' : ''}`}
              placeholder="Brief description..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="error-msg">{formik.errors.description}</span>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>CANCEL</button>
            <button type="submit" className="btn-submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;