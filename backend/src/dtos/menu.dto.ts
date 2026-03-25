export class CreateMenuDTO {
  name: string;
  description?: string;
  parentId?: string;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.parentId = data.parentId;
  }
}