import { CIMI_Resource } from "./interfaces/resource.js";
import type { URI } from "./interfaces/types.js";
import type { ResourceRef } from "./interfaces/references.js";
import type { CIMI_Operation } from "./interfaces/operations.js";
import { CIMI_Operations } from "./interfaces/operations.js";
import type { CIMI_CloudEntryPointInterface } from "./interfaces/cloudEntryPoint.js";
import type { 
    ResourceMetadataCollectionRef,
    SystemCollectionRef,
    SystemTemplateCollectionRef,
    MachineCollectionRef,
    MachineTemplateCollectionRef,
    MachineConfigurationCollectionRef,
    MachineImageCollectionRef,
    CredentialCollectionRef,
    CredentialTemplateCollectionRef,
    VolumeCollectionRef,
    VolumeTemplateCollectionRef,
    VolumeConfigurationCollectionRef,
    VolumeImageCollectionRef,
    NetworkCollectionRef,
    NetworkTemplateCollectionRef,
    ProtocolSegmentCollectionRef,
    ProtocolSegmentTemplateCollectionRef,
    ProtocolEndpointCollectionRef,
    ProtocolEndpointTemplateCollectionRef,
    NetworkInterfaceCollectionRef,
    NetworkInterfaceTemplateCollectionRef,
    NetworkServiceCollectionRef,
    NetworkServiceTemplateCollectionRef,
    JobCollectionRef,
    MeterCollectionRef,
    MeterTemplateCollectionRef,
    MeterConfigurationCollectionRef,
    EventLogCollectionRef,
    EventLogTemplateCollectionRef
} from "./interfaces/references.js";

export abstract class CIMI_CloudEntryPoint extends CIMI_Resource implements CIMI_CloudEntryPointInterface {
    abstract baseURI: URI;
    abstract resourceMetadata?: ResourceMetadataCollectionRef;
    abstract systems?: SystemCollectionRef;
    abstract systemTemplates?: SystemTemplateCollectionRef;
    abstract machines?: MachineCollectionRef;
    abstract machineTemplates?: MachineTemplateCollectionRef;
    abstract machineConfigs?: MachineConfigurationCollectionRef;
    abstract machineImages?: MachineImageCollectionRef;
    abstract credentials?: CredentialCollectionRef;
    abstract credentialTemplates?: CredentialTemplateCollectionRef;
    abstract volumes?: VolumeCollectionRef;
    abstract volumeTemplates?: VolumeTemplateCollectionRef;
    abstract volumeConfigs?: VolumeConfigurationCollectionRef;
    abstract volumeImages?: VolumeImageCollectionRef;
    abstract networks?: NetworkCollectionRef;
    abstract networkTemplates?: NetworkTemplateCollectionRef;
    abstract segments?: ProtocolSegmentCollectionRef;
    abstract segmentTemplates?: ProtocolSegmentTemplateCollectionRef;
    abstract endpoints?: ProtocolEndpointCollectionRef;
    abstract endpointTemplates?: ProtocolEndpointTemplateCollectionRef;
    abstract interfaces?: NetworkInterfaceCollectionRef;
    abstract interfaceTemplates?: NetworkInterfaceTemplateCollectionRef;
    abstract networkServices?: NetworkServiceCollectionRef;
    abstract networkServiceTemplates?: NetworkServiceTemplateCollectionRef;
    abstract jobs?: JobCollectionRef;
    abstract meters?: MeterCollectionRef;
    abstract meterTemplates?: MeterTemplateCollectionRef;
    abstract meterConfigs?: MeterConfigurationCollectionRef;
    abstract eventLogs?: EventLogCollectionRef;
    abstract eventLogTemplates?: EventLogTemplateCollectionRef;

    constructor(baseUri: URI, id?: URI, name?: string, description?: string, parent?: ResourceRef) {
        super(baseUri, id, name, description, parent);
    }

    getAvailableOperations(): CIMI_Operation[] {
        return [
            { rel: CIMI_Operations.EDIT, href: `${this.id}` }
        ];
    }

    // Override toJSON to include cloud entry point specific properties
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJSON(),
            baseURI: this.baseURI
        };

        // Include all optional collection references if they exist
        if (this.resourceMetadata) result.resourceMetadata = this.resourceMetadata;
        if (this.systems) result.systems = this.systems;
        if (this.systemTemplates) result.systemTemplates = this.systemTemplates;
        if (this.machines) result.machines = this.machines;
        if (this.machineTemplates) result.machineTemplates = this.machineTemplates;
        if (this.machineConfigs) result.machineConfigs = this.machineConfigs;
        if (this.machineImages) result.machineImages = this.machineImages;
        if (this.credentials) result.credentials = this.credentials;
        if (this.credentialTemplates) result.credentialTemplates = this.credentialTemplates;
        if (this.volumes) result.volumes = this.volumes;
        if (this.volumeTemplates) result.volumeTemplates = this.volumeTemplates;
        if (this.volumeConfigs) result.volumeConfigs = this.volumeConfigs;
        if (this.volumeImages) result.volumeImages = this.volumeImages;
        if (this.networks) result.networks = this.networks;
        if (this.networkTemplates) result.networkTemplates = this.networkTemplates;
        if (this.segments) result.segments = this.segments;
        if (this.segmentTemplates) result.segmentTemplates = this.segmentTemplates;
        if (this.endpoints) result.endpoints = this.endpoints;
        if (this.endpointTemplates) result.endpointTemplates = this.endpointTemplates;
        if (this.interfaces) result.interfaces = this.interfaces;
        if (this.interfaceTemplates) result.interfaceTemplates = this.interfaceTemplates;
        if (this.networkServices) result.networkServices = this.networkServices;
        if (this.networkServiceTemplates) result.networkServiceTemplates = this.networkServiceTemplates;
        if (this.jobs) result.jobs = this.jobs;
        if (this.meters) result.meters = this.meters;
        if (this.meterTemplates) result.meterTemplates = this.meterTemplates;
        if (this.meterConfigs) result.meterConfigs = this.meterConfigs;
        if (this.eventLogs) result.eventLogs = this.eventLogs;
        if (this.eventLogTemplates) result.eventLogTemplates = this.eventLogTemplates;

        return result;
    }
}