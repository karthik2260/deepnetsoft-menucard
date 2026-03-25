import  type { FormikProps } from 'formik';
import type { MenuFormValues, MenuNode } from '../../types/menuTypes';

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: FormikProps<MenuFormValues>;
  flatMenuList: Array<MenuNode & { depth: number }>;
}

const AddMenuModal = ({ isOpen, onClose, formik, flatMenuList }: AddMenuModalProps) => {
  if (!isOpen) return null;

  const handleClose = () => { formik.resetForm(); onClose(); };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">ADD MENU</h2>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={formik.handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Menu Name *</label>
            <input
              type="text"
              name="name"
              className={`form-input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Drinks"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="error-msg">{formik.errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className={`form-input form-textarea ${formik.touched.description && formik.errors.description ? 'input-error' : ''}`}
              placeholder="Brief description of the menu..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="error-msg">{formik.errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Parent Menu <span className="optional-tag">(optional — for sub-menus)</span>
            </label>
            <select
              name="parentId"
              className="form-input form-select"
              value={formik.values.parentId || ''}
              onChange={(e) => formik.setFieldValue('parentId', e.target.value || null)}
              onBlur={formik.handleBlur}
            >
              <option value="">None (top-level menu)</option>
              {flatMenuList.map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {'  '.repeat(menu.depth)}{menu.depth > 0 ? '↳ ' : ''}{menu.name}
                </option>
              ))}
            </select>
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

export default AddMenuModal;