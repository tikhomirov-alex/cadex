export type PrimitiveType = 'Box' | 'Pyramid';

export interface PrimitiveItem {
  name: string;
  type: PrimitiveType;
  color: string;
  position: string;
  materialUUID: string;
  checked: boolean;
}
