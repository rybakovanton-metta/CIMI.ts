import { CIMI_Base } from "./common.js";
import type { CIMI_CollectionInterface } from "./common.js";
import type { CIMI_Operation } from "./operations.js";
import { CIMI_Operations } from "./operations.js";
import type { ResourceId, URI } from "./types.js";
import type { ResourceRef, Ref, VolumeRef } from "./references.js";
import type { CIMI_MachineTemplate } from "./machine.js";


// Base collection item interface following CIMI specification
export interface CIMI_CollectionItem {
    id: ResourceId;
    name?: string;
    description?: string;
    created?: Date;
    updated?: Date;
    parent?: ResourceRef;
    properties?: Record<string, string>;
    operations?: Array<{rel: string, href: URI}>;
    // Resource reference
    resourceRef: Ref;
    // Note: resourceURI is handled by serialization
    // Note: Accessory attributes and expanded resource attributes are added in specific item types
}

export abstract class CIMI_Collection extends CIMI_Base implements CIMI_CollectionInterface {

    private _collection: Map<ResourceId, CIMI_CollectionItem>;

    //#region Getters
    get collection(): Map<ResourceId, CIMI_CollectionItem> {
        return this._collection;
    }

    get count(): number {
        return this._collection.size;
    }
    //#endregion Getters

    constructor(baseUri: URI, id?: URI, parent?: ResourceRef) {
        super(baseUri, parent, id);
        this._collection = new Map();
    }

    // Abstract methods that subclasses must implement
    abstract add(...args: unknown[]): void;
    
    // Get the collection-specific array name for serialization
    // e.g., "machines", "volumes", "locatedVolumes"
    abstract getCollectionArrayName(): string;

    getItem(resourceId: ResourceId): CIMI_CollectionItem | undefined {
        return this._collection.get(resourceId);
    }

    insert(item: CIMI_CollectionItem): void {
        if (!this._collection.has(item.id)) {
            this._collection.set(item.id, item);
        }
    }

    remove(resourceId: ResourceId): void {
        if (this._collection.has(resourceId)) {
            this._collection.delete(resourceId);
        }
    }

    // Abstract method - each collection type must define its specific supported operations
    // Example implementation for typical modifiable collections:
    // getAvailableOperations(): CIMI_Operation[] {
    //     return [
    //         { rel: CIMI_Operations.ADD, href: `${this.id}/add` },
    //         { rel: CIMI_Operations.INSERT, href: `${this.id}/insert` },
    //         { rel: CIMI_Operations.REMOVE, href: `${this.id}/remove` }
    //     ];
    // }
    abstract getAvailableOperations(): CIMI_Operation[];

    // Override toJSON to include collection-specific serialization per CIMI spec
    toJSON(): Record<string, any> {
        const items = Array.from(this._collection.values());
        const arrayName = this.getCollectionArrayName();
        const operations = this.getAvailableOperations();
        
        const result: Record<string, any> = {
            ...super.toJSON(),
            count: this.count
        };
        
        // Only include items array if not empty per CIMI spec 5.5.11
        if (items.length > 0) {
            result[arrayName] = items;
        }
        
        // Include operations
        if (operations.length > 0) {
            result.operations = operations;
        }
        
        return result;
    }
}


// Enhanced collection item types with accessory attributes

// Located Volume item (enhanced with initialLocation accessory attribute)
export interface CIMI_LocatedVolumeItem extends CIMI_CollectionItem {
    initialLocation?: string;  // Accessory attribute for volume location
    volume: VolumeRef;     // Volume reference
}

// Disk item (basic collection item)
export interface CIMI_DiskItem extends CIMI_CollectionItem {
    // No accessory attributes for disks - uses standard resourceRef
}

// Network Interface item (basic collection item)  
export interface CIMI_NetworkInterfaceItem extends CIMI_CollectionItem {
    // No accessory attributes for network interfaces - uses standard resourceRef
}

// Meter item (basic collection item)
export interface CIMI_MeterItem extends CIMI_CollectionItem {
    // No accessory attributes for meters - uses standard resourceRef
}

// Machine Image (Snapshot) item (basic collection item)
export interface CIMI_MachineImageItem extends CIMI_CollectionItem {
    // No accessory attributes for snapshots - uses standard resourceRef
}

// Machine item (basic collection item)
export interface CIMI_MachineItem extends CIMI_CollectionItem {
    // No accessory attributes for machines - uses standard resourceRef
}

// Specific Collection classes per CIMI spec - each collection type has its own class

// Basic Disk Collection (collection[Disk])
export abstract class CIMI_DiskCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "disks";
    }
}

// Enhanced Volume Collection (collection[locatedVolume]) - has accessory attributes
export abstract class CIMI_LocatedVolumeCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "locatedVolumes";
    }
}

// Basic NetworkInterface Collection (collection[NetworkInterface])
export abstract class CIMI_NetworkInterfaceCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "networkInterfaces";
    }
}

// Basic MachineImage Collection (collection[MachineImage])
export abstract class CIMI_MachineImageCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "machineImages";
    }
}

// Basic Meter Collection (collection[Meter])
export abstract class CIMI_MeterCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "meters";
    }
}

// Machine Collection (collection[Machine])
export abstract class CIMI_MachineCollection extends CIMI_Collection {
    getCollectionArrayName(): string {
        return "machines";
    }
    
    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.ADD, href: `${this.id}/add` }
        ];
    }
    
    /**
     * Create Machine and Add it to collection
     * Note: The "add" operation requires that a MachineTemplate be used (see CIMI spec 4.2.1.1)
     * @param machine MachineTemplate to create machine from
     */
    abstract add(machine: CIMI_MachineTemplate): void;
}

