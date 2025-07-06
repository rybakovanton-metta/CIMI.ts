import type { URI, PropertiesMap } from "./types.js";
import type { CIMI_Resource } from "./resource.js";
import type { 
    SystemCollectionRef,
    MachineCollectionRef,
    CredentialCollectionRef,
    VolumeCollectionRef,
    NetworkCollectionRef,
    NetworkServiceCollectionRef,
    SystemServiceCollectionRef,
    MeterCollectionRef,
    EventLogRef
} from "./references.js";

// System state enumeration - includes relevant machine states plus system-specific MIXED state
export enum CIMI_SystemState {
    CREATING = 'CREATING',
    STARTING = 'STARTING',
    STARTED = 'STARTED',
    STOPPING = 'STOPPING',
    STOPPED = 'STOPPED',
    PAUSING = 'PAUSING',
    PAUSED = 'PAUSED',
    SUSPENDING = 'SUSPENDING',
    SUSPENDED = 'SUSPENDED',
    CAPTURING = 'CAPTURING',
    RESTORING = 'RESTORING',
    DELETING = 'DELETING',
    ERROR = 'ERROR',
    FAILED = 'FAILED',
    MIXED = 'MIXED' // System-specific: when component machines have varying states
}

// System interface extending CIMI_Resource
export interface CIMI_SystemInterface extends CIMI_Resource {
    state: CIMI_SystemState;
    systems?: SystemCollectionRef; // Collection of nested Systems
    machines?: MachineCollectionRef; // Collection of Machines
    credentials?: CredentialCollectionRef; // Collection of Credentials
    volumes?: VolumeCollectionRef; // Collection of Volumes
    networks?: NetworkCollectionRef; // Collection of Networks
    networkServices?: NetworkServiceCollectionRef; // Collection of NetworkServices
    services?: SystemServiceCollectionRef; // Collection of SystemServices
    meters?: MeterCollectionRef; // Collection of Meters
    eventLog?: EventLogRef; // Reference to EventLog
}

// System lifecycle action parameter interfaces
export interface CIMI_SystemLifecycleAction {
    // No parameters needed for basic lifecycle operations
}

// Export action parameters for System
export interface CIMI_SystemExportAction {
    format?: string; // Default: "application/ovf"
    destination?: URI;
    properties?: PropertiesMap; // For credentials, etc.
}

// Import action parameters for SystemCollection
export interface CIMI_SystemImportAction {
    source: URI; // Mandatory
    properties?: PropertiesMap; // For credentials, etc.
}

// Operation URIs for System
export const CIMI_SystemOperations = {
    START: 'http://schemas.dmtf.org/cimi/2/action/start',
    STOP: 'http://schemas.dmtf.org/cimi/2/action/stop',
    RESTART: 'http://schemas.dmtf.org/cimi/2/action/restart',
    PAUSE: 'http://schemas.dmtf.org/cimi/2/action/pause',
    SUSPEND: 'http://schemas.dmtf.org/cimi/2/action/suspend',
    EXPORT: 'http://schemas.dmtf.org/cimi/2/action/export',
    IMPORT: 'http://schemas.dmtf.org/cimi/2/action/import'
} as const;