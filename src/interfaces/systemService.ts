import type { URI, PropertiesMap } from "./types.js";
import type { CIMI_Resource } from "./resource.js";
import type { 
    MachineCollectionRef,
    VolumeCollectionRef,
    SystemCollectionRef,
    NetworkServiceCollectionRef,
    SystemServiceRef
} from "./references.js";

/**
 * DESIGN NOTE: SystemService represents a problematic mixing of concerns in the CIMI specification.
 * 
 * Issues identified:
 * 1. CIMI is supposed to be an INFRASTRUCTURE API for managing cloud resources (VMs, networks, storage),
 *    but SystemService introduces SERVICE MANAGEMENT concerns (backup policies, failover strategies).
 *    This violates separation of concerns - infrastructure APIs should focus on "give me resources",
 *    not "here's my business continuity strategy".
 * 
 * 2. The DMTF specification confuses High Availability (HA) and Disaster Recovery (DR):
 *    - True HA: Sub-second failover with zero service interruption (load balancers, clustering)
 *    - True DR: Minutes/hours/days recovery time for major outages (backups, restore procedures)
 *    The spec treats "backup machine creation" as HA, when that's actually DR.
 * 
 * 3. This functionality would be better suited for a separate "Cloud Management Platform" API
 *    rather than being mixed into infrastructure resource management.
 * 
 * We implement this interface for CIMI compatibility, but note these design inconsistencies.
 * In practice, many cloud providers implement their own APIs rather than following
 * CIMI exactly due to issues like this.
 */

// Base SystemService interface
export interface CIMI_SystemServiceInterface extends CIMI_Resource {
    serviceType: URI; // e.g., http://schemas.dmtf.org/cimi/2/SystemService/highreliability
    machines?: MachineCollectionRef;
    volumes?: VolumeCollectionRef;
    systems?: SystemCollectionRef;
    parameters?: PropertiesMap;
}

// Enhanced Machine Collection item with backup machine accessory attribute
export interface CIMI_RecoverableMachineItem {
    id: string;
    name?: string;
    description?: string;
    created?: Date;
    updated?: Date;
    properties?: PropertiesMap;
    operations?: Array<{rel: string, href: URI}>;
    resourceRef: any; // Reference to the Machine
    backupmachine?: SystemServiceRef; // Accessory attribute for backup Machine
}

// HighReliability service specific interface
// NOTE: Despite the name "HighReliability", this is actually implementing DR (Disaster Recovery)
// since it involves backup machine creation and recovery procedures, not true sub-second HA.
export interface CIMI_HighReliabilitySystemServiceInterface extends CIMI_SystemServiceInterface {
    serviceType: 'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/active' | 
                 'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/passive';
    machines?: MachineCollectionRef; // Collection of RecoverableMachine items
    networkServices?: NetworkServiceCollectionRef;
    heartbeat?: number; // Heartbeat frequency in milliseconds
    replicationType?: 'synchronous' | 'asynchronous' | 'none' | 'onlyAtClusterCreation';
    RPO?: number; // Recovery Point Objective in minutes
}

// DisasterRecovery service specific interface
export interface CIMI_DisasterRecoverySystemServiceInterface extends CIMI_SystemServiceInterface {
    serviceType: 'http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery';
    machines?: MachineCollectionRef;
    backupDataCenter?: URI;
    backupCEP?: SystemServiceRef; // Reference to CEP in backup DC
    networkServices?: NetworkServiceCollectionRef;
}

// Action parameter interfaces for SystemService operations

// HighReliability service operations
export interface CIMI_ForceSyncAction {
    node: SystemServiceRef; // Primary node reference (mandatory)
}

export interface CIMI_SwapBackupAction {
    node: SystemServiceRef; // Machine to be replaced by its backup (mandatory)
}

export interface CIMI_AddRMAction {
    node: SystemServiceRef; // Machine to be added (mandatory)
    backup?: SystemServiceRef; // Machine to be used as backup (optional)
}

export interface CIMI_RemoveRMAction {
    node: SystemServiceRef; // Machine to be removed (mandatory)
}

// Service type constants
export const CIMI_SystemServiceTypes = {
    HIGH_RELIABILITY_ACTIVE: 'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/active',
    HIGH_RELIABILITY_PASSIVE: 'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/passive',
    DISASTER_RECOVERY: 'http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery'
} as const;

// Operation URIs for SystemService
export const CIMI_SystemServiceOperations = {
    FORCE_SYNC: 'http://schemas.dmtf.org/cimi/2/action/forceSync',
    SWAP_BACKUP: 'http://schemas.dmtf.org/cimi/2/action/swapBackup',
    ADD_RM: 'http://schemas.dmtf.org/cimi/2/action/addRM',
    REMOVE_RM: 'http://schemas.dmtf.org/cimi/2/action/removeRM'
} as const;