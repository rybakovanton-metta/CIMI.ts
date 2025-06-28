import { URI, ValueScope } from "./types.js";
import { CIMI_Resource } from "./resource.js";
import { CIMI_Operation, CIMI_Operations } from "./operations.js";
import { ResourceRef } from "./references.js";
import { CIMI_Collection, CIMI_CollectionItem } from "./collection.js";

export enum ResourceType {
  Address = 'Address',
  AddressTemplate = 'AddressTemplate',
  CloudEntryPoint = 'CloudEntryPoint',
  Credential = 'Credential',
  CredentialTemplate = 'CredentialTemplate',
  Event = 'Event',
  EventLog = 'EventLog',
  EventLogTemplate = 'EventLogTemplate',
  ForwardingGroup = 'ForwardingGroup',
  ForwardingGroupTemplate = 'ForwardingGroupTemplate',
  Job = 'Job',
  Machine = 'Machine',
  MachineConfiguration = 'MachineConfiguration',
  MachineImage = 'MachineImage',
  MachineTemplate = 'MachineTemplate',
  Meter = 'Meter',
  MeterConfiguration = 'MeterConfiguration',
  MeterTemplate = 'MeterTemplate',
  Network = 'Network',
  NetworkConfiguration = 'NetworkConfiguration',
  NetworkPort = 'NetworkPort',
  NetworkPortConfiguration = 'NetworkPortConfiguration',
  NetworkPortTemplate = 'NetworkPortTemplate',
  NetworkTemplate = 'NetworkTemplate',
  ResourceMetadata = 'ResourceMetadata',
  Sample = 'Sample',
  System = 'System',
  SystemTemplate = 'SystemTemplate',
  Volume = 'Volume',
  VolumeConfiguration = 'VolumeConfiguration',
  VolumeImage = 'VolumeImage',
  VolumeTemplate = 'VolumeTemplate'
}

// CIMI ResourceMetadata Resource per spec 5.11
export class CIMI_ResourceMetadata extends CIMI_Resource {
  typeURI: URI;        // URI denoting the type of the described Resource target
  resourceTypeName: string;  // Name of the Resource target type (e.g., "Machine")
  attributes: CIMI_AttributeMetadata[];
  vscope?: ValueScope[];
  capabilities?: CIMI_Capability[];
  actions?: CIMI_Action[];
  
  constructor(
    baseUri: URI, 
    typeURI: URI, 
    resourceTypeName: string,
    attributes: CIMI_AttributeMetadata[] = [],
    id?: URI,
    parent?: ResourceRef
  ) {
    super(baseUri, id, `${resourceTypeName}Metadata`, `Metadata for ${resourceTypeName} resources`, parent);
    this.typeURI = typeURI;
    this.resourceTypeName = resourceTypeName;
    this.attributes = attributes;
  }
  
  // Override resource URI for ResourceMetadata
  getResourceURI(): string {
    return "http://schemas.dmtf.org/cimi/2/ResourceMetadata";
  }
  
  // ResourceMetadata operations - typically reserved for administrators per CIMI spec 5.11.2
  getAvailableOperations(): CIMI_Operation[] {
    // Most consumers have read-only access to ResourceMetadata
    // Override this method to provide admin-specific operations based on user permissions
    return [];
  }
  
  // Implementation required by CIMI_ResourceManager
  cleanupReferences(_deletedResourceId: URI): void {
    // ResourceMetadata typically doesn't hold references to other resources
    // If it does in the future, implement cleanup logic here
  }
  
  // Override toJSON for proper CIMI serialization per spec
  toJSON(): Record<string, any> {
    const result: Record<string, any> = {
      ...super.toJSON(),
      typeURI: this.typeURI,
      name: this.resourceTypeName
    };
    
    // Include optional arrays only if not empty
    if (this.attributes.length > 0) {
      result.attributes = this.attributes;
    }
    if (this.vscope && this.vscope.length > 0) {
      result.vscope = this.vscope;
    }
    if (this.capabilities && this.capabilities.length > 0) {
      result.capabilities = this.capabilities;
    }
    if (this.actions && this.actions.length > 0) {
      result.actions = this.actions;
    }
    
    return result;
  }
}

export interface CIMI_AttributeMetadata {
  name: string;
  namespace?: URI;  // Omit for CIMI-defined attributes; include for extensions
  type?: string;    // Omit for CIMI-defined attributes; include for extensions
  providerMandatory?: boolean;  // Default: true
  consumerMandatory?: boolean;  // Default: false
  mutable?: boolean;            // Default: true
  consumerWritable?: boolean;   // Default: true
}



export interface CIMI_Capability {
  name?: string;        // Optional per spec
  uri: URI;            // Required - uniquely identifies the capability globally
  description?: string; // Optional human-readable description
  value?: any;         // Optional - defaults to boolean true if omitted
}

