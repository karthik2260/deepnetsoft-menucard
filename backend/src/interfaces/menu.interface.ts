export interface MenuNode {
  _id: string;
  name: string;
  description?: string | undefined;
  parentId?: string | null | undefined;
  children: MenuNode[];
}