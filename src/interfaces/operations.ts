import type { URI } from "./types.js";

// CIMI Operation structure per spec 5.8
export interface CIMI_Operation {
    rel: string;  // Operation relation (e.g., "start", "stop", "add", "edit", "delete")
    href: URI;    // URI to perform the operation
    method?: string;  // HTTP method if different from default
}

// Resource relationship types per CIMI spec 5.10
export enum CIMI_RelationshipType {
    CHILD_COMPONENT = "child",           // Composition - deletion cascades
    ASSOCIATED_COMPONENT = "associated", // Association - deletion does not cascade
    REFERENCE = "reference"              // Simple reference - cleaned up on deletion
}

// Standard CIMI operation relations
export const CIMI_Operations = {
    // Resource operations
    EDIT: "edit",
    DELETE: "delete",
    
    // Collection operations  
    ADD: "add",
    INSERT: "insert",
    REMOVE: "remove",
    
    // Machine operations per CIMI spec 5.14.1.2
    START: "http://schemas.dmtf.org/cimi/2/action/start",
    STOP: "http://schemas.dmtf.org/cimi/2/action/stop", 
    RESTART: "http://schemas.dmtf.org/cimi/2/action/restart",
    PAUSE: "http://schemas.dmtf.org/cimi/2/action/pause",
    SUSPEND: "http://schemas.dmtf.org/cimi/2/action/suspend",
    CAPTURE: "http://schemas.dmtf.org/cimi/2/action/capture",
    SNAPSHOT: "http://schemas.dmtf.org/cimi/2/action/snapshot",
    RESTORE: "http://schemas.dmtf.org/cimi/2/action/restore",
    CONNECT_VOLUME: "http://schemas.dmtf.org/cimi/2/action/connectvolume"
} as const;