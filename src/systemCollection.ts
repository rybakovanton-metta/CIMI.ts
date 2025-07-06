import { CIMI_Collection } from "./interfaces/collection.js";
import type { URI } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { 
    CIMI_SystemImportAction
} from "./interfaces/system.js";
import { CIMI_SystemOperations } from "./interfaces/system.js";
import type { CIMI_SystemTemplateInterface } from "./interfaces/systemTemplate.js";

// SystemCollection class
export abstract class CIMI_SystemCollection extends CIMI_Collection {
    constructor(baseUri: URI, id?: URI, parent?: ResourceRef) {
        super(baseUri, id, parent);
    }

    getCollectionArrayName(): string {
        return "systems";
    }

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.ADD, href: `${this.id}/add` },
            { rel: CIMI_SystemOperations.IMPORT, href: `${this.id}` }
        ];
    }

    // Custom operations
    abstract import(action: CIMI_SystemImportAction): boolean;

    // Create System from SystemTemplate and add to collection
    // Note: The "add" operation requires that a SystemTemplate be used (see CIMI spec 4.2.1.1)
    abstract add(systemTemplate: CIMI_SystemTemplateInterface): void;
}