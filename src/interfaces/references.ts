import { URI } from "./types.js";

// CIMI Reference type per spec 5.5.6
export interface Ref {
    href: URI;
    // Extensibility point per CIMI spec - allows additional information
    [key: string]: any;
}

export interface TypedRef<T> extends Ref {
    __type?: T; // dev-time only, never serialized
}

// Specific reference types for type safety without generics
export interface ResourceRef extends Ref {}
export interface MachineImageRef extends Ref {}
export interface MachineConfigurationRef extends Ref {}
export interface ResourceMetadataRef extends Ref {}
export interface CredentialRef extends Ref {}
export interface VolumeRef extends Ref {}
export interface NetworkRef extends Ref {}
export interface NetworkPortRef extends Ref {}
export interface AddressRef extends Ref {}
export interface EventLogRef extends Ref {}

// Collection reference types
export interface DiskCollectionRef extends Ref {}
export interface VolumeCollectionRef extends Ref {}
export interface NetworkInterfaceCollectionRef extends Ref {}
export interface MachineImageCollectionRef extends Ref {}
export interface MeterCollectionRef extends Ref {}

// Template reference types
export interface VolumeTemplateRef extends Ref {}
export interface MeterTemplateRef extends Ref {}
export interface EventLogTemplateRef extends Ref {}

// Helper function to create CIMI-compliant references
export function createRef(href: URI, additionalProps?: Record<string, any>): Ref {
    return {
        href,
        ...additionalProps
    };
}