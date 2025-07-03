import { CIMI_Resource } from "./interfaces/resource.js";
import { ResourceId, URI } from "./interfaces/types.js";
import { DiskCollectionRef, VolumeCollectionRef, NetworkInterfaceCollectionRef, MachineImageRef, MachineImageCollectionRef, MeterCollectionRef, EventLogRef, VolumeRef, CredentialRef } from "./interfaces/references.js";
import { 
    CIMI_MachineInterface, 
    CIMI_MachineTemplate, 
    CIMI_MachineState, 
    CIMI_CpuArch
} from "./interfaces/machine.js";




export abstract class CIMI_Machine extends CIMI_Resource implements CIMI_MachineInterface {
    // CIMI_MachineInterface properties - using specific collection classes per CIMI spec
    abstract state: CIMI_MachineState;
    abstract cpu: number;
    abstract memory: number;
    abstract disks: DiskCollectionRef;
    abstract cpuArch: CIMI_CpuArch;
    abstract cpuSpeed?: number;
    abstract volumes: VolumeCollectionRef;
    abstract interfaces: NetworkInterfaceCollectionRef;
    abstract latestSnapshot?: MachineImageRef;
    abstract snapshots: MachineImageCollectionRef;
    abstract meters: MeterCollectionRef;
    abstract eventLog?: EventLogRef;

    // CRUD Operations
    abstract read(resourceId: ResourceId): CIMI_MachineInterface;
    abstract update(args: CIMI_MachineTemplate): boolean;
    abstract delete(resourceId: ResourceId): boolean;

    // Machine Lifecycle Operations
    abstract start(resourceId: ResourceId): boolean;
    abstract stop(resourceId: ResourceId, force?: boolean): boolean;
    abstract restart(resourceId: ResourceId, force?: boolean): boolean;
    abstract pause(resourceId: ResourceId): boolean;
    abstract suspend(resourceId: ResourceId): boolean;
    abstract capture(resourceId: ResourceId): boolean;
    abstract createSnapShot(resourceId: ResourceId): boolean;
    abstract deleteSnapShot(resourceId: ResourceId): boolean;
    abstract restoreMachine(resourceId: ResourceId, image: URI): boolean;
    abstract connectVolume(
        resourceId: ResourceId,
        volume: VolumeRef,
        initialLocation?: string,
        credentials?: CredentialRef,
        properties?: Record<string, any>
    ): boolean;
}