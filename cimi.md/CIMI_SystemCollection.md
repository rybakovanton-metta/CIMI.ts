## 5.13.2 SystemCollection Resource

A **SystemCollection Resource** represents a Collection of System Resources and follows the Collection pattern defined in clause 5.5.12.

### 5.13.2.1 Operations

**NOTE:** The **"add"** operation requires that a **SystemTemplate** be used (see 4.2.1.1).

Resources created during the process of creating a System shall be components of the System (see 5.13.1). For example, a `componentDescriptor` that references a **MachineTemplate**, and within that MachineTemplate is a reference to a **VolumeTemplate**, results in:
- A reference to the new Machine being added to the `System.machines` attribute.
- A reference to the new Volume being added to the `System.volumes` attribute.

However, if this MachineTemplate refers to an existing Volume, this Volume shall not be added to the top-level System attributes.

---

The following custom operations are also defined:

**import**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/import`  

This operation shall import a System. Not only is a System created, but Machines, Volumes, Networks, and possibly recursive Systems and their components may also be created corresponding to imported descriptor entries. More detail about this process is in **ANNEX A**.

**Input parameters:**  
1) **"source"** - type: `URI` - **mandatory**  
Indicates the location from which the imported data is retrieved. Based on the specific protocol specified within the URI, the Consumer might need to provide additional information (such as credentials) in the `"properties"` field.

**Output parameters:** None.

---

## HTTP protocol

To import a System, a `POST` is sent to the `http://schemas.dmtf.org/cimi/2/action/import` URI of the SystemCollection where the HTTP request body shall be as described below.

**JSON media type:** `application/json`

**JSON serialization:**  
```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
  "action": "http://schemas.dmtf.org/cimi/2/action/import",
  "source": string,
  "properties": { "string": "string" }
}
```

**XML media type:** `application/xml`

**XML serialization:**  
```xml
<Action xmlns="http://schemas.dmtf.org/cimi/2">
  <action>http://schemas.dmtf.org/cimi/2/action/import</action>
  <source> xs:anyURI </source>
  <properties>
    <property key="xs:string"> xs:string </property>
  </properties>
  <xs:any>*
</Action>
```
