import type { URI } from "./types.js";
import type { ResourceRef, Ref } from "./references.js";
import type { CIMI_Operation } from "./operations.js";

// Base interface with common CIMI attributes - shared by all Resources and Collections
export interface CIMI_CommonAttributes {
    id: URI;
    updated?: Date;
    parent?: ResourceRef; // Can reference any Resource per CIMI spec 5.10.2
    
    // Unified method for all resources and collections
    getAvailableOperations(): CIMI_Operation[];
}

export abstract class CIMI_Base implements CIMI_CommonAttributes {
    protected readonly _baseUri: URI;
    protected readonly _id: string;

    updated?: Date;
    readonly parent?: ResourceRef;

    get id() {
        return this._baseUri + this._id;
    }

    constructor(baseUri: URI, parent?: ResourceRef | null, id?: URI | null) {
        this._baseUri = baseUri;
        this._id = id ?? this.generateId().toString();
        if (typeof parent !== 'undefined' && parent != null) {
            this.parent = parent;
        }
    }

    /**
     * Generates a unique 64-bit ID using Snowflake-style algorithm.
     * 
     * Structure: [Timestamp(42bit) | NodeId(10bit) | Sequence(12bit)]
     * - Timestamp: milliseconds since Jan 1, 2025 epoch
     * - NodeId: server identifier (currently hardcoded as 1)
     * - Sequence: random 0-4095 for collision avoidance
     * 
     * @returns {number} Unique chronologically-sortable ID
     */
    generateId(): number {
        const timestamp = Date.now() - 1735689600000; // Custom epoch: Jan 1, 2025
        const nodeId = 1; // Server/datacenter ID
        const sequence = Math.floor(Math.random() * 4096);

        return (timestamp << 22) | (nodeId << 12) | sequence;
    }

    // Automatically generate CIMI resource URI from class name
    getResourceURI(): string {
        const className = this.constructor.name;
        // Remove CIMI_ prefix if present and use the rest as resource name
        const resourceName = className.startsWith('CIMI_') ? className.substring(5) : className;
        return `http://schemas.dmtf.org/cimi/2/${resourceName}`;
    }

    // Serialization methods per CIMI spec 5.4
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            resourceURI: this.getResourceURI(),
            id: this.id
        };
        
        // Only include non-undefined optional attributes
        if (this.updated) {
            // Serialize as ISO 8601 string per CIMI spec 5.5.2
            result.updated = this.updated.toISOString();
        }
        if (this.parent) {
            result.parent = this.parent;
        }
        
        return result;
    }

    toString(): string {
        return JSON.stringify(this.toJSON(), null, 2);
    }
    
    // Generic reference cleanup for all CIMI resources and collections
    cleanupReferences(deletedResourceId: URI): void {
        for (const [key, value] of Object.entries(this)) {
            // Clean up single references (Ref objects)
            if (this.isRef(value) && value.href === deletedResourceId) {
                (this as any)[key] = undefined;
            } 
            // Clean up nested collections or resources
            else if (value && typeof value.cleanupReferences === 'function') {
                value.cleanupReferences(deletedResourceId);
            }
        }
    }
    
    private isRef(value: any): value is Ref {
        return value && typeof value === 'object' && 'href' in value && !Array.isArray(value);
    }

    // Abstract method - subclasses must implement their specific operations
    abstract getAvailableOperations(): CIMI_Operation[];
}

// Collection interface - for collections like MachineCollection, VolumeCollection, etc.
export interface CIMI_CollectionInterface extends CIMI_CommonAttributes {
    count: number;
    operations?: CIMI_Operation[];
    
    // Collection-specific methods (getAvailableOperations inherited from base)
    getCollectionArrayName(): string;
    add(...args: unknown[]): void;
    remove(resourceId: string): void;
}