// Standard CIMI Capability URIs per spec 5.11.1 Table 7
export const CIMI_CapabilityURIs = {
  // CloudEntryPoint capabilities
  CEP_EXPAND_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/ExpandParameterQuery",
  CEP_FILTER_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/FilterParameterQuery",
  CEP_FIRST_LAST_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/FirstParameterAndLastParameterQuery",
  CEP_SELECT_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/SelectParameterQuery",
  CEP_FORMAT_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/FormatParameterQuery",
  CEP_ORDER_BY_PARAMETER_QUERY: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/OrderByParameterQuery",
  CEP_QUERY_PATH_NOTATION: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/QueryPathNotation",
  CEP_MAX_PROPERTY_ITEMS: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/MaxPropertyItems",
  CEP_VALUE_SCOPES: "http://schemas.dmtf.org/cimi/2/capability/CloudEntryPoint/ValueScopes",
  
  // Machine capabilities
  MACHINE_DEFAULT_INITIAL_STATE: "http://schemas.dmtf.org/cimi/2/capability/Machine/DefaultInitialState",
  MACHINE_INITIAL_STATES: "http://schemas.dmtf.org/cimi/2/capability/Machine/InitialStates",
  MACHINE_CONFIG_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineConfigByValue",
  MACHINE_CREDENTIAL_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineCredentialByValue",
  MACHINE_IMAGE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineImageByValue",
  MACHINE_VOLUME_TEMPLATES_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineVolumeTemplatesByValue",
  MACHINE_TEMPLATE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineTemplateByValue",
  MACHINE_STOP_FORCE: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineStopForce",
  MACHINE_STOP_FORCE_DEFAULT: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineStopForceDefault",
  MACHINE_RESTORE_FROM_IMAGE: "http://schemas.dmtf.org/cimi/2/capability/Machine/RestoreFromImage",
  MACHINE_USER_DATA: "http://schemas.dmtf.org/cimi/2/capability/Machine/UserData",
  MACHINE_AVAILABILITY_LEVEL: "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineAvailabilityLevel",
  
  // Volume capabilities
  VOLUME_SHARED_SUPPORT: "http://schemas.dmtf.org/cimi/2/capability/Volume/SharedVolumeSupport",
  VOLUME_CONFIG_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Volume/VolumeConfigByValue",
  VOLUME_IMAGE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Volume/VolumeImageByValue",
  VOLUME_SNAPSHOT: "http://schemas.dmtf.org/cimi/2/capability/Volume/VolumeSnapshot",
  VOLUME_TEMPLATE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Volume/VolumeTemplateByValue",
  VOLUME_AVAILABILITY_LEVEL: "http://schemas.dmtf.org/cimi/2/capability/Volume/VolumeAvailabilityLevel",
  
  // Other resource capabilities
  SYSTEM_COMPONENT_TEMPLATE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/System/SystemComponentTemplateByValue",
  CREDENTIAL_TEMPLATE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Credential/CredentialTemplateByValue",
  NETWORK_TEMPLATE_BY_VALUE: "http://schemas.dmtf.org/cimi/2/capability/Network/NetworkTemplateByValue",
  JOB_RETENTION: "http://schemas.dmtf.org/cimi/2/capability/Job/JobRetention",
  EVENTLOG_LINKED: "http://schemas.dmtf.org/cimi/2/capability/EventLog/Linked"
} as const;

// Helper class for creating CIMI capabilities
export class CIMI_CapabilityManager {
  // Create a capability URI following CIMI spec format
  static createCapabilityURI(resourceName: string, capabilityName: string): URI {
    return `http://schemas.dmtf.org/cimi/2/capability/${resourceName}/${capabilityName}`;
  }
  
  // Create a boolean capability
  static createBooleanCapability(uri: URI, value: boolean, name?: string, description?: string): CIMI_Capability {
    return {
      uri,
      value,
      ...(name && { name }),
      ...(description && { description })
    };
  }
  
  // Create a string capability
  static createStringCapability(uri: URI, value: string, name?: string, description?: string): CIMI_Capability {
    return {
      uri,
      value,
      ...(name && { name }),
      ...(description && { description })
    };
  }
  
  // Create a numeric capability
  static createNumericCapability(uri: URI, value: number, name?: string, description?: string): CIMI_Capability {
    return {
      uri,
      value,
      ...(name && { name }),
      ...(description && { description })
    };
  }
  
  // Create an array capability
  static createArrayCapability(uri: URI, values: any[], name?: string, description?: string): CIMI_Capability {
    return {
      uri,
      value: values,
      ...(name && { name }),
      ...(description && { description })
    };
  }
  
