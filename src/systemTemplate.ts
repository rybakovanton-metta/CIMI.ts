import { CIMI_Resource } from "./interfaces/resource.js";
import type { URI, ResourceId } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { 
    CIMI_SystemTemplateInterface,
    CIMI_ComponentDescriptor,
    CIMI_ServiceDescriptor,
    CIMI_SystemTemplateExportAction
} from "./interfaces/systemTemplate.js";
import type { 
    MeterTemplateRef, 
    EventLogTemplateRef, 
    ResourceMetadataRef 
} from "./interfaces/references.js";

export abstract class CIMI_SystemTemplate extends CIMI_Resource implements CIMI_SystemTemplateInterface {
    abstract componentDescriptors?: CIMI_ComponentDescriptor[];
    abstract serviceDescriptors?: CIMI_ServiceDescriptor[];
    abstract meterTemplates?: MeterTemplateRef[];
    abstract eventLogTemplate?: EventLogTemplateRef;
    abstract importImage?: URI;
    abstract genResourceMetadata?: ResourceMetadataRef;

    constructor(baseUri: URI, id?: URI, name?: string, description?: string, parent?: ResourceRef) {
        super(baseUri, id, name, description, parent);
    }

    // CRUD Operations
    abstract read(resourceId: ResourceId): CIMI_SystemTemplateInterface;
    abstract update(systemTemplate: CIMI_SystemTemplateInterface): boolean;
    abstract delete(resourceId: ResourceId): boolean;

    // Custom Operations
    abstract export(action: CIMI_SystemTemplateExportAction): boolean;

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.EDIT, href: `${this.id}` },
            { rel: CIMI_Operations.DELETE, href: `${this.id}` },
            { rel: "http://schemas.dmtf.org/cimi/2/action/export", href: `${this.id}` }
        ];
    }

    // Override toJSON to include SystemTemplate specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON()
        };

        // Include optional arrays and references if they exist
        if (this.componentDescriptors && this.componentDescriptors.length > 0) {
            result.componentDescriptors = this.componentDescriptors;
        }
        if (this.serviceDescriptors && this.serviceDescriptors.length > 0) {
            result.serviceDescriptors = this.serviceDescriptors;
        }
        if (this.meterTemplates && this.meterTemplates.length > 0) {
            result.meterTemplates = this.meterTemplates;
        }
        if (this.eventLogTemplate) {
            result.eventLogTemplate = this.eventLogTemplate;
        }
        if (this.importImage) {
            result.importImage = this.importImage;
        }
        if (this.genResourceMetadata) {
            result.genResourceMetadata = this.genResourceMetadata;
        }

        return result;
    }

    // Helper methods for working with component descriptors
    addComponentDescriptor(descriptor: CIMI_ComponentDescriptor): void {
        if (!this.componentDescriptors) {
            this.componentDescriptors = [];
        }
        this.componentDescriptors.push(descriptor);
    }

    removeComponentDescriptor(name: string): boolean {
        if (!this.componentDescriptors) return false;
        
        const index = this.componentDescriptors.findIndex(desc => desc.name === name);
        if (index !== -1) {
            this.componentDescriptors.splice(index, 1);
            return true;
        }
        return false;
    }

    getComponentDescriptor(name: string): CIMI_ComponentDescriptor | undefined {
        return this.componentDescriptors?.find(desc => desc.name === name);
    }

    // Helper methods for working with service descriptors
    addServiceDescriptor(descriptor: CIMI_ServiceDescriptor): void {
        if (!this.serviceDescriptors) {
            this.serviceDescriptors = [];
        }
        this.serviceDescriptors.push(descriptor);
    }

    removeServiceDescriptor(name: string): boolean {
        if (!this.serviceDescriptors) return false;
        
        const index = this.serviceDescriptors.findIndex(desc => desc.name === name);
        if (index !== -1) {
            this.serviceDescriptors.splice(index, 1);
            return true;
        }
        return false;
    }

    getServiceDescriptor(name: string): CIMI_ServiceDescriptor | undefined {
        return this.serviceDescriptors?.find(desc => desc.name === name);
    }
}