import { useMenuPage } from '../../hooks/userMenuPage';
import HeroBanner from '../../components/menu/HerroBanner';
import MenuSidebar from '../../components/menu/MenuSidebar';
import ItemsPanel from '../../components/menu/ItemsPanel';
import AddMenuModal from '../../components/menu/AddMenuModal';
import AddItemModal from '../../components/menu/AddItemModal';

const MenuPage = () => {
  const {
    menus, flatMenuList, activeMenuId, activeMenu,
    items, isLoadingMenus, isLoadingItems,
    isMenuModalOpen, isItemModalOpen,
    menuFormik, itemFormik,
    setIsMenuModalOpen, setIsItemModalOpen,
    handleMenuClick, handleDeleteMenu, handleDeleteItem,
  } = useMenuPage();

  return (
    <div className="menu-page">
      <HeroBanner />

      <div className="menu-content">
        <MenuSidebar
          menus={menus}
          activeMenuId={activeMenuId}
          onMenuClick={handleMenuClick}
          onAddMenu={() => setIsMenuModalOpen(true)}
          onDeleteMenu={handleDeleteMenu}
          isLoading={isLoadingMenus}
        />
        <ItemsPanel
          activeMenu={activeMenu}
          items={items}
          isLoading={isLoadingItems}
          onAddItem={() => setIsItemModalOpen(true)}
          onDeleteItem={handleDeleteItem}
        />
      </div>

      <AddMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        formik={menuFormik}
        flatMenuList={flatMenuList}
      />
      <AddItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        formik={itemFormik}
        activeMenuName={activeMenu?.name}
      />
    </div>
  );
};

export default MenuPage;