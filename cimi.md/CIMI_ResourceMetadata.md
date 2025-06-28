<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.11 Resource metadata

Implementations of this specification should allow for Consumers to discover the metadata associated with any Resource under the Cloud Entry Point. Doing so allows for the discovery of Provider-defined constraints on the attributes or operations of a Resource as well as discovery of any new extension attributes or operations that the Provider may have defined.

A **ResourceMetadata** instance contains metadata governing the attribute status (optionality, value constraints, access), the available operations, and other Provider-specific capabilities or features for a Resource or a set of Resources (the “target Resource(s)” for that ResourceMetadata instance). The target Resource contains a reference to its ResourceMetadata instance, which itself may be shared across several target Resources.

Any Resource under a CEP may have a ResourceMetadata instance associated with it. This association may be done in one of the following ways:

- **CEP-level metadata**  
  A ResourceMetadata instance is defined for all Resources of the same type under the CEP. In this case the ResourceMetadata instance is added as a Resource item in the `resourceMetadata` collection unique to the CEP. Unless overridden, it applies to all Resources of the targeted type under this CEP.

- **Template-level metadata**  
  A ResourceMetadata instance is defined for all Resources generated from a single Template. In this case, a Template-specific ResourceMetadata instance is provided and referred by that Template. This ResourceMetadata overrides any CEP-level ResourceMetadata for the type of Resource generated from that Template.

- **Instance-level metadata**  
  A ResourceMetadata instance may be created for a single particular Resource instance, or may be associated on a per-Resource basis. Such an association requires an explicit modification of the `resourceMetadata` attribute of the target Resource, canceling any former value it may have been given at creation time.

Each Resource’s metadata shall contain the following pieces of information:

### Table 6 – ResourceMetadata attributes

| **Attribute**     | **Type**              | **Description**                                                                                                                                                                                                                                                    |
|-------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `typeURI`         | URI                   | A unique URI associated with, and denoting, the type of the described Resource target.<br>**Constraints:** providerMandatory: true; consumerMandatory: true; mutable: true; consumerWritable: true                                                              |
| `name`            | string                | The name of the Resource target type (e.g., Machine).<br>**Constraints:** providerMandatory: true; consumerMandatory: true; mutable: true; consumerWritable: true                                                                                                  |
| `attributes`      | attribute[]           | A set of metadata associated with each attribute (or target attribute) of the Resource target, including extension attributes. The metadata for each attribute target shall contain:                                                                                |

#### attribute (nested)

