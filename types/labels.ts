export interface Label {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabelCreateRequest {
  id: string;
  name: string;
}

export interface LabelUpdateRequest {
  name: string;
}
