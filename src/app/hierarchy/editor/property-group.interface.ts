export interface PropertyGroup {
    name: string;
    id: string;
    leafPropertyGroup: boolean;
    parent?: PropertyGroup;
    children?: PropertyGroup[];
}
