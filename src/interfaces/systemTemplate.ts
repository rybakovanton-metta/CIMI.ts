import type { URI, PropertiesMap } from "./types.js";
import type { CIMI_Resource } from "./resource.js";
import type { 
    MeterTemplateRef, 
    EventLogTemplateRef, 
    ResourceMetadataRef 
} from "./references.js";

// Component descriptor for SystemTemplate
export interface CIMI_ComponentDescriptor {
    name?: string;
    description?: string;
    properties?: PropertiesMap;
    type: URI; // TypeURI of the component (e.g., http://schemas.dmtf.org/cimi/2/Machine)
    quantity?: number; // Default 1
    // The component resource can be:
    // - An inline Template (with references)
    // - A reference to an external Template 
    // - A reference to an existing Resource to associate
    [componentResource: string]: any; // Dynamic component resource based on type
}

// Service descriptor for SystemTemplate
export interface CIMI_ServiceDescriptor {
    name?: string;
    description?: string;
    properties?: PropertiesMap;
    serviceType: URI; // e.g., http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery
    parameters?: PropertiesMap; // Additional service-specific attributes
}

// High Reliability service specific parameters
export interface CIMI_HighReliabilityServiceParameters {
    machines?: string[]; // Symbolic references to Machine components (#<name>)
    network?: string; // Symbolic reference to Network Resource (#<name>)
    heartbeat?: number; // Heartbeat frequency in milliseconds
    replicationType?: 'synchronous' | 'asynchronous' | 'none' | 'onlyAtClusterCreation';
    RPO?: number; // Recovery Point Objective in minutes
}

// SystemTemplate interface extending CIMI_Resource
export interface CIMI_SystemTemplateInterface extends CIMI_Resource {
    componentDescriptors?: CIMI_ComponentDescriptor[];
    serviceDescriptors?: CIMI_ServiceDescriptor[];
    meterTemplates?: MeterTemplateRef[];
    eventLogTemplate?: EventLogTemplateRef;
    importImage?: URI; // URI reference if template results from import (e.g., OVF)
    genResourceMetadata?: ResourceMetadataRef;
}

// Export action parameters for SystemTemplate
export interface CIMI_SystemTemplateExportAction {
    format?: string; // Default: "application/ovf"
    destination?: URI;
    properties?: PropertiesMap;
}

// Import action parameters for SystemTemplateCollection
export interface CIMI_SystemTemplateImportAction {
    source: URI; // Mandatory
    properties?: PropertiesMap; // For credentials, etc.
}