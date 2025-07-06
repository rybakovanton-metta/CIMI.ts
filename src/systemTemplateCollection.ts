import { CIMI_Collection } from "./interfaces/collection.js";
import type { URI } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { 
    CIMI_SystemTemplateInterface,
    CIMI_SystemTemplateImportAction
} from "./interfaces/systemTemplate.js";

// SystemTemplateCollection class
export abstract class CIMI_SystemTemplateCollection extends CIMI_Collection {
    constructor(baseUri: URI, id?: URI, parent?: ResourceRef) {
        super(baseUri, id, parent);
    }

    getCollectionArrayName(): string {
        return "systemTemplates";
    }

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.ADD, href: `${this.id}/add` },
            { rel: "http://schemas.dmtf.org/cimi/2/action/import", href: `${this.id}` }
        ];
    }

    // Custom operations
    abstract import(action: CIMI_SystemTemplateImportAction): boolean;

    // Create SystemTemplate and add to collection
    abstract add(systemTemplate: CIMI_SystemTemplateInterface): void;
}