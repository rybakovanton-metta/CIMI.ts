import type { URI } from "./types.js";

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
export interface SystemTemplateRef extends Ref {}
export interface SystemServiceRef extends Ref {}
export interface SystemRef extends Ref {}

// Collection reference types
export interface ResourceMetadataCollectionRef extends Ref {}
export interface SystemCollectionRef extends Ref {}
export interface SystemTemplateCollectionRef extends Ref {}
export interface SystemServiceCollectionRef extends Ref {}
export interface MachineCollectionRef extends Ref {}
export interface MachineTemplateCollectionRef extends Ref {}
export interface MachineConfigurationCollectionRef extends Ref {}
export interface MachineImageCollectionRef extends Ref {}
export interface CredentialCollectionRef extends Ref {}
export interface CredentialTemplateCollectionRef extends Ref {}
export interface VolumeCollectionRef extends Ref {}
export interface VolumeTemplateCollectionRef extends Ref {}
export interface VolumeConfigurationCollectionRef extends Ref {}
export interface VolumeImageCollectionRef extends Ref {}
export interface NetworkCollectionRef extends Ref {}
export interface NetworkTemplateCollectionRef extends Ref {}
export interface ProtocolSegmentCollectionRef extends Ref {}
export interface ProtocolSegmentTemplateCollectionRef extends Ref {}
export interface ProtocolEndpointCollectionRef extends Ref {}
export interface ProtocolEndpointTemplateCollectionRef extends Ref {}
export interface NetworkInterfaceCollectionRef extends Ref {}
export interface NetworkInterfaceTemplateCollectionRef extends Ref {}
export interface NetworkServiceCollectionRef extends Ref {}
export interface NetworkServiceTemplateCollectionRef extends Ref {}
export interface JobCollectionRef extends Ref {}
export interface MeterCollectionRef extends Ref {}
export interface MeterTemplateCollectionRef extends Ref {}
export interface MeterConfigurationCollectionRef extends Ref {}
export interface EventLogCollectionRef extends Ref {}
export interface EventLogTemplateCollectionRef extends Ref {}
export interface DiskCollectionRef extends Ref {}

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