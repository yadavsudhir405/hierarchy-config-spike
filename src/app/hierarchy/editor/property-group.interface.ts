export interface PropertyGroup {
    name: string;
    id: string;
    leafPropertyGroup: boolean;
    children?: PropertyGroup[];
}
