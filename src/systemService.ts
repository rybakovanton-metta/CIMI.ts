import { CIMI_Resource } from "./interfaces/resource.js";
import type { URI, ResourceId, PropertiesMap } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { 
    CIMI_SystemServiceInterface,
    CIMI_HighReliabilitySystemServiceInterface,
    CIMI_DisasterRecoverySystemServiceInterface,
    CIMI_ForceSyncAction,
    CIMI_SwapBackupAction,
    CIMI_AddRMAction,
    CIMI_RemoveRMAction
} from "./interfaces/systemService.js";
import { CIMI_SystemServiceOperations } from "./interfaces/systemService.js";
import type { 
    MachineCollectionRef,
    VolumeCollectionRef,
    SystemCollectionRef,
    NetworkServiceCollectionRef,
    SystemServiceRef
} from "./interfaces/references.js";

/**
 * SystemService implementation - see interfaces/systemService.ts for detailed design notes
 * about the problematic mixing of infrastructure and service management concerns in CIMI.
 * 
 * Implemented for compatibility with DMTF CIMI specification despite architectural issues.
 */
export abstract class CIMI_SystemService extends CIMI_Resource implements CIMI_SystemServiceInterface {
    abstract serviceType: URI;
    abstract machines?: MachineCollectionRef;
    abstract volumes?: VolumeCollectionRef;
    abstract systems?: SystemCollectionRef;
    abstract parameters?: PropertiesMap;

    constructor(baseUri: URI, id?: URI, name?: string, description?: string, parent?: ResourceRef) {
        super(baseUri, id, name, description, parent);
    }

    // CRUD Operations
    abstract read(resourceId: ResourceId): CIMI_SystemServiceInterface;
    abstract update(systemService: CIMI_SystemServiceInterface): boolean;
    abstract delete(resourceId: ResourceId): boolean;

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.EDIT, href: `${this.id}` },
            { rel: CIMI_Operations.DELETE, href: `${this.id}` }
        ];
    }

    // Override toJSON to include SystemService specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON(),
            serviceType: this.serviceType
        };

        // Include optional collection references and parameters if they exist
        if (this.machines) result.machines = this.machines;
        if (this.volumes) result.volumes = this.volumes;
        if (this.systems) result.systems = this.systems;
        if (this.parameters && Object.keys(this.parameters).length > 0) {
            result.parameters = this.parameters;
        }

        return result;
    }

    // Helper methods for parameters management
    setParameter(key: string, value: string): void {
        if (!this.parameters) {
            this.parameters = {};
        }
        this.parameters[key] = value;
    }

    getParameter(key: string): string | undefined {
        return this.parameters?.[key];
    }

    removeParameter(key: string): boolean {
        if (this.parameters && key in this.parameters) {
            delete this.parameters[key];
            return true;
        }
        return false;
    }
}

// HighReliability SystemService class
// NOTE: This is misnamed - it's actually implementing DR (backup/restore) not true HA (sub-second failover)
export abstract class CIMI_HighReliabilitySystemService extends CIMI_SystemService implements CIMI_HighReliabilitySystemServiceInterface {
    declare serviceType: 'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/active' | 
                        'http://schemas.dmtf.org/cimi/2/SystemService/highreliability/passive';
    abstract networkServices?: NetworkServiceCollectionRef;
    abstract heartbeat?: number;
    abstract replicationType?: 'synchronous' | 'asynchronous' | 'none' | 'onlyAtClusterCreation';
    abstract RPO?: number;

    // HighReliability specific operations
    abstract forceSync(action: CIMI_ForceSyncAction): boolean;
    abstract swapBackup(action: CIMI_SwapBackupAction): boolean;
    abstract addRM(action: CIMI_AddRMAction): boolean;
    abstract removeRM(action: CIMI_RemoveRMAction): boolean;

    getAvailableOperations(): CIMI_Operation[] {
        return [
            ...super.getAvailableOperations(),
            { rel: CIMI_SystemServiceOperations.FORCE_SYNC, href: `${this.id}` },
            { rel: CIMI_SystemServiceOperations.SWAP_BACKUP, href: `${this.id}` },
            { rel: CIMI_SystemServiceOperations.ADD_RM, href: `${this.id}` },
            { rel: CIMI_SystemServiceOperations.REMOVE_RM, href: `${this.id}` }
        ];
    }

    // Override toJSON to include HighReliability specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON()
        };

        // Include HighReliability specific properties
        if (this.networkServices) result.networkServices = this.networkServices;
        if (this.heartbeat !== undefined) result.heartbeat = this.heartbeat;
        if (this.replicationType) result.replicationType = this.replicationType;
        if (this.RPO !== undefined) result.RPO = this.RPO;

        return result;
    }
}

// DisasterRecovery SystemService class
export abstract class CIMI_DisasterRecoverySystemService extends CIMI_SystemService implements CIMI_DisasterRecoverySystemServiceInterface {
    declare serviceType: 'http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery';
    abstract backupDataCenter?: URI;
    abstract backupCEP?: SystemServiceRef;
    abstract networkServices?: NetworkServiceCollectionRef;

    // DisasterRecovery specific operations
    abstract addRM(action: CIMI_AddRMAction): boolean;
    abstract removeRM(action: CIMI_RemoveRMAction): boolean;

    getAvailableOperations(): CIMI_Operation[] {
        return [
            ...super.getAvailableOperations(),
            { rel: CIMI_SystemServiceOperations.ADD_RM, href: `${this.id}` },
            { rel: CIMI_SystemServiceOperations.REMOVE_RM, href: `${this.id}` }
        ];
    }

    // Override toJSON to include DisasterRecovery specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON()
        };

        // Include DisasterRecovery specific properties
        if (this.backupDataCenter) result.backupDataCenter = this.backupDataCenter;
        if (this.backupCEP) result.backupCEP = this.backupCEP;
        if (this.networkServices) result.networkServices = this.networkServices;

        return result;
    }
}