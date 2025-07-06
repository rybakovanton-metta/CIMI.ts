## 5.13 System Resources and Relationships

### 5.13.1 System

A **System** is a realized Resource that consists of one or more Networks, Volumes, Machines, (and others) that could be connected and associated with each other. A System can be created from the interpretation of a SystemTemplate. A System can be operated and managed as a single Resource and usually forms a stack of service. For example, an online shopping cart system consists of Machines for web servers and databases, network addresses for public access, and Volumes for database files.

A System has several *top-level* attributes that are Collections of references to Resources of various types. Each one of these Collections shall contain references to Resource items of the related type that are components of the System. Each one of these System components may be either:
- a child component of the System (see 5.10.2)
- an associated component of the System

By default, all Resources that are created as the result of a System creation are also child components of the System. Some components of a System may pre-exist to the System — for example, they would be referred to by the SystemTemplate used to create that System. Such component Resources are **associated components** of the System.

An example of an associated component in a System is a Network created independently from the System, directly by `POST`ing to the networks CEP collection. A Consumer may then want the System to reuse that Network as a component while keeping the Network managed separately from the System — in particular, not to be deleted when the System is deleted. Such a Network may still be inserted in the System’s networks collection as an associated component, while having its `parent` attribute referring to the CEP as originally set. Alternatively, the Network could be made a child component of the System by setting its `parent` attribute to the System’s networks collection Resource.

**Note:**  
A Resource component of a System may in turn use other Resources that are not components of this System — for example, a Machine in a System can use a Volume that is neither a component of the Machine, nor a component of the System.

Table 9 describes the System attributes.

**Table 9 – System attributes**

**Name:** System  
**Type URI:** http://schemas.dmtf.org/cimi/2/System

| Attribute | Type | Description |
|-----------|------|--------------|
| state | string | The operational state of the System. <br><br> **Allowed values:** (See 5.14.1.) <br> - **CREATING:** The System is in the process of being created. <br> - **STARTING/STARTED/STOPPING/STOPPED/PAUSING/PAUSED/SUSPENDING/SUSPENDED:** The System shall be in one of these states if all the Machines referenced by the System are in that state. See clause 5.14.1 for the list of available actions based on the state of a Machine. Such transitional states may just indicate that all Machines in a System are undergoing the same operation (e.g., “start”), without the System being actually operated on (e.g., no “start” done at System level). An actual operation on a System may be traced by querying the “job” entity. <br> - **MIXED:** The System shall be in this state if either no Machines are referenced by this System or Machines referenced by this System are in varying states. Such varying states are likely to occur when an operation is in progress on a System, resulting in transitions of its Machine states toward a new common state (e.g., STOPPED, STARTED) but at a different pace, or sequentially one after the other. <br> - **DELETING:** The System is in the process of being deleted. <br> - **ERROR:** The Provider has detected an error in the System. <br><br> The operations that result in transitions to the above defined states are defined in clause 5.13.1.2. |
| systems | collection [System] | A list of references to nested Systems that are components of this System. |
| machines | collection [Machine] | A list of references to Machines that are components of this System. |
| credentials | collection [Credential] | A list of references to Credentials that are components of this System. |
| volumes | collection [Volume] | A list of references to Volumes that are components of this System. |
| networks | collection [Network] | A list of references to Networks that are components of this System. |
| networkServices | collection [Network Service] | A reference to the NetworkServiceCollection that are components of this System. |
| services | Collection [System Service] | A list of references to SystemService Resources that represent services supported by this System. |
| meters | collection [Meter] | A list of references to Meters monitored for this System, with component semantics. Note that these Meters are for the System and not for any individual component in the System. |
| eventLog | ref | A reference to the EventLog of this System. Note that this EventLog is for the System and not for any individual component in the System. |

When implementing or using **System**, Providers and Consumers shall adhere to the syntax and semantics of its attributes as described in Table 9 as well as in the tables describing embedded Resources or related Collections.

