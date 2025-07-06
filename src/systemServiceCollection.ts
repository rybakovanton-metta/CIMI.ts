import { CIMI_Collection } from "./interfaces/collection.js";
import type { URI } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { CIMI_SystemServiceInterface } from "./interfaces/systemService.js";

/**
 * SystemServiceCollection - Collection for SystemService resources.
 * 
 * See interfaces/systemService.ts for design notes about the problematic
 * mixing of infrastructure and service management concerns in this CIMI feature.
 */
export abstract class CIMI_SystemServiceCollection extends CIMI_Collection {
    constructor(baseUri: URI, id?: URI, parent?: ResourceRef) {
        super(baseUri, id, parent);
    }

    getCollectionArrayName(): string {
        return "systemServices";
    }

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.ADD, href: `${this.id}/add` }
        ];
    }

    // Create SystemService and add to collection
    abstract add(systemService: CIMI_SystemServiceInterface): void;
}