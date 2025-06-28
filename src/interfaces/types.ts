// URI alias for clarity
export type URI = string;
export type Base64String = string;
export type ResourceId = string;

type Scalar = string | number;

interface ScopeStructValue {
    value: Scalar;
    units?: string;
}

interface ScopeStructRange {
    minimum?: Scalar;
    maximum?: Scalar;
    increment?: Scalar;
    default?: Scalar;
    units?: string;
}

interface ScopeStructEnum {
  values: Scalar[];
  default?: Scalar;
  units?: string;
}

interface ScopeStructUnitsOnly {
  units: string;
}

interface ScopeStructItem {
  item: {
    [attribute: string]: ScopeStructEnum | ScopeStructValue | ScopeStructRange | ScopeStructUnitsOnly;
  };
}

type ValueScopeType =
  | ScopeStructValue
  | ScopeStructRange
  | ScopeStructEnum
  | ScopeStructUnitsOnly
  | ScopeStructItem;

export interface ValueScope {
    [key: string]: ValueScopeType;
}

// Properties are key-value pairs per CIMI spec 5.5.7 map type
export type PropertiesMap = Record<string, string>;