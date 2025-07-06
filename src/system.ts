import { CIMI_Resource } from "./interfaces/resource.js";
import type { URI, ResourceId } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { 
    CIMI_SystemInterface,
    CIMI_SystemState,
    CIMI_SystemExportAction
} from "./interfaces/system.js";
import { CIMI_SystemOperations } from "./interfaces/system.js";
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
} from "./interfaces/references.js";

export abstract class CIMI_System extends CIMI_Resource implements CIMI_SystemInterface {
    abstract state: CIMI_SystemState;
    abstract systems?: SystemCollectionRef;
    abstract machines?: MachineCollectionRef;
    abstract credentials?: CredentialCollectionRef;
    abstract volumes?: VolumeCollectionRef;
    abstract networks?: NetworkCollectionRef;
    abstract networkServices?: NetworkServiceCollectionRef;
    abstract services?: SystemServiceCollectionRef;
    abstract meters?: MeterCollectionRef;
    abstract eventLog?: EventLogRef;

    constructor(baseUri: URI, id?: URI, name?: string, description?: string, parent?: ResourceRef) {
        super(baseUri, id, name, description, parent);
    }

    // CRUD Operations
    abstract read(resourceId: ResourceId): CIMI_SystemInterface;
    abstract update(system: CIMI_SystemInterface): boolean;
    abstract delete(resourceId: ResourceId): boolean;

    // System Lifecycle Operations - these recursively affect all component machines/systems
    abstract start(resourceId: ResourceId): boolean;
    abstract stop(resourceId: ResourceId): boolean;
    abstract restart(resourceId: ResourceId): boolean;
    abstract pause(resourceId: ResourceId): boolean;
    abstract suspend(resourceId: ResourceId): boolean;

    // Custom Operations
    abstract export(action: CIMI_SystemExportAction): boolean;

    getAvailableOperations(): CIMI_Operation[] {
        const operations: CIMI_Operation[] = [
            { rel: CIMI_Operations.EDIT, href: `${this.id}` },
            { rel: CIMI_Operations.DELETE, href: `${this.id}` },
            { rel: CIMI_SystemOperations.EXPORT, href: `${this.id}` }
        ];

        // Add lifecycle operations based on current state
        // Note: These operations recursively affect all component machines/systems
        switch (this.state) {
            case 'STOPPED':
            case 'PAUSED':
            case 'SUSPENDED':
            case 'ERROR':
            case 'FAILED':
                operations.push({ rel: CIMI_SystemOperations.START, href: `${this.id}` });
                break;
            case 'STARTED':
                operations.push(
                    { rel: CIMI_SystemOperations.STOP, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.RESTART, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.PAUSE, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.SUSPEND, href: `${this.id}` }
                );
                break;
            case 'MIXED':
                // For mixed state, allow all operations as they may apply to different components
                operations.push(
                    { rel: CIMI_SystemOperations.START, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.STOP, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.RESTART, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.PAUSE, href: `${this.id}` },
                    { rel: CIMI_SystemOperations.SUSPEND, href: `${this.id}` }
                );
                break;
        }

        return operations;
    }

    // Override toJSON to include System specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON(),
            state: this.state
        };

        // Include optional collection references if they exist
        if (this.systems) result.systems = this.systems;
        if (this.machines) result.machines = this.machines;
        if (this.credentials) result.credentials = this.credentials;
        if (this.volumes) result.volumes = this.volumes;
        if (this.networks) result.networks = this.networks;
        if (this.networkServices) result.networkServices = this.networkServices;
        if (this.services) result.services = this.services;
        if (this.meters) result.meters = this.meters;
        if (this.eventLog) result.eventLog = this.eventLog;

        return result;
    }

    // Helper method to check if system has any components
    hasComponents(): boolean {
        return !!(this.systems || this.machines || this.volumes || 
                 this.networks || this.networkServices || this.services);
    }

    // Helper method to determine if system should be in MIXED state
    // (This would typically be implemented by checking actual component states)
    abstract shouldBeMixedState(): boolean;
}