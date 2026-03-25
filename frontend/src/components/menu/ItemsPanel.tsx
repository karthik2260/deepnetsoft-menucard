import type { MenuItem, MenuNode } from '../../types/menuTypes';

interface ItemsPanelProps {
  activeMenu: MenuNode | null;
  items: MenuItem[];
  isLoading: boolean;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
}

const ItemsPanel = ({ activeMenu, items, isLoading, onAddItem, onDeleteItem }: ItemsPanelProps) => {
  if (!activeMenu) {
    return (
      <div className="items-panel items-panel-empty">
        <div className="items-empty-state">
          <div className="empty-icon">🍽</div>
          <p>Select a menu from the sidebar to view its items.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="items-panel">
      <div className="items-header">
        <div className="items-header-left">
          <h2 className="items-menu-title">{activeMenu.name.toUpperCase()}</h2>
          {activeMenu.description && (
            <p className="items-menu-desc">{activeMenu.description}</p>
          )}
        </div>
        <button className="btn-add-item" onClick={onAddItem}>+ ADD ITEM</button>
      </div>

      <div className="items-divider" />

      {isLoading ? (
        <div className="items-loading">
          <div className="loading-dots"><span /><span /><span /></div>
        </div>
      ) : items.length === 0 ? (
        <div className="items-empty">
          <p>No items in this menu yet.</p>
          <p className="items-empty-sub">Click <strong>+ ADD ITEM</strong> to get started.</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="item-row">
              <div className="item-info">
                <div className="item-name-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-dots">................................</span>
                  <span className="item-price">${item.price}</span>
                </div>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
              </div>
              <button className="item-delete" onClick={() => onDeleteItem(item._id)} title="Remove item">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ItemsPanel;