| **Field**            | **Type**   | **Description**                                                                                                                                                                                                                                         |
|----------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`               | string     | The name of the target attribute.                                                                                                                                                                                                                      |
| `namespace`          | URI        | The namespace in which the target attribute is defined. Omit for CIMI-defined attributes; include for extensions.                                                                                                                                       |
| `type`               | string     | The data type of the target attribute. Omit for CIMI-defined attributes; include for extensions.                                                                                                                                                       |
| `providerMandatory`  | boolean    | If “true” (default), indicates that the target attribute shall be present in any representation sent by a Provider (if non-empty).                                                                                                                      |
| `consumerMandatory`  | boolean    | If “true,” indicates that the target attribute shall be present in any representation sent by a Consumer (if non-empty). Default is false.                                                                                                              |
| `mutable`            | boolean    | If “true” (default), indicates that the target attribute may be modified after Resource creation.                                                                                                                                                      |
| `consumerWritable`   | boolean    | If “true” (default), indicates that the target attribute may be modified by the Consumer.                                                                                                                                                              |

> **Nested constraints (all):** providerMandatory: true; consumerMandatory: true; mutable: true; consumerWritable: true

| **Attribute**     | **Type**        | **Description**                                                                                                                                                                                                                                       |
|-------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `vscope`          | valueScope[]    | Applies to the attributes of the described (target) Resource. Consumers must supply values compatible with these scopes or receive a 4xx error.<br>**Constraints:** providerMandatory: false; consumerMandatory: false; mutable: true; consumerWritable: true |

| **Attribute**     | **Type**     | **Description**                                                                                                                                                                                                                                        |
|-------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `capabilities`    | capability[] | A set of Provider-defined metadata to advertise Provider capabilities or features. Each capability contains:                                                                                                                                           |

#### capability (nested)

| **Field**          | **Type** | **Description**                                                                                               |
|--------------------|----------|---------------------------------------------------------------------------------------------------------------|
| `name`             | string   | The name of the capability.                                                                                   |
| `uri`              | URI      | A URI that uniquely identifies the capability globally.                                                       |
| `description`      | string   | The human-readable description of the capability’s semantics.                                                  |
| `value`            | any      | The value of the capability. If omitted, defaults to boolean true.                                             |

> **Nested constraints (default):** providerMandatory: true; consumerMandatory: false; mutable: true; consumerWritable: true  
> **capabilities constraint:** providerMandatory: false; consumerMandatory: false; mutable: true; consumerWritable: true

| **Attribute**     | **Type**    | **Description**                                                                                                                                                                                                                                                                                       |
|-------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `actions`         | action[]    | A set of Provider-defined operations for this Resource type. May include operations a Consumer is not allowed to use; the Consumer’s allowed subset is returned by querying the Resource instance. Called “actions” to avoid conflict with ResourceMetadata’s own operations.                             |

#### action (nested)

| **Field**          | **Type** | **Description**                                                                           |
|--------------------|----------|-------------------------------------------------------------------------------------------|
| `name`             | string   | The name of the operation.                                                               |
| `uri`              | URI      | A URI that uniquely identifies the operation globally.                                   |
| `description`      | string   | The human-readable description of the operation’s semantics.                             |
| `method`           | string   | The protocol-dependent verb to perform the operation.                                    |
| `inputMessage`     | string   | The request body MIME type (may vary by model format).                                  |
| `outputMessage`    | string   | The response body MIME type (may vary by model format).                                 |

> **Nested constraints (default):** providerMandatory: true; consumerMandatory: true; mutable: true; consumerWritable: true  
> **actions constraint:** providerMandatory: false; consumerMandatory: false; mutable: true; consumerWritable: true

When implementing or using ResourceMetadata, Providers and Consumers shall adhere to the syntax and semantics of its attributes as described here and in related tables. Both Consumer and Provider shall serialize this Resource per the pseudo-schemas in section 1.3 (not shown).  
JSON media type: application/json  
JSON serialization:
```json
{ "resourceURI": "http://schemas.dmtf.org/cimi/2/ResourceMetadata",  
"id": string,  
"typeURI": string,  
"name": string,  
"attributes" : [  
  { "name": string,  
    "namespace": string, ?  
    "type": string, ?  
    "required": boolean, ? } *  
], ?  
"vscope" : [ valueScope, * ], ?  
"capabilities": [  
  { "name": string, ?  
    "uri": string,  
    "description": string, ?  
    "value": any } *  
], ?  
"actions" : [  
  { "name": string,  
    "uri": string,  
    "description": string, ?  
    "method": string,  
    "inputMessage": string, ?  
    "outputMessage": string ? }, *  
], ?  
"operations": [  
  { "rel": "edit", "href": string }, ?  
  { "rel": "delete", "href": string } ?  
] ?  
...  
}
```
XML media type: application/xml  
XML serialization:
```xml
<ResourceMetadata xmlns="http://schemas.dmtf.org/cimi/2">  
  <id> xs:anyURI </id>  
  <name> xs:string </name>  
  <typeURI> xs:anyURI </typeURI>  
  <attributes>  
    <attribute name="xs:string" namespace="xs:anyURI"? type="xs:string"? required="xs:boolean"? /> *  
  </attributes>  
  <vscope> valueScope </vscope>?  
  <capabilities>  
    <capability name="xs:string"? uri="xs:anyURI" description="xs:string"?>  
      xs:any*  
    </capability> *  
  </capabilities>  
  <actions>  
    <action name="xs:string" uri="xs:anyURI" description="xs:string"? method="xs:string" inputMessage="xs:string"? outputMessage="xs:string"? /> *  
  </actions>  
  <operations>  
    <operation rel="edit" href="xs:anyURI"/> ?  
    <operation rel="delete" href="xs:anyURI"/> ?  
  </operations>  
  <xs:any>*  
  </xs:any>  
</ResourceMetadata>
```
Additional metadata about the Resource or attributes may be included by the Provider.  


### 5.11.2 ResourceMetadataCollection Resource
A ResourceMetadataCollection Resource represents the Collection of ResourceMetadata
Resources within a Provider and follows the Collection pattern defined in clause 5.5.12. Note that
modifications of the Resources within this Collection are typically reserved for administrator types of CIMI
Consumers. This Resource shall be serialized as follows:

JSON serialization:
```json
"id": string,
"count": number,
"resourceMetadatas": [
  "id": string,
  { "resourceURI": "http://schemas.dmtf.org/cimi/2/ResourceMetadataCollection",
    { "resourceURI": "http://schemas.dmtf.org/cimi/2/ResourceMetadata",
      ... remaining ResourceMetadata attributes ...
    }, +
], ?
"operations": [ { "rel": "add", "href": string } ? ]
...
}
```
XML serialization:
```xml
<Collection
  resourceURI="http://schemas.dmtf.org/cimi/2/ResourceMetadataCollection"
  xmlns="http://schemas.dmtf.org/cimi/2">
  <id> xs:anyURI </id>
  <count> xs:integer </count>
  <resourceMetadatas>
    <ResourceMetadata>
      <id> xs:anyURI </id>
      ... remaining ResourceMetadata attributes ...
    </ResourceMetadata> *
  </resourceMetadatas>
  <operations>
    <operation rel="add" href="xs:anyURI"/> ?
  </operations>
  <xs:any>*
  </xs:any>
</Collection>
```