### 5.13.1.1 Attributes of type Collection

The following clause describes the Collection Resources components of Systems.

#### 5.13.1.1.1 systems Collection

The Resource type for each item of this Collection is **“System”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic System Collection, the serialization of which follows the rules in 5.5.12. See the SystemCollection Resource clause.

#### 5.13.1.1.2 machines Collection

The Resource type for each item of this Collection is **“Machine”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic Machine Collection (serialized as described in 5.5.12). See the MachineCollection Resource clause.

#### 5.13.1.1.3 credentials Collection

The Resource type for each item of this Collection is **“Credential”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic Credential Collection (serialized as described in 5.5.12). See the CredentialCollection Resource clause.

#### 5.13.1.1.4 volumes Collection

The Resource type for each item of this Collection is **“Volume”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic Volume Collection (serialized as described in 5.5.12). See the VolumeCollection Resource clause.

#### 5.13.1.1.5 networks Collection

The Resource type for each item of this Collection is **“Network”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic NetworkCollection Resource as described in clause 5.16.2.

#### 5.13.1.1.6 networkServices Collection

The Resource type for each item of this Collection is **“NetworkService”**. There is no accessory attribute for the items in this Collection; therefore, it is a basic NetworkServiceCollection as described in clause 5.16.18.

#### 5.13.1.1.7 meters Collection

The Resource type for each item of this Collection is **“Meter”** as defined in clause 5.17.3. There is no accessory attribute for the items in this Collection; therefore, it is a basic Meter Collection (serialized as described in 5.5.12). See the MeterCollection Resource clause.

### 5.13.1.2 Operations

The System Resource supports the **Read**, **Update**, and **Delete** operations. **Create** is supported through the SystemCollection Resource.

The following custom operations are also defined:  
`start` / `stop` / `restart` / `pause` / `suspend`  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/xxx`

Where **"xxx"** is one of "start", "stop", "restart", "pause", or "suspend".

This operation shall recursively perform the requested operation on each component of the System (Machine or sub-System). Note that not all Machines need to be in the same state for this operation to be available and the impact of this operation varies depending on the component's current state; see clause 5.14.1.2 for more details about performing operations on Machines. If the operation fails for a Machine, that Machine shall not be affected by the operation.

**export**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/export`  

This operation shall export a System along with all Resources component of or used by this System. If an export package exists at that URI, it is updated with the values of the System and any component management Resources. Otherwise, a new export package is created at that URI with a Media Type as specified by the **"format"** parameter. Other formats may be used if supported, but are not specified by this standard.

**Input parameters:**  
1) **"format"** - type: `string` – optional. Indicates the Media Type of the exported data. If not present, the default value shall be `"application/ovf."`  
2) **"destination"** - type: `URI` – optional. Indicates the location to where the exported data is placed. If not present, the HTTP response `Location` header shall contain the URL to the exported data. Based on the specific protocol specified within the URI, the Consumer might need to provide additional information (such as credentials) in the `"properties"` field. In the case of HTTP, a `PUT` shall be used to place the data at the specified location.

**Output parameters:** None.


## HTTP protocol

To export a System, a `POST` is sent to the `http://schemas.dmtf.org/cimi/2/action/export` URI of the System where the HTTP request body shall be as described below.

**JSON media type:** `application/json`

**JSON serialization:**  
```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
  "action": "http://schemas.dmtf.org/cimi/2/action/export",
  "format": string,
  "destination": string,
  "properties": { "string": "string" }
}
```

**XML media type:** `application/xml`

**XML serialization:**  
```xml
<Action xmlns="http://schemas.dmtf.org/cimi/2">
  <action>http://schemas.dmtf.org/cimi/2/action/export</action>
  <format> xs:string </format>
  <destination> xs:anyURI </destination>
  <properties>
    <property key="xs:string"> xs:string </property>
  </properties>
  <xs:any>*
</Action>
```
