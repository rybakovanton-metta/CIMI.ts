import type { URI, PropertiesMap } from "./types.js";
import type { ResourceRef, ResourceMetadataRef } from "./references.js";
import { createRef } from "./references.js";
import type { CIMI_Operation } from "./operations.js";
import { CIMI_Base } from "./common.js";

export abstract class CIMI_Resource extends CIMI_Base {
    name?: string;
    description?: string;
    created?: Date;
    properties?: PropertiesMap;
    resourceMetadata?: ResourceMetadataRef;

    constructor(baseUri: URI, id?: URI, name?: string, description?: string, parent?: ResourceRef) {
        super(baseUri, parent, id)
        this.description = description;
        this.name = name;
        this.created = new Date(); // Set creation time
    }

    addProperty(key: string, value: string): void {
        if (!this.properties) {
            this.properties = {};
        }
        // Don't add empty strings per CIMI spec 5.5.5
        if (value !== '') {
            this.properties[key] = value;
        }
    }
    
    getProperty(key: string): string | undefined {
        return this.properties?.[key];
    }

    removeProperty(key: string): boolean {
        if (this.properties && key in this.properties) {
            delete this.properties[key];
            return true;
        }
        return false;
    }

    hasProperty(key: string): boolean {
        return this.properties ? key in this.properties : false;
    }

    // Override toJSON to include CIMI_Resource properties per spec 5.4
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON()
        };
        
        // Only include non-empty optional attributes per CIMI spec 5.5.5
        if (this.name && this.name !== '') {
            result.name = this.name;
        }
        if (this.description && this.description !== '') {
            result.description = this.description;
        }
        if (this.created) {
            // Serialize as ISO 8601 string per CIMI spec 5.5.2
            result.created = this.created.toISOString();
        }
        // Only include non-empty properties map per CIMI spec 5.5.7
        if (this.properties && Object.keys(this.properties).length > 0) {
            result.properties = this.properties;
        }
        if (this.resourceMetadata) {
            result.resourceMetadata = this.resourceMetadata;
        }
        
        // Include operations in serialization per CIMI spec
        const operations = this.getAvailableOperations();
        if (operations.length > 0) {
            result.operations = operations;
        }
        
        return result;
    }
    
    // Abstract method - each resource type must define its specific supported operations
    // Example implementation for typical editable resources:
    // getAvailableOperations(): CIMI_Operation[] {
    //     return [
    //         { rel: CIMI_Operations.EDIT, href: `${this.id}` },
    //         { rel: CIMI_Operations.DELETE, href: `${this.id}` }
    //     ];
    // }
    abstract getAvailableOperations(): CIMI_Operation[];
    
    // Resource relationship management per CIMI spec 5.10
    private _childComponents: Map<URI, CIMI_Resource> = new Map();
    
    addChildComponent(child: CIMI_Resource): void {
        this._childComponents.set(child.id, child);
        // Set child's parent to this resource per spec 5.10.2
        (child as any).parent = createRef(this.id);
    }
    
    removeChildComponent(childId: URI): void {
        this._childComponents.delete(childId);
    }
    
    getChildComponents(): CIMI_Resource[] {
        return Array.from(this._childComponents.values());
    }
    
    // Generic cleanupReferences implementation inherited from CIMI_Base
    
    deleteWithCascade(): void {
        // Delete all child components per CIMI spec 5.10.2
        for (const child of this._childComponents.values()) {
            if ('deleteWithCascade' in child && typeof child.deleteWithCascade === 'function') {
                (child as any).deleteWithCascade();
            }
        }
        this._childComponents.clear();
        
        // Clean up references to this resource
        // This would typically invoke notifying a resource manager
        console.log(`Deleted resource ${this.id} with cascade`);
    }
}