  // Create common machine capabilities
  static createMachineCapabilities(options: {
    configByValue?: boolean;
    imageByValue?: boolean;
    defaultInitialState?: string;
    stopForce?: boolean;
    restoreFromImage?: boolean;
  }): CIMI_Capability[] {
    const capabilities: CIMI_Capability[] = [];
    
    if (options.configByValue !== undefined) {
      capabilities.push(this.createBooleanCapability(
        CIMI_CapabilityURIs.MACHINE_CONFIG_BY_VALUE,
        options.configByValue
      ));
    }
    
    if (options.imageByValue !== undefined) {
      capabilities.push(this.createBooleanCapability(
        CIMI_CapabilityURIs.MACHINE_IMAGE_BY_VALUE,
        options.imageByValue
      ));
    }
    
    if (options.defaultInitialState) {
      capabilities.push(this.createStringCapability(
        CIMI_CapabilityURIs.MACHINE_DEFAULT_INITIAL_STATE,
        options.defaultInitialState
      ));
    }
    
    if (options.stopForce !== undefined) {
      capabilities.push(this.createBooleanCapability(
        CIMI_CapabilityURIs.MACHINE_STOP_FORCE,
        options.stopForce
      ));
    }
    
    if (options.restoreFromImage !== undefined) {
      capabilities.push(this.createBooleanCapability(
        CIMI_CapabilityURIs.MACHINE_RESTORE_FROM_IMAGE,
        options.restoreFromImage
      ));
    }
    
    return capabilities;
  }
}

// ResourceMetadataCollection per CIMI spec 5.11.2
export class CIMI_ResourceMetadataCollection extends CIMI_Collection {
  
  constructor(baseUri: URI, id?: URI, parent?: ResourceRef) {
    super(baseUri, id, parent);
  }
  
  // Required by CIMI_Collection - return collection array name per spec
  getCollectionArrayName(): string {
    return "resourceMetadatas";
  }
  
  // Override resource URI for ResourceMetadataCollection
  getResourceURI(): string {
    return "http://schemas.dmtf.org/cimi/2/ResourceMetadataCollection";
  }
  
  // Add ResourceMetadata to collection
  add(resourceMetadata: CIMI_ResourceMetadata): void {
    const item: CIMI_CollectionItem = {
      id: resourceMetadata.id,
      name: resourceMetadata.name,
      description: resourceMetadata.description,
      created: resourceMetadata.created,
      updated: resourceMetadata.updated,
      parent: resourceMetadata.parent,
      properties: resourceMetadata.properties,
      resourceRef: { href: resourceMetadata.id },
      operations: [
        { rel: "edit", href: resourceMetadata.id },
        { rel: "delete", href: resourceMetadata.id }
      ]
    };
    
    this.insert(item);
  }
  
  // Add ResourceMetadata by creating new instance
  addNewResourceMetadata(
    typeURI: URI,
    resourceTypeName: string,
    attributes: CIMI_AttributeMetadata[] = [],
    capabilities?: CIMI_Capability[],
    actions?: CIMI_Action[]
  ): CIMI_ResourceMetadata {
    const metadata = new CIMI_ResourceMetadata(
      this._baseUri,
      typeURI,
      resourceTypeName,
      attributes,
      undefined, // auto-generate ID
      { href: this.id } // parent is this collection
    );
    
    if (capabilities) {
      metadata.capabilities = capabilities;
    }
    if (actions) {
      metadata.actions = actions;
    }
    
    this.add(metadata);
    return metadata;
  }
  
  // Get ResourceMetadata by resource type
  getByResourceType(resourceTypeName: string): CIMI_CollectionItem[] {
    const results: CIMI_CollectionItem[] = [];
    
    for (const item of this.collection.values()) {
      if (item.name === `${resourceTypeName}Metadata`) {
        results.push(item);
      }
    }
    
    return results;
  }
  
  // Get ResourceMetadata by type URI
  getByTypeURI(typeURI: URI): CIMI_CollectionItem | undefined {
    for (const item of this.collection.values()) {
      // Note: We'd need to expand the item to check typeURI
      // This is a simplified implementation
      if (item.resourceRef.href.includes(typeURI)) {
        return item;
      }
    }
    return undefined;
  }
  
  // Override operations - typically reserved for administrators per spec 5.11.2
  getAvailableOperations(): CIMI_Operation[] {
    return [
      { rel: CIMI_Operations.ADD, href: `${this.id}/add` }
      // Note: insert/remove operations may be restricted for ResourceMetadata
    ];
  }
  
  // Implementation required by CIMI_ResourceManager
  cleanupReferences(deletedResourceId: URI): void {
    // Remove any ResourceMetadata items that reference the deleted resource
    for (const [itemId, item] of this.collection.entries()) {
      if (item.resourceRef.href === deletedResourceId) {
        this.remove(itemId);
      }
    }
  }
}

export interface CIMI_Action {
  name: string;              // Required - name of the operation
  uri: URI;                  // Required - uniquely identifies the operation globally
  description?: string;      // Optional human-readable description
  method: string;            // Required - protocol-dependent verb
  inputMessage?: string;     // Optional - request body MIME type
  outputMessage?: string;    // Optional - response body MIME type
}