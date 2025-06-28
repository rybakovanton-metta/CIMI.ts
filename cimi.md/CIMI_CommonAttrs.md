<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

# 5.7.1 Common Resource attributes
Resources, except for the Collection Resource, shall support the following common attributes defined in
Table 5. A Collection Resource shall support the id attribute, the updated attribute and the parent
attribute, as defined in Table 5.

## Table 5 – Common attributes

- **id** (`URI`)  
  The unique URI identifying this Resource; assigned upon Resource creation. This attribute value shall be unique in the Provider’s cloud.  
  Constraints:  
  - providerMandatory: true  
  - consumerMandatory: true  
  - mutable: false  
  - consumerWritable: false

- **name** (`string`)  
  The human-readable name of this Resource; assigned by the creator as a part of the Resource creation input.  
  Constraints:  
  - providerMandatory: true  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: true

- **description** (`string`)  
  The human-readable description of this Resource; assigned by the creator as a part of the Resource creation input.  
  Constraints:  
  - providerMandatory: true  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: true

- **created** (`dateTime`)  
  The timestamp when this Resource was created. The format should be unambiguous, and the value is immutable.  
  Constraints:  
  - providerMandatory: false  
  - consumerMandatory: false  
  - mutable: false  
  - consumerWritable: false

- **updated** (`dateTime`)  
  The time at which the last explicit attribute update was made on the Resource. The initial value is the time the resource is created. Note, while operations, such as "stop", do implicitly modify the 'state' attribute, they do not change the 'updated’ time.  
  Constraints:  
  - providerMandatory: false  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: false

- **parent** (`ref`)  
  A reference to a Resource of which this Resource is a child component (see “composition” relationship, clause 5.10.2) – i.e., a reference to its first parent Resource.  
  Constraints:  
  - providerMandatory: true  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: true

- **properties** (`map`)  
  A map of key-value pairs (each entry called a "property"), some of which may control one or more aspects this Resource. Properties may also serve as an extension point, allowing Consumers to record additional information about the Resource. The same "key" shall not be used more than once within a "properties" attribute. Each property shall contain the following nested data:  
  - **key** (`string`) The name of the property.  
  - **value** (`string`) The value of the property.  
  Constraints:  
  - providerMandatory: false  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: true

- **resourceMetadata** (`ref`)  
  A reference to a ResourceMetadata instance associated with this Resource and governing the attributes, operations and capabilities concerning this Resource.  
  Constraints:  
  - providerMandatory: false  
  - consumerMandatory: false  
  - mutable: true  
  - consumerWritable: false

The following pseudo-schemas describe the serialization of these attributes in both JSON and XML:
**JSON serialization:**
"id": string,
"name": string, ?
"description": string, ?
"created": string, ?
"updated": string, ?
"properties": { string: string, + }, ?
"resourceMetadata" : ["href": string, * ], ?

**XML serialization:**
<id> xs:anyURI </id>
<name> xs:string </name> ?
<description> xs:string </description> ?
<created> xs:dateTime </created> ?
<updated> xs:dateTime </updated> ?
<properties>
<property key="xs:string"> xs:string </property> *
</properties> ?
<resourceMetadata href=”xs:string” /> ?