import { useState } from 'react';
import type { MenuNode } from '../../types/menuTypes';

interface MenuTreeNodeProps {
  node: MenuNode;
  activeMenuId: string | null;
  onMenuClick: (id: string) => void;
  onDeleteMenu: (id: string) => void;
  depth?: number;
}

const MenuTreeNode = ({ node, activeMenuId, onMenuClick, onDeleteMenu, depth = 0 }: MenuTreeNodeProps) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children?.length > 0;
  const isActive = activeMenuId === node._id;

  return (
    <div className={`menu-tree-node depth-${depth}`}>
      <div
        className={`menu-node-row ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${16 + depth * 20}px` }}
      >
        {hasChildren ? (
          <button className="tree-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
            {expanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="tree-leaf-dot">•</span>
        )}

        <span className="menu-node-name" onClick={() => onMenuClick(node._id)}>
          {node.name}
        </span>

        <button
          className="menu-node-delete"
          onClick={(e) => { e.stopPropagation(); onDeleteMenu(node._id); }}
          title="Delete menu"
        >
          ✕
        </button>
      </div>

      {hasChildren && expanded && (
        <div className="menu-children">
          {node.children.map((child) => (
            <MenuTreeNode
              key={child._id}
              node={child}
              activeMenuId={activeMenuId}
              onMenuClick={onMenuClick}
              onDeleteMenu={onDeleteMenu}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MenuSidebarProps {
  menus: MenuNode[];
  activeMenuId: string | null;
  onMenuClick: (id: string) => void;
  onAddMenu: () => void;
  onDeleteMenu: (id: string) => void;
  isLoading: boolean;
}

const MenuSidebar = ({ menus, activeMenuId, onMenuClick, onAddMenu, onDeleteMenu, isLoading }: MenuSidebarProps) => (
  <aside className="menu-sidebar">
    <div className="sidebar-header">
      <h3 className="sidebar-title">MENU</h3>
      <button className="btn-add-menu" onClick={onAddMenu}>+ ADD MENU</button>
    </div>

    <div className="sidebar-tree">
      {isLoading ? (
        <div className="sidebar-loading">
          <div className="loading-dots"><span /><span /><span /></div>
        </div>
      ) : menus.length === 0 ? (
        <div className="sidebar-empty">
          <p>No menus yet.</p>
          <p>Click + ADD MENU to create one.</p>
        </div>
      ) : (
        menus.map((menu) => (
          <MenuTreeNode
            key={menu._id}
            node={menu}
            activeMenuId={activeMenuId}
            onMenuClick={onMenuClick}
            onDeleteMenu={onDeleteMenu}
          />
        ))
      )}
    </div>
  </aside>
);

export default MenuSidebar;